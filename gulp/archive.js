var fs = require('graceful-fs');//读写模块
var glob = require('glob');//读取文件列表模块
var gulp = require('gulp');//gulp主模块
var path = require('path');//目录模块
var sequence = require('run-sequence');//执行顺序模块

var pkg = require('../package.json');

var dirs = require('./dirs');

gulp.task('archive:zip', function (done) {

    var archiveName = path.resolve(dirs.archive, pkg.name + '_v' + pkg.version + '.zip');
    var archiver = require('archiver')('zip');
    var files = glob.sync('**/*.*', {
        'cwd': dirs.dist,
        'dot': true
    });

    var output = fs.createWriteStream(archiveName);

    archiver.on('error', function (error) {
        done();
        throw error;
    });

    output.on('close', done);

    files.forEach(function (file) {

        var filePath = path.resolve(dirs.dist, file);

        // `archiver.bulk` does not maintain the file
        // permissions, so we need to add files individually
        archiver.append(fs.createReadStream(filePath), {
            'name': file,
            'mode': fs.statSync(filePath).mode
        });

    });

    archiver.pipe(output);
    archiver.finalize();

});

gulp.task('archive:create_archive_dir',function () {
    fs.mkdirSync(path.resolve(dirs.archive), '0755');
});

gulp.task('archive', function (done) {
    sequence(
        'archive:create_archive_dir',
        'archive:zip',
        done);
});

module.exports = gulp;