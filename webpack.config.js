const webpack = require('webpack');
const merge = require('webpack-merge');

const common = {
    context: __dirname,
    entry: ['whatwg-fetch', 'babel-polyfill', './assets/js/app.js'],

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    output: {
        path: '.tmp/public/js/',
        filename: 'bundle.js',
        chunkFilename: '[chunkhash].bundle.js',
        publicPath: '/js/'
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: /node_modules/
        }]
    },
};

let config;

switch (process.env.npm_lifecycle_event) {
    case 'build':
        config = merge(common, {
            plugins: [
                new webpack.DefinePlugin({
                    'process.env': {
                        'NODE_ENV': JSON.stringify('production'),
                    },
                }),
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false,
                    },
                    output: {
                        comments: false,
                    },
                }),
            ],
        });
        break;

    default:
        config = merge(common, {});
}

module.exports = config;
