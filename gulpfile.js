/* global require, console */
var gulp = require('gulp')
var jshint = require('gulp-jshint')
var less = require('gulp-less')
var rjs = require('gulp-requirejs')

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
        '!node_modules/**/*'
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
    var through = require('through2')
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
gulp.task('rjs', function() {
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

gulp.task('default', ['hello', 'jshint', 'less', 'tpl', 'watch'])