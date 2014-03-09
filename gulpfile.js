var gulp = require('gulp');
var browserify = require('gulp-browserify');
var myth = require('gulp-myth');
var concat = require('gulp-concat');
var cache = require('gulp-cache');
var gif = require('gulp-if');
var uglify = require('gulp-uglify');
var tests = require('gulp-jasmine');

var debug = process.env.NODE_ENV !== 'production';

gulp.task('scripts', ['tests'], function() {
    return gulp.src('js/app.js')
        .pipe(browserify({
            debug: debug,
            shim: {
                jquery: {
                    path: 'bower_components/jquery/jquery.js',
                    exports: '$'
                },
            }
        }))
        .pipe(gif(!debug, uglify()))
        .pipe(gulp.dest('builds/js'));
});

gulp.task('styles', function() {
    return gulp.src('css/main.css')
        .pipe(myth())
        .pipe(gulp.dest('builds/css'));
});

gulp.task('tests', function() {
    return gulp.src('tests/**/*.js')
        .pipe(tests());
});

gulp.task('default', ['styles', 'scripts'], function() {});

gulp.task('watch', function() {
    gulp.watch('gulpfile.js', ['scripts']);
    gulp.watch('js/**/*.js', ['scripts']);
    gulp.watch('tests/**/*.js', ['tests']);
    gulp.watch('css/**/*.css', ['styles']);
});
