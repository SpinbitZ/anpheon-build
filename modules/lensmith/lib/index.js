var debug = require('debug')('lensmith '),
glob = require("glob");


//var _ = require('lodash');
//var jsBeautify = require('js-beautify');
//var extname = require('path').extname;
//var htmlBeautify = jsBeautify.html;
//var cssBeautify = jsBeautify.css;
//
//var TYPES = ['js', 'css', 'html'];

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to ...
 *
 * @param {Object} options (optional)
 * @return {Function}
 */

function plugin(options) {
    options = options || {};

    // options is optional
    glob("**/*.js", options, function (er, files) {
        // files is an array of filenames.
        // If the `nonull` option is set, and nothing
        // was found, then files is ["**/*.js"]
        // er is an error object or null.
    });

    //...

    return function (files, metalsmith, done) {
        Object.keys(files).forEach(function (file) {
            debug('checking file: %s', file);
            var data = files[file],
            str;

            debug('processing file as html: %s', file);
            //console.log("data.contents.toString() is ... ", data.contents.toString());

            //
            //
            //if (str) {
            //    data.contents = new Buffer(str);
            //}
        });
        done();
    };
}

/**
 * Check if a `file` is the specified type.
 *
 * @param {String} file
 * @return {Boolean}
 */
//
//function isMarkdown(file) {
//    return /\.md|\.markdown/.test(extname(file));
//}
//function isJs(file) {
//    return /\.js/.test(extname(file));
//}
//function isHtml(file) {
//    return /\.html|\.htm/.test(extname(file));
//}
//function isCss(file) {
//    return /\.css/.test(extname(file));
//}
