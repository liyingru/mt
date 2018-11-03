var gulp = require('gulp');

var sass = require('gulp-sass');
var fs = require('fs');
gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
});

gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('sass'))
})

gulp.task('dev', gulp.series('sass', 'watch'));


var webserver = require('gulp-webserver');
var data = require('./src/data/data.json');

gulp.task('server', function() {
    return gulp.src('./src/')
        .pipe(webserver({
            port: 8080,
            host: '127.0.0.1',
            livereload: true,
            middleware: function(req, res, next) {
                if (req.url === '/favicon.ico') {
                    res.end('');
                    return;
                }
                var pathname = require('url').parse(req.url).pathname;
                if (pathname === '/api/content') {
                    res.end(JSON.stringify({ code: 1, data: data }));
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(require('path').join(__dirname, 'src', pathname)));
                }
            }
        }))
})


//压缩文件
var uglify = require('gulp-uglify'); //压缩插件
var babel = require('gulp-babel');
gulp.task('buildUglify', function() {
    return gulp.src('./src/js/index.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./src/js/min'));
})