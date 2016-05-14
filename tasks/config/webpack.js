module.exports = function(grunt) {
    grunt.config.set('webpack', {
        dev: {
			entry: './assets/js/app.js',
			output: {
				path: '.tmp/public/js/',
				filename: 'bundle.js',
                publicPath: '/js/'
			}
        }
    });

    grunt.loadNpmTasks('grunt-webpack');
};

