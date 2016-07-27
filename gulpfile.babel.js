'use strict';

/*
    https://github.com/wangchi/using-es6-with-gulp
 */

import gulp from 'gulp'
import through from 'through2'
import gutil from 'gulp-util'
import cache from 'gulp-cached'
import concat from 'gulp-concat'
import jshint from 'gulp-jshint'
import uglify from 'gulp-uglify'
import less from 'gulp-less'
import csslint from 'gulp-csslint'
import cleanCSS from 'gulp-clean-css'
import webpack from 'webpack'
import shell from 'gulp-shell'
import nprint from 'node-print'
import _debug from 'gulp-debug'

function debug(title) {
    return _debug({
        title
    })
}

const EXCLUSIONS = [
    '!bower_components/**/*',
    '!node_modules/**/*',
    '!dist/**/*'
]
const DIST = 'dist'

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
    var globs = ['*/**/*.tpl', ...EXCLUSIONS]
    gulp.src(globs)
        .pipe(cache('tpl'))
        .pipe(debug('tpl'))
        .pipe(through.obj(function(file, encoding, callback) { /* jshint unused:false */
            file.path = file.path + '.js'
            file.contents = new Buffer(
                html2js(file.contents.toString())
            )
            callback(null, file)
        }))
        .pipe(gulp.dest('./'))
        .on('end', cb)
})

// https://github.com/spenceralger/gulp-jshint
gulp.task('jshint', ['tpl'], () => {
    return gulp.src(['**/*.js', ...EXCLUSIONS])
        .pipe(cache('jshint'))
        .pipe(debug('jshint'))
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
})

// https://github.com/terinjokes/gulp-uglify
gulp.task('compress-js', ['tpl', 'jshint'], (cb) => {
    gulp.src(['*/**/*.js', ...EXCLUSIONS]) // !gulpfile.js !config.js
        .pipe(cache('compress-js'))
        .pipe(debug('compress-js'))
        .pipe(uglify({
            preserveComments: 'some'
        }))
        .pipe(gulp.dest(DIST))
        .on('end', cb)
})

// https://github.com/plus3network/gulp-less
gulp.task('less', (cb) => {
    gulp.src(['*/**/*.less', ...EXCLUSIONS])
        .pipe(debug('less'))
        .pipe(less({}))
        .pipe(gulp.dest('./'))
        .on('end', cb)
})

// https://github.com/contra/gulp-concat
// https://github.com/rvagg/through2#flushfunction
gulp.task('concat-css', ['less'], (cb) => {
    var files = []
    gulp.src(['**/*.css', '!css-tool/**/*', ...EXCLUSIONS])
        .pipe(debug('concat-css'))
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
        .pipe(gulp.dest('./css-tool/'))
        .on('end', cb)
})

