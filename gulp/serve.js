module.exports = function (gulp, plugins, __) {
    gulp.task('serve', function () {
        var browserSync = require('browser-sync').create();
        browserSync.init({
            server: __.pub
        });
    });
    return null;
};