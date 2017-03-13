var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var config = require('../config').optimize;

gulp.task('production', function (done) {
  process.env.JEKYLL_ENV = 'production';

  runSequence('build', 'optimize:html', done);
});

gulp.task('prod', ['production']);

gulp.task('optimize:html', function () {
  return gulp.src(config.html.src)
    .pipe(htmlmin(config.html.htmlmin))
    .pipe(gulp.dest(config.html.dest));
});
