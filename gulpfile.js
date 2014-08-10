var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    runSequence = require('run-sequence'),
    spawn = require('child_process').spawn;

gulp.task('images', function() {
  return gulp.src('site/_assets/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('site/assets/images'))
    .pipe($.size({title: 'images'}));
});

gulp.task('styles', function() {
  return gulp.src('site/_assets/sass/*.scss')
    .pipe($.compass({
      bundle_exec: true,
      sass: 'site/_assets/sass',
      css: 'site/assets/css',
      images: 'site/assets/images',
      font: 'site/assets/fonts',
      style: 'compressed',
      comments: true,
      require: ['compass_twitter_bootstrap'],
    }))
    .pipe(gulp.dest('site/assets/css'))
    .pipe($.size({title: 'styles'}));
});

gulp.task('build', ['styles', 'images'], function(done) {
  proc = spawn("bundle", ["exec", "jekyll", "build"]);
  proc.on("exit", done);
});

gulp.task('serve', ['styles', 'images'], function(cb) {
  proc = spawn("bundle", ["exec", "jekyll", "serve", "--drafts", "--watch"]);

  proc.stdout.on('data', function(data) {
    process.stdout.write(data);
  });

  proc.stderr.on('data', function(data) {
    process.stderr.write(data);
  });

  gulp.watch(['site/_assets/sass/**/*.scss'], ['styles']);
});

gulp.task('default', function(done) {
  runSequence(['styles', 'images'], 'build', done);
});
