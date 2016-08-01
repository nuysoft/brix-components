'use strict';

/*
    https://github.com/wangchi/using-es6-with-gulp
 */
import path from 'path'
import _ from 'lodash'
import gulp from 'gulp'
import through from 'through2'
import gutil from 'gulp-util'
import cache from 'gulp-cached'
import concat from 'gulp-concat'
import jshint from 'gulp-jshint'
import less from 'gulp-less'
import csslint from 'gulp-csslint'
import cleanCSS from 'gulp-clean-css'
import webpack from 'webpack'
import shell from 'gulp-shell'
import _debug from 'gulp-debug'

var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({
    browsers: ['last 2 versions', '> 5%']
});

function debug(title) {
    return _debug({
        title
    })
}

const SRC = './src/'
const DIST = './dist/'
const RE_MODULEID = new RegExp('^src/([^/]+)(?:/index.js|(/.+)/index.js)$')
const EXTERNALS = [
    /^brix\/.+$/,
    /^components\/.+$/,
    /^[a-zA-Z\-0-9]+$/,
    'chartx/index'
]

function html2js(html) {
    var quoteChar = '"'
    var indentString = '    '
    var escapeContent = (content) => {
        var bsRegexp = new RegExp('\\\\', 'g')
        var quoteRegexp = new RegExp('\\' + quoteChar, 'g')
        var nlReplace = '\\n' + quoteChar + ' +\n' + indentString + indentString + quoteChar
        return quoteChar +
            content.replace(bsRegexp, '\\\\').replace(quoteRegexp, '\\' + quoteChar).replace(/\r?\n/g, nlReplace) +
            quoteChar
    }
    return (
        '/* global define */\n' +
        'define(function() {\n' +
        indentString + 'return ' +
        escapeContent(html) +
        '\n})'
    )
}

// https://github.com/sun-zheng-an/gulp-shell
gulp.task('status', shell.task(['git status'], {
    verbose: true
}))

// https://github.com/karlgoldstein/grunt-html2js/blob/master/tasks/html2js.js
gulp.task('tpl', (cb) => {
    gulp.src(['src/*/**/*.tpl']).pipe(cache('tpl')).pipe(debug('tpl'))
        .pipe(through.obj(function(file, encoding, callback) { /* jshint unused:false */
            file.path = file.path + '.js'
            file.contents = new Buffer(
                html2js(file.contents.toString())
            )
            callback(null, file)
        }))
        .pipe(gulp.dest(SRC))
        .on('end', cb)
})

// https://github.com/spenceralger/gulp-jshint
gulp.task('jshint', ['tpl'], () => {
    return gulp.src(['src/**/*.js', 'test/**/*.js', 'gulpfile.babel.js'])
        .pipe(cache('jshint'))
        .pipe(debug('jshint'))
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
})

// https://webpack.github.io/docs/configuration.html
// https://webpack.github.io/docs/usage-with-gulp.html
gulp.task('build:js', ['tpl', 'jshint'], () => {
    // https://webpack.github.io/docs/configuration.html#externals
    return gulp.src(['src/*/**/index.js']) // .pipe(debug('build:js'))
        .pipe(through.obj(function(file, encoding, callback) { /* jshint unused:false */
            var portal = path.relative(process.cwd(), file.path)
            var parts = RE_MODULEID.exec(portal)
            if (!parts) return callback(null, file)
            var moduleId = 'components/' + parts[1] + (parts[2] || '')

            var options = { // TODO Cannot find module ...
                entry: file.path,
                output: {
                    path: DIST,
                    filename: moduleId + '-debug.js',
                    library: moduleId,
                    libraryTarget: 'umd'
                },
                externals: EXTERNALS,
                plugins: []
            }

            var buildOptions = _.cloneDeep(options)
            buildOptions.plugins.push(
                new webpack.IgnorePlugin(/(\.less|\.css|\.tpl|\.md)$/) // TODO
            )
            webpack(buildOptions, function(err, stats) {
                done(err, stats)

                var compressOptions = _.cloneDeep(options)
                compressOptions.devtool = 'source-map'
                compressOptions.output.filename = moduleId + '.js'
                compressOptions.plugins.push( // https://github.com/mishoo/UglifyJS2#compressor-options
                    new webpack.IgnorePlugin(/(\.less|\.css|\.tpl|\.md)$/), // TODO
                    new webpack.optimize.UglifyJsPlugin({ // TODO 阅读完整文档
                        compress: { // TODO 阅读所有选项
                            warnings: true,
                            unused: true,
                            dead_code: true,
                            drop_debugger: true,
                            drop_console: true
                        },
                        output: {
                            comments: false
                        }
                    })
                )
                webpack(compressOptions, function(err, stats) {
                    done(err, stats)
                    callback(null, file)
                })
            })

            function done(err, stats) {
                if (err) throw err
                let jsonStats = stats.toJson()
                if (jsonStats.errors.length || jsonStats.warnings.length) gutil.log("[webpack]", stats.toString({}))
                if (jsonStats.errors.length) gutil.log(gutil.colors.red(jsonStats.errors))
                if (jsonStats.warnings.length > 0) gutil.log(gutil.colors.yellow(jsonStats.warnings)) // done
            }
        }))
})

