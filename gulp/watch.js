module.exports = function (gulp, plugins, __) {





    gulp.task('watch', ['sass:watch', 'js:watch', 'reload'], function () {
        console.log("watching you...");
    });

    gulp.task('reload', function () {
        var browserSync = require('browser-sync').create();
        browserSync.init({
            server: __.pub
        });

        gulp.watch(__.css_dest + "/*.css").on('change', function () {
            "use strict";
            setTimeout(browserSync.reload, 3000);
        });
        //gulp.watch(__.pub+"/*.html").on('change', browserSync.reload);
    });

    gulp.task('sass:watch', function () {
        gulp.watch(__.sass_src, ['sass']);
    });


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




