const webpack = require('webpack');

module.exports = function(grunt) {
    grunt.config.set('webpack', {
        dev: {
			entry: ['whatwg-fetch', 'babel-polyfill', './assets/js/app.js'],

            resolve: {
                extensions: ['', '.js', '.jsx']
            },

			output: {
				path: '.tmp/public/js/',
				filename: 'bundle.js',
                publicPath: '/js/'
			},

            module: {
                loaders: [{
                    test: /\.jsx?$/,
                    loader: 'babel',
                    exclude: /node_modules/
                    // query: {
                    //     presets: ['es2015']
                    // }
                }]
            }
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
        }
    });

    grunt.loadNpmTasks('grunt-webpack');
};

