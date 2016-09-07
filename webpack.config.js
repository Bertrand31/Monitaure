const webpack = require('webpack');
const merge = require('webpack-merge');

const common = {
    context: __dirname,
    entry: ['whatwg-fetch', 'babel-polyfill', './assets/js/app.jsx'],

    resolve: {
        extensions: ['', '.js', '.jsx'],
    },

    output: {
        path: 'public/bundles/',
        filename: 'bundle.js',
        chunkFilename: '[chunkhash].bundle.js',
        publicPath: '/bundles/',
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
            },
            {
                test: /\.(svg|png|jpg)$/,
                loader: 'url',
            },
            {
                test: /\.scss/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
};

let config;

switch (process.env.npm_lifecycle_event) {
    case 'webpack:prod':
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
