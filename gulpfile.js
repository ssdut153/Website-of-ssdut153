var clean = require('gulp-clean-css');
var fs = require('graceful-fs');
var glob = require('glob');
var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var pug = require('gulp-pug');
var plugins = require('gulp-load-plugins')();
var sequence = require('run-sequence');
var uglify = require('gulp-uglify');

var pkg = require('./package.json');

var dirs = pkg['h5bp-configs'].directories;

gulp.task('archive:create_archive_dir',function () {
    fs.mkdirSync(path.resolve(dirs.archive), '0755');
});

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

gulp.task('clean', function (done) {
    require('del')([
        dirs.archive,
        dirs.dist
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
            pretty: true
        }))
        .pipe(gulp.dest(dirs.dist));
});

gulp.task('css', function () {
    return gulp
        .src([dirs.src + '/css/*.css'])
        .pipe(clean())
        .pipe(gulp.dest(dirs.dist + '/css'))
});

gulp.task('less', function () {
    return gulp
        .src([dirs.src + '/less/*.less'])
        .pipe(less())
        .pipe(clean())
        .pipe(gulp.dest(dirs.dist + '/css'));
});

gulp.task('js', function () {
    return gulp
        .src([dirs.src + '/js/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest(dirs.dist + '/js'));
});

gulp.task('copy',[
    'copy:jquery',
    'copy:misc'
]);

gulp.task('copy:jquery', function () {
    return gulp
        .src(['node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest(dirs.dist + '/js/vendor'));
});

gulp.task('copy:misc', function () {
    return gulp
        .src([
            dirs.src + '/**/*',
            '!' + dirs.src + '/*.pug',
            '!' + dirs.src + '/includes/*.pug',
            '!' + dirs.src + '/includes/*/*.pug',
            '!' + dirs.src + '/css/*.css',
            '!' + dirs.src + '/less/*.less',
            '!' + dirs.src + '/js/*.js'
        ], {
            dot: true
        })
        .pipe(gulp.dest(dirs.dist));
});

gulp.task('archive', function (done) {
    sequence(
        'build',
        'archive:create_archive_dir',
        'archive:zip',
        done);
});

gulp.task('build', function (done) {
    sequence(
        ['clean'],
        'copy',
        'pug',
        'css',
        'less',
        'js',
        done);
});

gulp.task('default', ['archive']);
