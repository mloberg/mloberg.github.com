const Encore = require("@symfony/webpack-encore");

process.env.NODE_ENV = Encore.isProduction() ? "production": "dev";

Encore
  .setOutputPath("src/assets")
  .setPublicPath("/assets")
  .addStyleEntry("app", "./assets/css/app.css")
  .addEntry("post", "./assets/js/post.js")
  .addEntry("names", "./assets/js/names.js")
  .copyFiles({
    from: "./assets/fonts",
    to: "fonts/[path][name].[ext]"
  })
  .disableSingleRuntimeChunk()
  .enablePostCssLoader()
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
;

module.exports = Encore.getWebpackConfig();
