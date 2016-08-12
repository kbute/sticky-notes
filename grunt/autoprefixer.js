module.exports = {
    options: {
        browsers: ['last 2 versions', '> 1%', 'ie 11']
    },
    main: {
        expand: true,
        flatten: true,
        src: 'css/*.css',
        dest: 'dist/'
    }
};
