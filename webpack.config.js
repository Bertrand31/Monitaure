const webpack = require('webpack');
const merge = require('webpack-merge');

const common = {
    context: __dirname,
    entry: {
        app: ['whatwg-fetch', './assets/js/app.jsx'],
        sw: './assets/js/ServiceWorker/sw.js',
    },

    resolve: {
        extensions: ['', '.js', '.jsx'],
    },

    output: {
        path: 'public/',
        filename: '[name].js',
        chunkFilename: '[chunkhash].app.js',
        publicPath: '/',
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
                        NODE_ENV: JSON.stringify('production'),
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
