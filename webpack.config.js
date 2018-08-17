const Encore = require('@symfony/webpack-encore');

Encore
  .setOutputPath('src/assets')
  .setPublicPath('/assets')
  .addEntry('app', './assets/js/app.js')
  .enablePostCssLoader()
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
;

module.exports = Encore.getWebpackConfig();
