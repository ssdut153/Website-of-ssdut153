var gulp = require('gulp');//gulp主模块
var sequence = require('run-sequence');//执行顺序模块
var watch = require('gulp-watch');

var dirs = require('./dirs');

gulp.task('watch', function () {
    watch(dirs.src + '/less/*.less', function () {
        sequence('cleanless', 'less', 'archive:create_archive_dir', 'archive:zip');
    });
    watch(dirs.src + '/**/*.pug', function () {
        sequence('cleanpug', 'pug', 'archive:create_archive_dir', 'archive:zip');
    });
    watch(dirs.src + '/css/*.css', function () {
        sequence('cleancss', 'css', 'archive:create_archive_dir', 'archive:zip');
    });
    watch(dirs.src + '/js/*.js', function () {
        sequence('cleanjs', 'js', 'archive:create_archive_dir', 'archive:zip');
    });
    watch(dirs.src + '/images/*', function () {
        sequence('cleanmisc', 'copy:misc', 'archive:create_archive_dir', 'archive:zip');
    });
});

module.exports = gulp;