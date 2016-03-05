"use strict";
// based on generator-gulp-webapp 0.1.0

// manually require modules that won"t get picked up by gulp-load-plugins
var gulp = require("gulp");

// load plugins
//var $ = require("gulp-load-plugins")();

// local server port
var SERVE_PORT = 9000;

// tell me what the error is!
// -> prevent .pipe from dying on error w/ gulp-plumber
// -> and give more useful error messages
var showError = function(err) {
    $.util.beep();
    console.log(err);
};

// useful file paths
var path = {
    src       : "src",
    build     : "build",
    deploy    : "deploy",
    bower     : "bower_components",
    templates : "templates",
    assets    : "assets",
    css       : "assets/styles",
    js        : "assets/scripts",
    img       : "assets/images"
};

// process SASS
gulp.task("styles", function() {
    return gulp.src(path.src + "/" + path.css + "/main.scss")
        .pipe($.plumber({
            errorHandler: showError
        }))
        .pipe($.rubySass({
            style: "expanded",
            precision: 10,
            loadPath: path.src + "/" + path.bower, // add bower load paths for imports
            bundleExec: true
        }))
        .pipe($.autoprefixer("last 1 version"))
        .pipe(gulp.dest(path.build + "/" + path.css))
        .pipe($.connect.reload());
});

// debug JS
gulp.task("scripts", function() {
    return gulp.src(path.build + "/" + path.js + "/**/*.js")
        .pipe($.jshint())
        .pipe($.jshint.reporter("jshint-stylish"))
        .pipe($.jshint.reporter("fail"));
});

// move bower packages to build folder
gulp.task("bower-dev", function() {
    return gulp.src(path.src + "/" + path.bower + "/**/*")
        .pipe(gulp.dest(path.build + "/" + path.bower))
});

// run metalsmith (static site generator)
gulp.task("metalsmith", function() {
    var gulpsmith     = require("gulpsmith"),
    front_matter  = require("gulp-front-matter"),
    assign        = require("lodash.assign"),
    handlebars    = require("handlebars"),
    markdown      = require("metalsmith-markdown"),
    templates     = require("metalsmith-templates"),
    ignore        = require("metalsmith-ignore"),
    permalinks    = require("metalsmith-permalinks"),
    collections   = require("metalsmith-collections");

    var fmFilter = $.filter("**/*.{html,md,htb}"); // filter out files with front matter

    return gulp.src("./src/**/*")
        .pipe($.plumber({
            errorHandler: showError
        }))
        .pipe(fmFilter)
        // grab files with front matter and assign them as a property so metalsmith will find it
        .pipe(front_matter({
            property: "frontMatter"
        })).on("data", function(file) {
            assign(file, file.frontMatter);
            delete file.frontMatter;
        })
        // remove the filter (back to everything in /src) and let metalsmith do its thing
        .pipe(fmFilter.restore())
        .pipe(
        gulpsmith()
            .metadata({
                "title": [ SITE_TITLE ],
                "description": [ SITE_DESCRIPTION ]
            })
            .use(markdown())
            .use(templates({
                "engine": "handlebars",
                "directory": "./" + path.src + "/" + path.templates
            }))
            .use(ignore([
                path.templates + "/**/*",
                path.css + "/**/*",
                path.bower + "/**/*"
            ]))
            .use(permalinks(":collection/:title"))
            .use(collections({
                "chapters": "chapters/*.md"
            }))
    )
        .pipe(gulp.dest("./" + path.build))
        .pipe($.connect.reload());
});

// concatenate & optimize everything w/useref, update css & script links
gulp.task("optimize", ["styles", "scripts", "metalsmith"], function() {
    var jsFilter  = $.filter("**/*.js"),
    cssFilter = $.filter("**/*.css");

    return gulp.src([
        path.build + "/**/*.{html,md,hbt}",
        "!" + path.build + "/" + path.bower + "/**/*"
    ])
        .pipe($.plumber({
            errorHandler: showError
        }))
        .pipe($.useref.assets())
        .pipe($.if("*.js", $.uglify()))
        .pipe($.if("*.css", $.csso()))
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest(path.deploy))
        .pipe($.size());
});

// optimize images
gulp.task("images", function() {
    return gulp.src(path.build + "/" + path.img + "/**/*")
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(path.deploy + "/" + path.img))
        .pipe($.size());
});

// grab static assets (fonts, etc.) and move to build folder
// gulp.task("assets", function() {
//   return gulp.src([
//       path.src + "/" + path.assets + "/**/*",
//       "!" + path.src + "/" + path.assets + "/**/*.{scss}"
//     ], {dot: true})
//     .pipe(gulp.dest(path.build));
// });

// gulp.task("assets-deploy", function() {
//   return gulp.src([
//       path.src + "/" + path.assets + "/**/*"
//     ], {dot: true})
//     .pipe(gulp.dest(path.build));
// });

// clean out the deploy directory
gulp.task("clean", function() {
    return gulp.src([
        path.deploy + "/*",
        "!" + path.deploy + "/{.git,.gitignore,CNAME,README.md,LICENSE}"
    ], { read: false })
        .pipe($.clean());
});

// livereload server
gulp.task("connect", function() {
    $.connect.server({
        root: path.build,
        port: SERVE_PORT,
        livereload: true
    });
});

// -------- Main Tasks --------------------------------------------------------------

gulp.task("build", ["metalsmith", "styles", "bower-dev"]);

gulp.task("deploy", ["clean"], function() {
    gulp.start(["optimize", "images"]);
});

gulp.task("watch", ["connect"], function() {
    gulp.watch("./" + path.src + "/**/*.{html,htb,md,js}", ["metalsmith"],["bower-dev"]);
    gulp.watch("./" + path.src + "/" + path.css + "/**/*.{scss,css}", ["styles"]);
    // gulp.watch([
    //   "./" + path.src + "/" + path.assets + "/**/*",
    //   "!./" + path.src + "/" + path.assets + "/**/*.{scss}"
    //   ], ["assets"]);

    // add sass, js and livereload stuff here
});

// inject bower components
gulp.task("wiredep", function() {
    var wiredep = require("wiredep").stream;

    gulp.src(path.src + "/" + path.css + "/*.scss")
        .pipe(wiredep({
            directory: path.src + "/" + path.bower
        }))
        .pipe(gulp.dest(path.src + "/" + path.css));

    gulp.src(path.src + "/*.html")
        .pipe(wiredep({
            directory: path.src + "/" + path.bower
        }))
        .pipe(gulp.dest(path.src));
});

gulp.task("default", ["build", "watch"]);

