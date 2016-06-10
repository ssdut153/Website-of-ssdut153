var del = require('del');
var gulp = require('gulp');//gulp主模块
var sequence = require('run-sequence');//执行顺序模块

var dirs = require('./dirs');

var clean = require('./clean');
var css = require('./css');
var js = require('./js');
var less = require('./less');
var misc = require('./misc');
var plugins = require('./plugins');
var pug = require('./pug');

gulp.task('copy', function (done) {
    sequence([
            'copy:plugins',
            'copy:misc'],
        done);
});

gulp.task('compress', function (done) {
    sequence([
            'css',
            'js'],
        done);
});

gulp.task('compile', function (done) {
    sequence([
            'pug',
            'less'],
        done);
});

gulp.task('dist', function (done) {
    sequence([
        'compile',
        'compress',
        'copy'],
        done);
});

gulp.task('build', function (done) {
    sequence(
        'clean',
        'dist',
        done);
});

module.exports = gulp;