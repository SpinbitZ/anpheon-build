var
gulp = require('gulp'),
opt = {
    title: "'A N P H E O N.org'",
    sassOptions: {
        errLogToConsole: true,
        outputStyle: 'expanded'
    },
    autoprefixerOptions: {
        browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
    },
    sass: require('gulp-sass'),
    sourcemaps: require('gulp-sourcemaps'),
    autoprefixer: require('gulp-autoprefixer'),
    sassdoc: require('gulp-sassdoc'),
    metalsmith: require('gulp-metalsmith'),
    del: require('del'),
    filter: require('gulp-filter'),
    exec: require('child_process').exec,

//// metalsmith
    markdown: require('metalsmith-markdown'),
    layouts: require('metalsmith-layouts'),
    collections: require('metalsmith-collections'),
    permalinks: require('metalsmith-permalinks'),
    beautify: require('metalsmith-beautify'),
    feed: require('metalsmith-feed'),
    moment: require('moment'),
    metadata: require('metalsmith-metadata'),
    gulpIgnore: require('gulp-ignore'),
    lens: require('./modules/lensmith'),
    date: require('metalsmith-build-date')
},
__ = {
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
};


getTask('content');
getTask('sass');
getTask('js');
getTask('serve');

gulp.task('clean:build', function () {
    return del([
        __.pub + '/**/*'
    ]);
});


gulp.task('default', ['sass', 'watch' /*, possible other tasks... */]);

gulp.task('build', ['content', 'sass', 'js']);

gulp.task('dev', ['build', 'sass:watch', 'serve']);


gulp.task('prod', ['sassdoc'], function () {
    return gulp
        .src(__.sass_src)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(__.css_dest));
});


function getTask(task) {
    return require('./gulp-tasks/' + task)(gulp, opt, __);
}


