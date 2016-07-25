/* global require, console, Buffer, __dirname */
var gulp = require('gulp')
var through = require('through2')
var gutil = require('gulp-util')
var concat = require('gulp-concat')
var jshint = require('gulp-jshint')
var rjs = require('gulp-requirejs')
var uglify = require('gulp-uglify')
var less = require('gulp-less')
var csslint = require('gulp-csslint')
var minifyCss = require('gulp-minify-css')
var webpack = require("webpack")
var nprint = require('node-print')

gulp.task('hello', function() {
    console.log((function() {
        /*
______        _         _____                                                      _        
| ___ \      (_)       /  __ \                                                    | |       
| |_/ / _ __  _ __  __ | /  \/  ___   _ __ ___   _ __    ___   _ __    ___  _ __  | |_  ___ 
| ___ \| '__|| |\ \/ / | |     / _ \ | '_ ` _ \ | '_ \  / _ \ | '_ \  / _ \| '_ \ | __|/ __|
| |_/ /| |   | | >  <  | \__/\| (_) || | | | | || |_) || (_) || | | ||  __/| | | || |_ \__ \
\____/ |_|   |_|/_/\_\  \____/ \___/ |_| |_| |_|| .__/  \___/ |_| |_| \___||_| |_| \__||___/
                                                | |                                         
                                                |_|                                         
        */
    }).toString().split('\n').slice(2, -2).join('\n') + '\n')
})

// https://github.com/spenceralger/gulp-jshint
gulp.task('jshint', function() {
    var globs = [
        '**/*.js',
        '!bower_components/**/*',
        '!node_modules/**/*',
        '!dist/**/*'
    ]
    return gulp.src(globs)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
})

// https://github.com/floatdrop/gulp-watch
gulp.task('watch', function( /*callback*/ ) {
    var globs = [
        '!bower_components/**/*',
        '!node_modules/**/*',
        '!dist/**/*'
    ]
    gulp.watch(['**/*.js', '!**/*.tpl.js'].concat(globs), ['hello', 'jshint', 'compress'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
        })
    gulp.watch(['**/*.less'].concat(globs), ['hello', 'less', 'concat-css', 'csslint', 'minify-css'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
        })
    gulp.watch(['.csslintrc'].concat(globs), ['csslint'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
        })
    gulp.watch(['**/*.tpl'].concat(globs), ['hello', 'tpl', 'compress'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
        })
})

// https://github.com/plus3network/gulp-less
gulp.task('less', function() {
    var globs = [
        '**/*.less',
        '!bower_components/**/*',
        '!node_modules/**/*',
        '!dist/**/*'
    ]
    gulp.src(globs)
        .pipe(less({}))
        .pipe(gulp.dest('./'))
})

// https://github.com/lazd/gulp-csslint
// https://github.com/ebednarz/csslintrc/blob/master/.csslintrc
// https://github.com/CSSLint/csslint/wiki/Rules
gulp.task('csslint', function() {
    var globs = [
        '**/minecraft.css',
        '!bower_components/**/*',
        '!node_modules/**/*',
        '!dist/**/*'
    ]

    /* jshint unused:false */
    gulp.src(globs)
        .pipe(csslint('.csslintrc'))
        .pipe(csslint.reporter(function(file) {
            gutil.log(gutil.colors.cyan(file.csslint.errorCount) + ' errors in ' + gutil.colors.magenta(file.path));

            file.csslint.results.forEach(function(result) {
                gutil.log(result.error.message + ' on line ' + result.error.line);
            });
        }))
})

// https://github.com/contra/gulp-concat
gulp.task('concat-css', function() {
    var globs = [
        '**/*.css',
        '!css-tool/**/*',
        '!bower_components/**/*',
        '!node_modules/**/*',
        '!dist/**/*'
    ]

    var files = []

    /* jshint unused:false */
    gulp.src(globs)
        // https://github.com/rvagg/through2#flushfunction
        .pipe(through.obj(function(file, encoding, callback) {
            files.push(file)
            callback()
        }, function(callback) {
            files.sort(function(a, b) {
                return a.path.localeCompare(b.path)
            })
            files.forEach(function(file) {
                this.push(file)
            }, this)
            callback()
        }))
        .pipe(through.obj(function(file, encoding, callback) {
            file.contents = new Buffer(
                '/* ' + file.path.replace(__dirname, '') + ' */\n' +
                file.contents.toString()
            )
            callback(null, file)
        }))
        .pipe(concat('components.css'))
        .pipe(gulp.dest('./css-tool/'))
})

// https://github.com/plus3network/gulp-less
gulp.task('tpl-heredoc', function() {
    var Buffer = require('buffer').Buffer
    var globs = [
        '**/*.tpl',
        '!bower_components/**/*',
        '!node_modules/**/*',
        '!dist/**/*'
    ];
    /* jshint unused:false */
    gulp.src(globs)
        .pipe(through.obj(function(file, encoding, callback) {
            file.path = file.path + '.js'
            file.contents = new Buffer(
                '/* global define */\n' +
                'define(function() {\n' +
                '    return (function(){/*!\n' +
                file.contents.toString() +
                '\n    */}).toString().split("\\n").slice(1,-1).join("\\n")' +
                '\n})'
            )

            // console.log(file.contents.toString())
            // console.log(encoding)
            callback(null, file)
        }))
        .pipe(gulp.dest('./'))
})

