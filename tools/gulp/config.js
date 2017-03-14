var purecss = require('purecss');
var src = 'site';
var dest = 'build';
var assetsSrc = src + '/_assets';
var assetsDest = src + '/assets';

module.exports = {
  css: {
    src: assetsSrc + '/css/*.css',
    dest: assetsDest + '/css',
    watch: assetsSrc + '/css/**/*.css',
    processors: {
      atImport: {
        resolve: function (id, basedir, importOptions) {
          var match = id.match(/purecss\/?(.+)?/);

          if (match) {
            return purecss.getFilePath((match[1] || "pure") + ".css");
          }

          return id;
        },
      },
      cssnext: {
        browsers: ['last 2 versions'],
      },
      mqpacker: {
        sort: true,
      },
    },
  },
  js: {
    src: assetsSrc + '/js/*.js',
    dest: assetsDest + '/js',
    watch: assetsSrc + '/js/**/*.js',
  },
  images: {
    src: assetsSrc + '/images/*',
    dest: assetsDest + '/img',
    watch: assetsSrc + '/images/*',
    processors: {
      imagemin: {
        optimizationLevel: 3,
        progessive: true,
        interlaced: true,
        svgoPlugins: [{
          removeViewBox: false,
        }],
      },
    },
  },
  fonts: {
    src: 'node_modules/font-awesome/fonts/*',
    dest: assetsDest + '/fonts',
  },
  jekyll: {
    src: src,
    dest: dest,
    config: '_config.yml',
    options: [],
    watch: [
      '_config.yml',
      src + '/_data/**/*',
      src + '/_includes/**/*',
      src + '/_layouts/**/*',
      src + '/_plugins/**/*',
      src + '/_posts/**/*',
      src + '/**/*.{html,markdown,md,yml,json,txt,xml,rb}',
    ],
  },
  browserSync: {
    server: {
      baseDir: dest,
    },
    serveStatic: [{
      route: '/assets',
      dir: assetsDest,
    }],
    files: [
      assetsDest + "/**/*",
    ],
    notify: {
      styles: ['display: hidden; padding: 12px; font-family: sans-serif; position: fixed; font-size: 14px; z-index: 10000; left: 0; bottom: 0; width: 200px; margin: 0; border-top-left-radius: 0; border-top-right-radius: 3px; color: #fff; text-align: center; background-color: rgba(0, 0, 0, 0.75);']
    },
  },
  clean: [
    assetsDest,
  ],
  optimize: {
    html: {
      src: dest + '/**/*.html',
      dest: dest,
      htmlmin: {
        collapseWhitespace: true,
        removeComments: true,
      },
    },
  },
};
