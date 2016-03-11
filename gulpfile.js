var
    __ = {
        title: "'A N P H E O N.org'",
        sassOptions: {
            errLogToConsole: true,
            outputStyle: 'expanded'
        },
        autoprefixerOptions: {
            browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
        },
        build: __dirname,
        build_src: 'src',
        pub: './__pub',
        sass_src: './theme/smas/**/*.scss',
        css_dest: './__pub/theme',
        js_src: './src/io',
        js_dest: '/io',
        sassdoc_dest: './theme/sassdoc',
        content_src: './src/**',
        content_src_minus: '!./src/io/**'
    },
    gulp = require('gulp'),
    plugins = require('./gulp/plugins');

gulp.task('default', function (err) {
    "use strict";
    console.log("yo.....!");
});

getTask('content');
getTask('sass');
getTask('js');
getTask('serve');
//
////TODO
//gulp.task('default', ['sass', 'watch' /*, possible other tasks... */]);
//
gulp.task('build', ['content', 'sass', 'js']);

gulp.task('dev', ['build', 'sass:watch', 'serve']);

gulp.task('clean:build', function () {
    return plugins.del([
        __.pub + '/**/*'
    ]);
});

gulp.task('prod', ['sassdoc'], function () {
    return gulp
        .src(__.sass_src)
        .pipe(plugins.sass({outputStyle: 'compressed'}))
        .pipe(plugins.autoprefixer(__.autoprefixerOptions))
        .pipe(gulp.dest(__.css_dest));
});

function getTask(task) {
    return require('./gulp/' + task)(gulp, plugins, __);
}


