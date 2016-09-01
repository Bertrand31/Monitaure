module.exports = (grunt) => {
    grunt.registerTask('compileAssets', [
        'clean:dev',
        'copy:dev',
    ]);
};
