const Encore = require('@symfony/webpack-encore');
const webpack = require('webpack');

Encore
  .setOutputPath('src/assets')
  .setPublicPath('/assets')
  .addEntry('app', './assets/js/app.js')
  .addEntry('post', './assets/js/post.js')
  .addEntry('search', './assets/js/search.js')
  .enablePostCssLoader()
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
  .addPlugin(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
;

module.exports = Encore.getWebpackConfig();
