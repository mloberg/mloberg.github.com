const Encore = require("@symfony/webpack-encore");
const webpack = require("webpack");

Encore
  .setOutputPath("src/assets")
  .setPublicPath("/assets")
  // .addStyleEntry("app", "./assets/css/app.css")
  .addEntry("app", "./assets/js/app.js")
  .addEntry("post", "./assets/js/post.js")
  .addEntry("search", "./assets/js/search.js")
  .addEntry("name-generator", "./assets/js/name-generator.js")
  .copyFiles({
    from: "./assets/fonts",
    to: "fonts/[path][name].[ext]"
  })
  .enableSingleRuntimeChunk()
  .enablePostCssLoader()
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
  .addPlugin(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
;

module.exports = Encore.getWebpackConfig();
