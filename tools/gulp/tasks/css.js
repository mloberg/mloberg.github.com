var gulp = require('gulp');
var postcss = require('gulp-postcss');
var atImport = require('postcss-import');
var cssnext = require('postcss-cssnext');
var utilities = require('postcss-utilities');
var mqpacker = require('css-mqpacker');
var cssnano = require('cssnano');
var browserSync = require('browser-sync');
var config = require('../config').css;
var env = require('../utilities/env');

gulp.task('css', function() {
  browserSync.notify('Rebuilding CSS&hellip;');

  var plugins = [
    atImport(config.processors.atImport),
    cssnext(config.processors.cssnext),
    utilities(),
    mqpacker(config.processors.mqpacker),
  ];

  if (env.prod()) {
    plugins.push(cssnano());
  }

  return gulp.src(config.src)
    .pipe(postcss(plugins))
    .pipe(gulp.dest(config.dest));
});
