const webpack = require('webpack');
const merge = require('webpack-merge');

const common = {
    context: __dirname,
    entry: {
        app: ['whatwg-fetch', './interface/app.jsx'],
        sw: './interface/ServiceWorker/sw.js',
    },

    resolve: {
        extensions: ['.js', '.jsx'],
    },

    output: {
        path: 'public/',
        filename: '[name].js',
        chunkFilename: '[chunkhash].app.js',
        publicPath: '/',
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel',
                exclude: /node_modules/,
            },
            {
                test: /\.(svg|png|jpg)$/,
                use: 'url',
            },
            {
                test: /\.scss/,
                use: [
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
                    sourceMap: false,
                }),
                new webpack.LoaderOptionsPlugin({
                    minimize: true,
                    debug: false
                }),
            ],
        });
        break;

    default:
        config = merge(common, {});
}

module.exports = config;
