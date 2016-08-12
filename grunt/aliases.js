module.exports = {
    'default': ['dev'],

    'dev': [
        'sass:dev',
        'autoprefixer',
        'connect',
        'watch'
    ],

    'build': [
        'sass:dist',
        'autoprefixer'
    ]
};
