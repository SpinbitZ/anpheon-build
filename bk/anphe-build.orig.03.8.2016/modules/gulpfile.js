process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});


var _self = this,
    key = 'anpheon',
    A = require('./' + key)(
        {ID: key, ROOT: './'}
    ),

//metalsmith = require('metalsmith'),
//moment = require('moment'),
    gulp = require('gulp'),
    sh = require('shelljs'),
    clean = require('gulp-clean'),
    zip = require('gulp-vinyl-zip'),
    chalk = require('chalk'),
    json_edit = require("gulp-json-editor"),
    colors = require('colors/safe'), // does not alter string prototype
    v = require('gulp-version-tag'),
    _ = require('lodash'),

    tasks = {
        iinfo: {id: 'info'},
        build: {id: 'build', fn: build},
        deploy: {id: 'deploy'},
        server: {id: 'server', fn: server},
        watch: {id: 'watch', fn: watch},
        setup: {id: 'setup'},
        default: {id: 'default', deps: ['server', 'watch']}
    };


for (var prop in tasks) {
    var v = tasks[prop].toString = function toString() {
        return prop;
    };
    console.log('prop is ... ', prop);
    console.log('v is ... ', v);
}

console.log('tasks.iinfo is ... '+ tasks.iinfo);

console.log('tasks is ... ', tasks);

//TODO: strip out above 'id' attributes and add toString functions in a loop

//TODO: add deploy task which pipes build to a deploy/{version}.zip file, and unzips it in another stream into the rsynced ftp dir.

//TODO: add applescript watcher to a deploy/version.txt file written on deploy task which triggers the deploy task automatically.  This way the deploy task can be triggerred manually via gdrive/codeanywhere or from the command line.

//TODO: add ftp data to anpheon.js

//console.log('root_process.env.NODE_ENV is ..... ', root_process.env.NODE_ENV);
//chalk.enabled = true;
//chalk.blue('logging some blue');
//
//console.log('This String Will Display RED'.red);


//gulp.src("./manifest.json")
//.pipe(json_edit(function(json) {
//json.version = "1.2.3";
//return json; // must return JSON object.
//}))
//.pipe(gulp.dest("./dest"));

function watch() {
    gulp.watch(A.PATHS.SRC + '/content/**/*', tasks.build.id);
    gulp.watch(A.PATHS.JS + '/**/*', tasks.build.id);
    gulp.watch(A.PATHS.SRC + '/*.md', tasks.build.id);
    gulp.watch(A.PATHS.TMP + '/**/*', tasks.build.id);
}

function server() {
    var browserSync = require('browser-sync');
    return browserSync.init(['build/js/*.js', 'build/main.css', 'build/index.html'], {
        server: {
            baseDir: A.PATHS.PUB
        }
    });
}

function build() {
    chalk.enabled = true;
    chalk.blue('logging some blue');

    console.log('This String Will Display RED'.red);
    require('./MetalSmith')(A);
}

/**
 * 1) zip up A.PATHS.PUB to A.PATHS.DEPLOY/build_{version}.zip
 * 2) update A.PATHS.DEPLOY/version.txt
 * 3) rsync piped unzipped
 */
function deploy(version) {
    var v = getVersion(version);

}

/**
 * retrieves current version from A.PATHS.DEPLOY/version.txt if version is undefined
 * else it vets the version specified.
 */
function getVersion(version) {

    return version;
}


gulp.task(tasks.default, tasks.default.deps);

gulp.task(tasks.server.id, tasks.server.fn);

gulp.task(tasks.watch.id, tasks.watch.fn);

gulp.task(tasks.build.id, tasks.build.fn);



gulp.task(tasks.build.id, function () {
    require('./MetalSmith')(A);
});

gulp.task(tasks.setup.id, function () {
    cleanModules();
    chmodPackageJSON('664');
    setupEnv();
});

gulp.task(tasks.info.id, function () {
    var ln = '==========',
        info = "tasks include: ";
    console.log(ln);
    _.each(tasks, function (task) {
        info += (task.deps ? (task.id + ': [' + task.deps + '], ') : (task.id + ', '));
    });
    console.log(info);
    console.log(ln);
});

function chmodPackageJSON(p) {
    sh.exec('sudo chmod ' + p + ' ' + A.ROOT + 'package.json')
}


//gulp.task('doc', function () {
//    chmodPackageJSON();
//});
//
//gulp.task('clean-scripts', function () {
//    return gulp.src('app/tmp/*.js', {read: false})
//        .pipe(clean());
//});
//
//gulp.task('scripts', ['clean-scripts'], function () {
//    return gulp.src('app/scripts/*.js')
//        .pipe(gulp.dest('app/tmp'));
//});


//var siteBuild = metalsmith(__dirname)
//    .metadata(A.metadata)
//    .source(A.PATHS.SRC)
//    .destination(A.PATHS.PUB)
//    .use(markdown())
//    .use(excerpts())
//    .use(collections({
//        posts: {
//            pattern: 'posts/**.html',
//            sortBy: 'publishDate',
//            reverse: true
//        },
//        pages: {
//            pattern: 'pages/'
//        }
//    }))
//    .use(branch('posts/**.html')
//        .use(permalinks({
//            pattern: 'posts/:title',
//            relative: false
//        }))
//)
//    .use(branch('!posts/**.html')
//        .use(branch('!index.md').use(permalinks({
//            relative: false
//        })))
//)
//    .use(wordcount({
//        metaKeyCount: "wordCount",
//        metaKeyReadingTime: "readingTime",
//        speed: 300,
//        seconds: false,
//        raw: false
//    }))
//    .use(templates({
//        engine: 'jade',
//        moment: moment
//    }))
//    .use(feed({collection: 'posts'}))
//    .use(sitemap({
//        output: 'sitemap.xml',
//        urlProperty: 'path',
//        hostname: 'http://anpheon.org',
//        defaults: {
//            priority: 0.5,
//            changefreq: 'daily'
//        }
//    }));
//
//if (root_process.env.NODE_ENV !== 'production') {
//    siteBuild = siteBuild
//        .use(serve({
//            port: 8080,
//            verbose: true
//        }))
//        .use(watch({
//            pattern: '**/*',
//            livereload: true
//        }))
//}
//
//siteBuild.build(function (err) {
//    if (err) {
//        console.log(err);
//    }
//    else {
//        sh.echo('Site build complete!');
//        sh.exec('open http://localhost:8080/');
//    }
//});