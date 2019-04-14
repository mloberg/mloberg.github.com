const Encore = require("@symfony/webpack-encore");
const webpack = require("webpack");
const glob = require("glob-all");
const PurgecssPlugin = require("purgecss-webpack-plugin");

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

Encore
  .setOutputPath("src/assets")
  .setPublicPath("/assets")
  .addEntry("app", "./assets/js/app.js")
  .addEntry("post", "./assets/js/post.js")
  .addEntry("search", "./assets/js/search.js")
  .addEntry("name-generator", "./assets/js/name-generator.js")
  .enableSingleRuntimeChunk()
  .enablePostCssLoader()
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
  .addPlugin(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
;

if (Encore.isProduction()) {
  Encore.addPlugin(new PurgecssPlugin({
    paths: glob.sync([
      "dist/**/*.html",
      "dist/assets/*.js",
    ]),
    extractors: [
      {
        extractor: TailwindExtractor,
        extensions: ["html", "js"],
      },
    ],
    whitelistPatterns: [/ais/],
  }));
}

module.exports = Encore.getWebpackConfig();
