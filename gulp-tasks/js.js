module.exports = function (gulp, opt, __) {

    gulp.task('js', function () {
        opt.exec('npm run js', function (err, stdout, stderr) {
            if (err) {
                throw err;
            }
            else {
                console.log('js complete');
            }
        });
    });

    gulp.task('js:watch', function () {
        return gulp
            // Watch the __sass folder for change,
            // and run `sass` task when something happens
            .watch(__.js_src, ['js'])
            // When there is a change,
            // log a message in the console
            .on('change', function (event) {
                console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            });
    });

    gulp.task('reload-js', function () {
        gulp.src('./src/**/*.js')
            .pipe(connect.reload());
    });

    return null;
};

