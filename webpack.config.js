const glob = require('glob');
const Encore = require('@symfony/webpack-encore');
const webpack = require('webpack');
const PurgecssPlugin = require('purgecss-webpack-plugin');

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

Encore
  .setOutputPath('src/assets')
  .setPublicPath('/assets')
  .addEntry('app', './assets/js/app.js')
  .addEntry('search', './assets/js/search.js')
  .enablePostCssLoader()
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
  .addPlugin(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
;

if (Encore.isProduction()) {
  Encore.addPlugin(new PurgecssPlugin({
    paths: glob.sync('{src,assets}/**/*.{html,md,js}', { nodir: true }).filter( x => {
      return x.indexOf('src/assets') !== 0;
    }),
    extractors: [
      {
        extractor: TailwindExtractor,
        extensions: ['html', 'js', 'md']
      }
    ],
    whitelistPatternsChildren: [/highlight/, /post__content/, /ais/]
  }))
}

module.exports = Encore.getWebpackConfig();
