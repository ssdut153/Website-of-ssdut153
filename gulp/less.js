var cleancss = require('gulp-clean-css');//css文件压缩模块
var del = require('del');
var gulp = require('gulp');//gulp主模块
var less = require('gulp-less');//less编译模块

var dirs = require('./dirs');

gulp.task('cleanless', function () {
    del([
        dirs.archive,
        dirs.dist + '/less'
    ]).then(function () {
        done();
    });
});

gulp.task('less', function () {
    return gulp
        .src([dirs.src + '/less/*.less'])
        .pipe(less())
        .pipe(cleancss())
        .pipe(gulp.dest(dirs.dist + '/less'));
});

module.exports = gulp;