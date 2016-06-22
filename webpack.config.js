module.exports = {
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
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             // warnings: false,
    //         },
    //         output: {
    //             comments: false,
    //         },
    //     }),
    // ]
};
