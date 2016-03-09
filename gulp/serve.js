module.exports = function (gulp, plugins, __) {

    gulp.task('serve', function () {
        var util = require('util'),
        spawn = require('child_process').spawn,
        ls = spawn('npm', ['run', 'serve']);

        ls.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });

        ls.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });

        ls.on('exit', function (code) {
            console.log('child process exited with code ' + code);
        });

    });
    return null;
};