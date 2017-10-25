const purecss = require('purecss');

module.exports = {
    plugins: {
        'postcss-import': {
            resolve: function (id, basedir, importOptions) {
                var match = id.match(/purecss\/?(.+)?/);

                return match
                    ? purecss.getFilePath((match[1] || 'pure') + '.css')
                    : id;
            }
        },
        'postcss-cssnext': {},
        'css-mqpacker': {}
    }
}
