'use strict';

var path = require('path');
var spawn = require('child_process').spawn;
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var __ = require('underscore');
var vendor = require('bower-files')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var AUTOPREFIXER_BROWSERS = [
  "Android 2.3",
  "Android >= 4",
  "Chrome >= 20",
  "Firefox >= 24",
  "Explorer >= 8",
  "iOS >= 6",
  "Opera >= 12",
  "Safari >= 6"
];

// Build scripts
gulp.task('scripts', function(done) {
  runSequence(['scripts:coffee', 'scripts:vendor'], 'scripts:copy', 'scripts:modernizr', done);
});

// Compile CoffeeScript
gulp.task('scripts:coffee', function() {
  return gulp.src('site/_assets/scripts/**/*.coffee')
    .pipe($.coffeelint())
    .pipe($.coffeelint.reporter())
    .pipe($.coffee())
    .pipe(gulp.dest('site/assets/scripts'))
    .pipe($.size({title: 'scripts:coffee'}));
});

// Install JavaScript files from Bower
gulp.task('scripts:vendor', function() {
  return gulp.src(vendor.ext('js').files)
    .pipe(gulp.dest('site/assets/scripts/vendor'))
    .pipe($.size({title: 'scripts:vendor'}));
});

// Copy scripts to assets directory and lint js files
gulp.task('scripts:copy', function() {
  return gulp.src('site/_assets/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')))
    .pipe(gulp.dest('site/assets/scripts'));
});

// Generate modernizr script
gulp.task('scripts:modernizr', function() {
  return gulp.src('site/assets/scripts/**/*.js')
    .pipe($.modernizr())
    .pipe(gulp.dest('site/assets/scripts/vendor'));
});

// Prefix stylesheets
gulp.task('styles', ['styles:sass', 'styles:vendor'], function() {
  return gulp.src('site/_assets/styles/**/*.css')
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('site/assets/styles'))
    .pipe($.size({title: 'styles'}));
});

// Compile Sass
gulp.task('styles:sass', function() {
  return gulp.src([
      'site/_assets/styles/**/*.scss',
      '!site/_assets/styles/**/_*.scss',
    ])
    .pipe($.sass({
      includePaths: __.uniq(vendor.ext('scss').files.map(path.dirname))
    }))
    .pipe(gulp.dest('site/assets/styles'))
    .pipe($.size({title: 'styles:sass'}));
});

// Install stylesheets from Bower
gulp.task('styles:vendor', function() {
  return gulp.src(vendor.ext('css').files)
    .pipe(gulp.dest('site/assets/styles/vendor'))
    .pipe($.size({title: 'styles:vendor'}));
});

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

// Install fonts
gulp.task('fonts', function() {
  var vendor_fonts = vendor.ext(['eot', 'woff', 'woff2', 'ttf', 'svg']).files;

  return gulp.src(vendor_fonts.concat('site/_assets/fonts/**/*'))
    .pipe(gulp.dest('site/assets/fonts'))
    .pipe($.size({title: 'fonts'}));
});

// Build the Jekyll site
gulp.task('build', function(done) {
  var proc = spawn("bundle", ["exec", "jekyll", "build"]);
  proc.on("exit", done);
});

// Serve the site. Watch for changes and reload
gulp.task('serve', ['default'], function(done) {
  browserSync({
    notify: false,
    server: {
      baseDir: 'build'
    }
  });

  gulp.watch(['site/_assets/styles/**/*.{scss,css}'], ['styles', 'build', reload]);
  gulp.watch(['site/_assets/scripts/**/*.{coffee,js}'], ['scripts']);
  gulp.watch(['site/_assets/images/**/*'], ['images']);
  gulp.watch(['site/_assets/fonts/**/*'], ['fonts']);
  gulp.watch(['site/**/*', '!site/_assets/**/*'], ['build', reload]);
});

// Build site for distribution (everything minified)
gulp.task('dist', ['default'], function() {
  return gulp.src(['build/**/*', '!build/**/*.{css,js}'])
    .pipe($.if('*.html', $.useref({searchPath: 'build'})))
    .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
    .pipe($.if('*.css', $.uncss({html: ['build/**/*.html']})))
    .pipe($.if('*.css', $.csso()))
    .pipe($.if('*.html', $.htmlhint()))
    .pipe($.if('*.html', $.htmlhint.reporter()))
    .pipe($.if('*.html', $.minifyHtml()))
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'html'}));
});

// Build and serve the output from dist
gulp.task('serve:dist', ['dist'], function() {
  browserSync({
    notify: false,
    server: {
      baseDir: 'dist'
    }
  });
});

// Remove build directories
gulp.task('clean', del.bind(null, ['site/assets', 'build', 'dist']));

// Build site
gulp.task('default', ['clean'], function(done) {
  runSequence(['styles', 'scripts', 'images', 'fonts'], 'build', done);
});
