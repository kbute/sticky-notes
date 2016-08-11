module.exports = {
    'default': ['dev'],

    'dev': [
        'sass:dev',
        'connect',
        'watch'
    ],

    'build': [
        'sass:dist',
    ]
};
