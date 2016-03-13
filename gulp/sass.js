module.exports = function (gulp, plugins, __) {
    gulp.task('sass', function () {
        return gulp
            .src(__.sass_src)
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass(__.sassOptions).on('error', plugins.sass.logError))
            .pipe(plugins.sourcemaps.write())
            .pipe(plugins.autoprefixer(__.autoprefixerOptions))
            .pipe(gulp.dest(__.css_dest))
            .resume();
    });

    gulp.task('sassdoc', function () {
        return gulp
            .src(__.sass_src)
            .pipe(plugins.sassdoc({dest: __.sassdoc_dest}))
            .resume();
    });
    return null;
};