// https://github.com/plus3network/gulp-less
gulp.task('less', (cb) => {
    gulp.src(['src/**/*.less']).pipe(cache('less')).pipe(debug('less'))
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest(SRC))
        .on('end', cb)
})

// https://github.com/contra/gulp-concat
// https://github.com/rvagg/through2#flushfunction
gulp.task('concat:css', ['less'], (cb) => {
    var files = []
    gulp.src(['src/**/*.css', '!src/css-tool/**/*']).pipe(debug('concat:css'))
        .pipe(through.obj(
            (file, encoding, callback) => { /* jshint unused:false */
                files.push(file)
                callback()
            },
            function(callback) { // this
                files.sort((a, b) => {
                    return a.path.localeCompare(b.path)
                })
                files.forEach((file) => {
                    this.push(file)
                })
                callback()
            }
        ))
        .pipe(through.obj(
            (file, encoding, callback) => { /* jshint unused:false */
                file.contents = new Buffer(
                    '/* ' + file.path.replace(__dirname, '') + ' */\n' +
                    file.contents.toString()
                )
                callback(null, file)
            }
        ))
        .pipe(concat('components.css'))
        .pipe(gulp.dest(DIST + 'styles/'))
        .on('end', cb)
})

// https://github.com/lazd/gulp-csslint
// https://github.com/ebednarz/csslintrc/blob/master/.csslintrc
// https://github.com/CSSLint/csslint/wiki/Rules
gulp.task('csslint', ['less', 'concat:css'], (cb) => {
    gulp.src(['src/css-tool/minecraft.css', 'src/css-tool/components.css']).pipe(cache('csslint')).pipe(debug('csslint'))
        .pipe(csslint('.csslintrc'))
        .pipe(csslint.reporter(function(file) {
            gutil.log(gutil.colors.cyan(file.csslint.errorCount) + ' errors in ' + gutil.colors.magenta(file.path))
            file.csslint.results.forEach(function(result) {
                gutil.log(result.error.message + ' on line ' + result.error.line)
            })
        }))
        .on('end', cb)
})

// https://github.com/murphydanger/gulp-minify-css
gulp.task('build:css', ['less', 'concat:css', 'csslint'], (cb) => {
    gulp.src(['src/*/**/*.css']).pipe(cache('build:css')) // .pipe(debug('build:css'))
        .pipe(through.obj(function(file, encoding, callback) { /* jshint unused:false */
            file.path = path.join(
                file.base, path.basename(file.path)
            )
            callback(null, file)
        }))
        .pipe(cleanCSS({
            debug: true,
            compatibility: 'ie8'
        }, function(details) { //console.dir(details)
            gutil.log(
                'build:css',
                details.name, // path.relative(process.cwd(), details.path), // details.name
                details.stats.originalSize + ' B',
                gutil.colors.gray('=>'),
                gutil.colors.green(details.stats.minifiedSize + ' B'),
                gutil.colors.green((details.stats.efficiency || 0).toFixed(2) * 100 + '%'),
                gutil.colors.magenta(details.stats.timeSpent + ' ms')
            )

        }))
        .pipe(gulp.dest(DIST + 'styles/'))
        .on('end', cb)
})

// https://github.com/gulpjs/gulp/blob/master/docs/API.md
gulp.task('watch', () => {
    function onchange(event) {
        gutil.log('File ' + gutil.colors.green(event.path) + ' was ' + event.type + ', running tasks...')
    }
    gulp.watch(['src/**/*.js', '!src/**/*.tpl.js'], ['jshint', 'build:js']).on('change', onchange)
    gulp.watch(['src/**/*.less'], ['less', 'concat:css', 'csslint', 'build:css']).on('change', onchange)
    gulp.watch(['src/**/*.tpl'], ['tpl', 'build:js']).on('change', onchange)
    gulp.watch(['.csslintrc'], ['csslint']).on('change', onchange)
    gulp.watch(['.jshintrc'], ['jshint']).on('change', onchange)
    gulp.watch(['gulpfile.babel.js'], ['build']).on('change', onchange)
})

gulp.task('build', ['build:js', 'build:css'])
gulp.task('default', ['build', 'watch'])