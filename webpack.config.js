const path = require('path');

module.exports = {
    mode: 'development',
    entry: './webpack/post.js',
    output: {
        filename: 'post.js',
        path: path.resolve(__dirname, 'src/assets/js')
    }
};
