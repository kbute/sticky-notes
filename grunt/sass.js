module.exports = {
    options: {
    },

    dev: {
        options: {
            outputStyle: 'expanded',
            sourceMap: true,
            sourceMapContents: true
        },
        files: [{
            expand: true,
            src: ['**/*.scss', '!**/scss/_*.scss', '!**/.sass-cache/*', '!**/bower_components/**', '!**/node_modules/**'],
            dest: './css/',
            ext: '.css',
            rename: function(dest, src) {
                return src.replace('scss/', 'css/');
            }
        }]
    },

    dist: {
        options: {
            outputStyle: 'compressed',
            sourceMap: false,
            sourceMapContents: false
        },
        files: [{
            expand: true,
            src: ['**/*.scss', '!**/scss/_*.scss', '!**/.sass-cache/*', '!**/bower_components/**', '!**/node_modules/**'],
            dest: './css/',
            ext: '.css',
            rename: function(dest, src) {
                return src.replace('scss/', 'css/');
            }
        }]
    }

};
