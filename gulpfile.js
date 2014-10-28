var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var glob = require('glob');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var spawn = require('child_process').spawn;
var reload = browserSync.reload;

// Optimize images
gulp.task('images', function() {
  return gulp.src('site/_assets/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('site/assets/images'))
    .pipe($.size({title: 'images'}));
});

// Compile Sass with Compass
gulp.task('styles', function() {
  return gulp.src('site/_assets/sass/*.scss')
    .pipe($.compass({
      bundle_exec: true,
      sass: 'site/_assets/sass',
      css: 'site/assets/css',
      images: 'site/assets/images',
      font: 'site/assets/fonts',
      comments: false,
      require: ['bootstrap-sass', 'font-awesome-sass'],
    }))
    .pipe(gulp.dest('site/assets/css'))
    .pipe($.size({title: 'styles'}));
});

// Lint CoffeeScript
gulp.task('lint', function() {
  return gulp.src('site/_assets/coffee/*.coffee')
    .pipe($.coffeelint())
    .pipe($.coffeelint.reporter());
});

// Compile and compress CoffeeScript
gulp.task('scripts', ['lint'], function() {
  return gulp.src('site/_assets/coffee/*.coffee')
    .pipe($.coffee().on('error', $.util.log))
    .pipe($.concat('site.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('site/assets/js/'))
    .pipe($.size({title: 'scripts'}));
});

// Build the site
gulp.task('build', function(done) {
  var proc = spawn("bundle", ["exec", "jekyll", "build"]);
  proc.on("exit", done);
});

// Serve the site. Watch for changes and reload
gulp.task('serve', ['default'], function(cb) {
  browserSync({
    notify: false,
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch(['site/_assets/sass/*.scss'], ['styles', 'build', reload]);
  gulp.watch(['site/_assets/coffee/*.coffee'], ['scripts']);
  gulp.watch(['site/_assets/images/**/*'], ['images']);
  gulp.watch(['site/**/*', '!site/_assets/**/*'], ['build', reload]);
});

// Build site for distribution
gulp.task('dist', function(done) {
  runSequence('default', 'dist:css', 'dist:html', done);
});

// Minify and optimize CSS
gulp.task('dist:css', ['dist:uncss'], function() {
  return gulp.src('dist/assets/css/**/*.css')
    .pipe($.csso())
    .pipe($.size({title: 'dist:css'}))
    .pipe(gulp.dest('dist/assets/css'));
});

// Remove unused CSS
gulp.task('dist:uncss', function() {
  return gulp.src('dist/assets/css/main.css')
    .pipe($.uncss({
      html: glob.sync('dist/**/*.html'),
    }))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe($.size({title: 'dist:uncss'}));
});

// Validate and minify HTML
gulp.task('dist:html', function() {
  return gulp.src('dist/**/*.html')
    .pipe($.htmlhint())
    .pipe($.htmlhint.reporter())
    .pipe($.minifyHtml())
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'dist:html'}));
});

// Remove output directory
gulp.task('clean', del.bind(null, ['site/assets/css', 'site/assets/images', 'site/assets/js', 'dist']));

// Build site
gulp.task('default', ['clean'], function(done) {
  runSequence(['styles', 'scripts', 'images'], 'build', done);
});
