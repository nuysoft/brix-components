/* global require, console */
var gulp = require('gulp')
var through = require('through2')
var jshint = require('gulp-jshint')
var less = require('gulp-less')
var rjs = require('gulp-requirejs')
var uglify = require('gulp-uglify')
var minifyCss = require('gulp-minify-css')

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
        '!node_modules/**/*'
    ]
    gulp.watch(['**/*.js'].concat(globs), ['hello', 'jshint'])
    gulp.watch(['**/*.less'].concat(globs), ['hello', 'less'])
    gulp.watch(['**/*.tpl'].concat(globs), ['hello', 'tpl'])
})

// https://github.com/plus3network/gulp-less
gulp.task('less', function() {
    var globs = [
        '**/*.less',
        '!bower_components/**/*',
        '!node_modules/**/*'
    ]
    gulp.src(globs)
        .pipe(less({}))
        .pipe(gulp.dest('./'))
})

// https://github.com/plus3network/gulp-less
gulp.task('tpl', function() {
    var Buffer = require('buffer').Buffer
    var globs = [
        '**/*.tpl',
        '!bower_components/**/*',
        '!node_modules/**/*'
    ];
    /* jshint unused:false */
    gulp.src(globs)
        .pipe(through.obj(function(file, encoding, callback) {
            file.path = file.path + '.js'
            file.contents = new Buffer(
                '/* global define */\n' +
                'define(function() {\n' +
                '    return (function(){/*\n' +
                file.contents.toString() +
                "\n    */}).toString().split('\\n').slice(1,-1).join('\\n') + '\\n'" +
                '\n})'
            )

            // console.log(file.contents.toString())
            // console.log(encoding)
            callback(null, file)
        }))
        .pipe(gulp.dest('./'))
})

// https://github.com/RobinThrift/gulp-requirejs
gulp.task('rjs', function() { // TODO
    var build = {
        baseUrl: 'src',
        name: 'brix/base',
        out: 'dist/base.js',
        paths: {
            jquery: 'empty:',
            underscore: 'empty:',
            'brix/event': 'empty:'
        }
    }
    rjs(build)
        .pipe(gulp.dest('.')) // pipe it to the output DIR
})

// https://github.com/terinjokes/gulp-uglify
gulp.task('compress', function() {
    var globs = [
        '*/**/*.js',
        '!**/*.tpl.js',
        '!bower_components/**/*',
        '!node_modules/**/*',
        '!dist/**/*'
    ]
    gulp.src(globs)
        .pipe(uglify({
            preserveComments: 'some'
        }))
        .pipe(gulp.dest('dist'))
        // .pipe(through.obj(function(file, encoding, callback) {
        //     console.log(file.path)
        //     callback(null, file)
        // }))

    globs = [
        '**/*.tpl.js'
    ]
    gulp.src(globs)
        .pipe(gulp.dest('dist'))
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

gulp.task('default', ['hello', 'jshint', 'less', 'tpl', 'watch'])