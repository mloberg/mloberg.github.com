var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var browserSync = require('browser-sync');
var config = require('../config').images;

gulp.task('images', function() {
  browserSync.notify('Rebuilding Images&hellip;')

  return gulp.src(config.watch)
    .pipe(changed(config.dest))
    .pipe(imagemin(config.processors.imagemin))
    .pipe(gulp.dest(config.dest));
});
