var cleancss = require('gulp-clean-css');//css文件压缩模块
var del = require('del');
var gulp = require('gulp');//gulp主模块

var dirs = require('./dirs');

gulp.task('cleancss', function () {
    del([
        dirs.archive,
        dirs.dist + '/css'
    ]).then(function () {
        done();
    });
});

gulp.task('css', function () {
    return gulp
        .src([dirs.src + '/css/*.css'])
        .pipe(cleancss())
        .pipe(gulp.dest(dirs.dist + '/css'))
});

module.exports = gulp;