// https://github.com/karlgoldstein/grunt-html2js/blob/master/tasks/html2js.js
gulp.task('tpl', function() {
    var Buffer = require('buffer').Buffer
    var globs = [
        '**/*.tpl',
        '!bower_components/**/*',
        '!node_modules/**/*',
        '!dist/**/*'
    ];
    /* jshint unused:false */
    gulp.src(globs)
        .pipe(through.obj(function(file, encoding, callback) {
            file.path = file.path + '.js'
            console.log(file.path)

            var quoteChar = '"'
            var indentString = '    '
            var escapeContent = function(content) {
                var bsRegexp = new RegExp('\\\\', 'g')
                var quoteRegexp = new RegExp('\\' + quoteChar, 'g')
                var nlReplace = '\\n' + quoteChar + ' +\n' + indentString + indentString + quoteChar
                return quoteChar +
                    content.replace(bsRegexp, '\\\\').replace(quoteRegexp, '\\' + quoteChar).replace(/\r?\n/g, nlReplace) +
                    quoteChar
            };

            file.contents = new Buffer(
                '/* global define */\n' +
                'define(function() {\n' +
                indentString + 'return ' +
                escapeContent(file.contents.toString()) +
                '\n})'
            )

            callback(null, file)
        }))
        .pipe(gulp.dest('./'))
})

/* gulp tpl2 - test */
/*
var base = 'bower_components/brix-components/'
var tpls = [
    'areapicker/areapicker.tpl',
    'boilerplate/boilerplate.tpl',
    'chart/chart.tpl',
    'colorpicker/colorpicker-svg-picker.tpl',
    'colorpicker/colorpicker-svg-slide.tpl',
    'colorpicker/colorpicker-vml-picker.tpl',
    'colorpicker/colorpicker-vml-slide.tpl',
    'colorpicker/colorpicker.tpl',
    'countdown/countdown.tpl',
    'ctree/ctree.tpl',
    'datepicker/datepicker.tpl',
    'datepickerwrapper/datepickerwrapper.tpl',
    'dialog/dialog.tpl',
    'dropdown/dropdown.tpl',
    'editor/editor.tpl',
    'ellipsis/ellipsis.tpl',
    'errortips/errortips.tpl',
    'hello/hello.tpl',
    'hello-extra/hello-extra.tpl',
    'hourpicker/hourpicker.tpl',
    'modal/modal.tpl',
    'nprogress/nprogress.tpl',
    'pagination/pagination.tpl',
    'popover/popover.tpl',
    'progressbarwrapper/progressbarwrapper.tpl',
    'readme/readme.tpl',
    'sidebar/sidebar.tpl',
    'slider/slider.tpl',
    'spin/spin.tpl',
    'suggest/suggest.item.tpl',
    'suggest/suggest.tpl',
    'switch/switch.tpl',
    'table/column-priority.tpl',
    'taginput/taginput.item.tpl',
    'taginput/taginput.tpl',
    'tree/tree.node.json.tpl',
    'tree/tree.node.tpl',
    'tree/tree.tpl',
    'wizard/wizard.tpl',
    'datepicker/ancient/datepicker.tpl'
]
tpls.forEach(function(tpl, index) {
    require([base + tpl + '.js', base + tpl + '-2.js'], function(tpl1, tpl2) {
        console.log(index, tpl, tpl1 === tpl2)
    })
})
*/

// https://github.com/RobinThrift/gulp-requirejs
// http://requirejs.org/docs/optimization.html#empty
gulp.task('rjs', function() {
    var empty = {
        'jquery': 'empty:',
        'underscore': 'empty:',
        'brix/loader': 'empty:',
        'brix/event': 'empty:',
        'components/base': 'empty:'
    }
    rjs({
            baseUrl: '.',
            name: 'dropdown/dropdown',
            out: 'dropdown/dropdown.js',
            paths: empty
        }).pipe(uglify({}))
        .pipe(gulp.dest('./dist/'))
})

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

// https://github.com/terinjokes/gulp-uglify
gulp.task('compress', function() {
    gulp.src([
            '*/**/*.js',
            '!bower_components/**/*',
            '!node_modules/**/*',
            '!dist/**/*'
        ])
        .pipe(uglify({
            preserveComments: 'some'
        }))
        .pipe(gulp.dest('dist'))

    // '!**/*.tpl.js',
    // gulp.src([
    //         '**/*.tpl.js',
    //         '!bower_components/**/*',
    //         '!node_modules/**/*',
    //         '!dist/**/*'
    //     ])
    //     .pipe(gulp.dest('dist'))
})

// https://github.com/murphydanger/gulp-minify-css
gulp.task('minify-css', function() {
    var globs = [
        '*/**/*.css',
        '!bower_components/**/*',
        '!node_modules/**/*',
        '!dist/**/*'
    ]
    return gulp.src(globs)
        .pipe(minifyCss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('dist'));
})

gulp.task('default', ['hello', 'jshint', 'less', 'concat-css', 'csslint', 'tpl', 'compress', 'minify-css', 'watch'])