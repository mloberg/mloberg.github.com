var Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('site/assets/')
    .setPublicPath('/assets')
    .cleanupOutputBeforeBuild()
    .enablePostCssLoader()
    .addLoader({
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'image-webpack-loader'
    })
    .addEntry('images/assets', './assets/js/assets.js')
    .addEntry('js/main', './assets/js/main.js')
    .addEntry('js/post', './assets/js/post.js')
    .addStyleEntry('css/main', './assets/css/main.css')
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
;

// export the final configuration
module.exports = Encore.getWebpackConfig();;
