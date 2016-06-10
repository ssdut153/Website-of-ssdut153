var del = require('del');
var gulp = require('gulp');//gulp主模块
var pug = require('gulp-pug');//pug编译模块

var dirs = require('./dirs');

gulp.task('cleanpug', function () {
    del([
        dirs.archive,
        dirs.dist + '/*.pug'
    ]).then(function () {
        done();
    });
});

gulp.task('pug', function () {
    return gulp
        .src([
            dirs.src + '/*.pug',
            '!' + dirs.src +  '/includes/*.pug'
        ])
        .pipe(pug({
            /*pretty: true*/
        }))
        .pipe(gulp.dest(dirs.dist));
});

module.exports = gulp;