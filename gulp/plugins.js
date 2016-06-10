var del = require('del');
var gulp = require('gulp');//gulp主模块

var dirs = require('./dirs');

gulp.task('copy:jquery', function () {
    return gulp
        .src(['node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest(dirs.dist + '/js/lib'));
});

gulp.task('copy:plugins', ['copy:jquery']);

module.exports = gulp;