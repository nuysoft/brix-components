/* global require */

var gulp = require('gulp')
var jshint = require('gulp-jshint')
var less = require('gulp-less')

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
    gulp.watch(['**/*.js'].concat(globs), ['jshint'])
    gulp.watch(['**/*.less'].concat(globs), ['less'])
    gulp.watch(['**/*.tpl'].concat(globs), ['tpl'])
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

gulp.task('default', ['jshint', 'less', 'tpl', 'watch'])