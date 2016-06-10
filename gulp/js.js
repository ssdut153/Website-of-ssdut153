var del = require('del');
var gulp = require('gulp');//gulp主模块
var uglify = require('gulp-uglify');//js压缩模块

var dirs = require('./dirs');

gulp.task('cleanjs', function () {
    del([
        dirs.archive,
        dirs.dist + '/js/*.js',
        '!' + dirs.dist + 'js/lib/*.js'
    ]).then(function () {
        done();
    });
});

gulp.task('js', function () {
    return gulp
        .src([dirs.src + '/js/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest(dirs.dist + '/js'));
});

module.exports = gulp;