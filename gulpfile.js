/* global require, console, Buffer, __dirname */
var gulp = require('gulp')
var through = require('through2')
var concat = require('gulp-concat')
var jshint = require('gulp-jshint')
var less = require('gulp-less')
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
        '!node_modules/**/*',
        '!dist/**/*'
    ]
    gulp.watch(['**/*.js', '!**/*.tpl.js'].concat(globs), ['hello', 'jshint', 'compress'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
        })
    gulp.watch(['**/*.less'].concat(globs), ['hello', 'less', 'concat-css', 'minify-css'])
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

// https://github.com/contra/gulp-concat
gulp.task('concat-css', function() {
    var globs = [
        '**/*.css',
        '!css-tool/**/*',
        '!bower_components/**/*',
        '!node_modules/**/*',
        '!dist/**/*'
    ]
    /* jshint unused:false */
    gulp.src(globs)
        .pipe(through.obj(function(file, encoding, callback) {
            file.contents = new Buffer(
                '/* ' + file.path.replace(__dirname, '') + ' */\n' +
                file.contents.toString()
            )
            callback(null, file)
        }))
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./css-tool/'))
})

// https://github.com/plus3network/gulp-less
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
            file.contents = new Buffer(
                '/* global define */\n' +
                'define(function() {\n' +
                '    return (function(){/*\n' +
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

// https://github.com/terinjokes/gulp-uglify
gulp.task('compress', function() {
    gulp.src([
            '*/**/*.js',
            '!**/*.tpl.js',
            '!bower_components/**/*',
            '!node_modules/**/*',
            '!dist/**/*'
        ])
        .pipe(uglify({
            preserveComments: 'some'
        }))
        .pipe(gulp.dest('dist'))

    gulp.src([
            '**/*.tpl.js',
            '!bower_components/**/*',
            '!node_modules/**/*',
            '!dist/**/*'
        ])
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

gulp.task('default', ['hello', 'jshint', 'less', 'concat-css', 'tpl', 'compress', 'minify-css', 'watch'])