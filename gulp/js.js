module.exports = function (gulp, plugins, __) {

    gulp.task('js', function () {
        plugins.exec('npm run js', function (err, stdout, stderr) {
            if (err) {
                throw err;
            }
            else {
                console.log('js complete');
            }
        });
    });

    //Watch task
    //gulp.task('js:watch',function() {
    //    gulp.watch(__.js_src,['js']);
    //});

    gulp.task('js:watch', function () {
        return gulp
            // Watch the __sass folder for change,
            // and run `sass` task when something happens
            .watch(__.js_src+"/**.js", ['js'])
            // When there is a change,
            // log a message in the console
            .on('change', function (event) {
                console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            });
    });

};

