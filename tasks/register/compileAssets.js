module.exports = function(grunt) {
    grunt.registerTask('compileAssets', [
        'clean:dev',
        'sass:min',
        'copy:dev'
    ]);
};
