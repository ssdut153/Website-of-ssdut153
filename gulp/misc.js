var del = require('del');
var gulp = require('gulp');//gulp主模块

var dirs = require('./dirs');

gulp.task('cleanmisc', function () {
    del([
        dirs.archive,
        dirs.dist + '/images/*'
    ]).then(function () {
        done();
    });
});

gulp.task('copy:misc', function () {
    return gulp
        .src([
            dirs.src + '/images/*'
        ], {
            dot: true
        })
        .pipe(gulp.dest(dirs.dist + '/images'));
});

module.exports = gulp;