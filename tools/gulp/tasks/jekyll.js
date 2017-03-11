var gulp = require('gulp');
var browserSync = require('browser-sync');
var cp = require('child_process');
var config = require('../config').jekyll;

gulp.task('jekyll', function(done) {
  browserSync.notify('Rebuilding Jekyll&hellip;');

  return cp.spawn('bundle', [
    'exec',
    'jekyll',
    'build',
    '-q',
    '--source=' + config.src,
    '--destination=' + config.dest,
    '--config=' + config.config,
  ].concat(config.options), {
    stdio: 'inherit'
  }).on('close', done);
});
