module.exports = function (gulp, opt, __) {
    gulp.task('sass', function () {
        return gulp
            .src(__.sass_src)
            .pipe(opt.sourcemaps.init())
            .pipe(opt.sass(opt.sassOptions).on('error', opt.sass.logError))
            .pipe(opt.sourcemaps.write())
            .pipe(opt.autoprefixer(opt.autoprefixerOptions))
            .pipe(gulp.dest(__.css_dest))
            .resume();
    });
    gulp.task('sass:watch', function () {
        return gulp
            // Watch the __sass folder for change,
            // and run `sass` task when something happens
            .watch(__.sass_src, ['sass'])
            // When there is a change,
            // log a message in the console
            .on('change', function (event) {
                console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            });
    });
    gulp.task('sassdoc', function () {
        return gulp
            .src(__.sass_src)
            .pipe(opt.sassdoc({dest: __.sassdoc_dest}))
            .resume();
    });
    return null;
};