// https://github.com/lazd/gulp-csslint
// https://github.com/ebednarz/csslintrc/blob/master/.csslintrc
// https://github.com/CSSLint/csslint/wiki/Rules
gulp.task('csslint', ['less', 'concat-css'], (cb) => {
    gulp.src(['css-tool/minecraft.css', 'css-tool/components.css'])
        .pipe(debug('csslint'))
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
gulp.task('compress-css', ['less', 'concat-css', 'csslint'], (cb) => {
    gulp.src(['*/**/*.css', ...EXCLUSIONS])
        .pipe(debug('compress-css'))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest(DIST))
        .on('end', cb)
})

// https://github.com/gulpjs/gulp/blob/master/docs/API.md
gulp.task('watch', () => {
    function onchange(event) {
        gutil.log('File ' + gutil.colors.green(event.path) + ' was ' + event.type + ', running tasks...')
    }
    gulp.watch(['**/*.js', '!**/*.tpl.js', ...EXCLUSIONS], ['jshint', 'compress-js']).on('change', onchange)
    gulp.watch(['*/**/*.less', ...EXCLUSIONS], ['less', 'concat-css', 'csslint', 'compress-css']).on('change', onchange)
    gulp.watch(['*/**/*.tpl', ...EXCLUSIONS], ['tpl', 'compress-js']).on('change', onchange)
    gulp.watch(['.csslintrc'], ['csslint']).on('change', onchange)
    gulp.watch(['.jshintrc'], ['jshint']).on('change', onchange)
})

// gulp.task('default', ['jshint', 'less', 'concat-css', 'csslint', 'tpl', 'compress-js', 'compress-css', 'watch'])
gulp.task('default', ['compress-js', 'compress-css', 'watch'])

// https://webpack.github.io/docs/configuration.html
// https://webpack.github.io/docs/usage-with-gulp.html
gulp.task('webpack', function( /*callback*/ ) {
    // https://webpack.github.io/docs/configuration.html#externals
    var externals = [{
        'brix/loader': true,
        'brix/base': true,
        'brix/event': true,
        'brix/animation': true,
        'brix/spa': true,

        magix: true,
        chartx: true,
        'chartx/index': true,

        jquery: true,
        underscore: true,
        moment: true,
        handlebars: true,
        mousetrap: true,
        mock: true,
        marked: true,
        Chart: true,
        director: true,
        URIjs: true,
        page: true,
        highlightjs: true,
        nprogress: true,
        parsley: true,
        log: true,
        accounting: true,
        progressbar: true,
        Sortable: true,
        fontawesome: true,
        vue: true,
        colors: true,
        printf: true,
    }]
    var components = [
        ['./base/base.js', 'components/base'],
        ['./dropdown/dropdown.js', 'components/dropdown'],
        ['./switch/switch.js', 'components/switch'],
        ['./pagination/pagination.js', 'components/pagination'],
        ['./pagination/state.js', 'components/pagination/state'],
        ['./dialog/dialog.js', 'components/dialog'],
        ['./dialog/position.js', 'components/dialog/position'],
        ['./dialogview/dialogview.js', 'components/dialogview'],
        ['./table/table.js', 'components/table'],
        ['./table/linkage.js', 'components/table/linkage'],
        ['./datepicker/datepicker.js', 'components/datepicker'],
        ['./datepickerwrapper/datepickerwrapper.js', 'components/datepickerwrapper'],
        ['./datepicker/ancient/datepicker.js', 'components/datepicker/ancient'],
        ['./popover/popover.js', 'components/popover'],
        ['./uploader/uploader.js', 'components/uploader'],

        ['./nprogress/nprogress.js', 'components/nprogress'],
        ['./hourpicker/hourpicker.js', 'components/hourpicker'],
        ['./areapicker/areapicker.js', 'components/areapicker'],
        ['./tree/tree.js', 'components/tree'],
        ['./tree/tree/tree.node.json.tpl.js', 'components/tree/tree.node.json.tpl'],
        ['./taginput/taginput.js', 'components/taginput'],
        ['./suggest/suggest.js', 'components/suggest'],
        ['./chartxwrapper/chartxwrapper.js', 'components/chartxwrapper'],

        ['./hello/hello.js', 'components/hello'],
        ['./hello-extra/hello-extra.js', 'components/hello-extra'],
        ['./colorpicker/colorpicker.js', 'components/colorpicker'],
        ['./modal/modal.js', 'components/modal'],
        ['./editor/editor.js', 'components/editor'],
        ['./editable/editable.js', 'components/editable'],
        ['./spin/spin.js', 'components/spin'],
        ['./countdown/countdown.js', 'components/countdown'],
        ['./sidebar/sidebar.js', 'components/sidebar'],
        ['./chart/chart.js', 'components/chart'],
        ['./imager/imager.js', 'components/imager'],
        ['./validation/validation.js', 'components/validation'],
        // ['./validation/validation/i18n', 'components/validation/i18n'], // TODO
        ['./ellipsis/ellipsis.js', 'components/ellipsis'],
        ['./progressbarwrapper/progressbarwrapper.js', 'components/progressbarwrapper'],
        ['./errortips/errortips.js', 'components/errortips'],
        ['./sidenav/sidenav.js', 'components/sidenav'],
        ['./sitenav/sitenav.js', 'components/sitenav'],
        ['./footer/footer.js', 'components/footer'],
        ['./wizard/wizard.js', 'components/wizard'],
        ['./tab/tab.js', 'components/tab'],

        ['./ctree/ctree.js', 'components/ctree'],
        ['./sticky/sticky.js', 'components/sticky'],
        ['./nav/nav.js', 'components/nav'],
        ['./readme/readme.js', 'components/readme'],
        ['./css-layout-debugger/css-layout-debugger.js', 'components/css-layout-debugger'],
        ['./boilerplate/boilerplate.js', 'components/boilerplate'],
    ]
    components.forEach(function(item /*, index*/ ) {
        externals[0][item[1]] = true
    })
    console.log(externals)
    components.forEach(function(item, index) {
        nprint.pf('%4s %-60s => %-50s', index, item[0].green, item[1].grey)
            // console.log(index, item[0], item[1])
        webpack({
            entry: item[0],
            output: {
                path: './dist',
                filename: item[0],
                library: item[1],
                libraryTarget: 'umd'
            },
            externals: externals,
            plugins: [
                new webpack.optimize.UglifyJsPlugin({
                    minimize: true
                })
            ]
        }, function(err /*, stats*/ ) {
            // console.log(err, stats)
            if (err) throw err
        })
    })

    // gulp.src(globs)
    //     .pipe(through.obj(function(file, encoding, callback) {
    //         callback(null, file)
    //     }))
})