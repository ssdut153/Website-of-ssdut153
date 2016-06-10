var gulp = require('gulp');//gulp主模块
var sequence = require('run-sequence');//执行顺序模块
var build = require('./gulp/build');
var watch = require('./gulp/watch');
var archive = require('./gulp/archive');

gulp.task('default', function (done) {
    sequence(
        'build',
        'archive',
        'watch',
        done);
});