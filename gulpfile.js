const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
var sass = require('gulp-sass')(require('sass'));
var rigger = require('gulp-rigger');
const htmlmin = require('gulp-htmlmin');


gulp.task('html', function () {
    return gulp.src('./src/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('./dist'));
});

gulp.task('minify', () => {
    return gulp.src('./dist/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function scss() {
    return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css/'))
});

gulp.task('watch', function() {
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'))
    gulp.watch('./src/**/*.html', gulp.series('html', 'minify'))
});