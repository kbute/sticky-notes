module.exports = {
    options: {
        livereload: true
    },
    scss: {
        tasks: ['sass:dev'],
        files: ['**/scss/*.scss', '!**/bower_components/**', '!**/tcom/**']
    },
    css: {
        files: ['**/css/*.css', '!**/bower_components/**', '!**/tcom/**']
    },
    js: {
        files: ['require.config.js', '**/js/**/*.js', '!**/bower_components/**', '!**/tcom/**']
    },
    html: {
        files: ['**/*.html', '!**/bower_components/**', '!**/tcom/**']
    }
};
