var gulp = require('gulp');
var gif = require('gulp-if');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var config = require('../config').js;
var env = require('../utilities/env');

gulp.task('js', function () {
  browserSync.notify('Rebuilding JavaScript&hellip;');

  return gulp.src(config.src, {read: false})
    .pipe(browserify({
      debug: env.dev(),
    }))
    .pipe(env.prod(uglify()))
    .pipe(gulp.dest(config.dest));
});
