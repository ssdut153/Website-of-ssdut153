var del = require('del');
var gulp = require('gulp');//gulp主模块

var dirs = require('./dirs');

gulp.task('clean', function (done) {
    del([
        dirs.archive,
        dirs.dist
    ]).then(function () {
        done();
    });
});

module.exports = gulp;
