module.exports = function(grunt) {
    grunt.config.set('webpack', {
        dev: {
			entry: './assets/js/app.js',
			output: {
				path: '.tmp/public/js/',
				filename: 'bundle.js',
                publicPath: '/js/'
			},
            module: {
                loaders: [{
                    // test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel',
                    query: {
                        presets: ['es2015']
                    }
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-webpack');
};

