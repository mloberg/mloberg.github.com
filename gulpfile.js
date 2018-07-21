const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const clean = require('gulp-clean');

gulp.task('html', () =>
  gulp.src('dist/**/*.html')
    .pipe(useref({ searchPath: 'dist' }))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.html', htmlmin({
      collapseWhitespace: true,
      removeComments: true,
    })))
    .pipe(gulp.dest('dist'))
);

gulp.task('images', () =>
  gulp.src('dist/assets/images/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false},
        ],
      }),
      mozjpeg({quality: 85}),
    ]))
    .pipe(gulp.dest('dist/assets/images'))
);

gulp.task('default', ['html', 'images'], () =>
  gulp.src('dist/assets/js', {read: false})
    .pipe(clean())
);
