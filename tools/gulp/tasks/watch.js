var gulp = require('gulp');
var browserSync = require('browser-sync');
var config = require('../config');

gulp.task('watch:jekyll', ['jekyll'], browserSync.reload);
gulp.task('watch:css', ['css']);
gulp.task('watch:images', ['images'], browserSync.reload);

gulp.task('watch', ['serve'], function() {
  gulp.watch(config.jekyll.watch, ['watch:jekyll']);
  gulp.watch(config.css.watch, ['watch:css']);
  gulp.watch(config.images.watch, ['watch:images']);
});
