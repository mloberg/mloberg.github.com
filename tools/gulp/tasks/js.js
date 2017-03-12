var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var config = require('../config').js;

gulp.task('js', function () {
  browserSync.notify('Rebuilding JavaScript&hellip;');

  return gulp.src(config.src, {read: false})
    .pipe(browserify())
    .pipe(uglify())
    .pipe(gulp.dest(config.dest));
});
