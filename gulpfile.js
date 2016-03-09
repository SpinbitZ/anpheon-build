var

opt = {
    title: "'A N P H E O N.org'"
},
__ = {
    build: __dirname,
    build_src: 'src',
    pub: './__pub',
    sass_src: './theme/smas/**/*.scss',
    css_dest: './__pub/theme',
    js_src: '',
    js_dest: '/io',
    sassdoc_dest: './theme/sassdoc'
},
sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
},
autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
},

gulp = require('gulp'),
sass = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps'),
autoprefixer = require('gulp-autoprefixer'),
sassdoc = require('gulp-sassdoc'),
metalsmith = require('gulp-metalsmith'),
del = require('del'),
filter = require('gulp-filter'),
exec = require('child_process').exec,

//// metalsmith
markdown = require('metalsmith-markdown'),
layouts = require('metalsmith-layouts'),
collections = require('metalsmith-collections'),
permalinks = require('metalsmith-permalinks'),
beautify = require('metalsmith-beautify'),
feed = require('metalsmith-feed'),
moment = require('moment'),
metadata = require('metalsmith-metadata'),
gulpIgnore = require('gulp-ignore'),
lens = require('./modules/lensmith'),
date = require('metalsmith-build-date');



var requireDir = require('require-dir');
requireDir('./gulp-tasks');




//gulp.task('filter', () => {
//    // create filter instance inside task function
//    const f = filter(['*', '!src/vendor']);
//
//    return gulp.src('src/*.js')
//        // filter a subset of the files
//        .pipe(f)
//        // run them through a plugin
//        .pipe(uglify())
//        .pipe(gulp.dest('dist'));
//});


////////////////////////////////////////////////////////////////////////////////

// Watch Tasks for livereload

////////////////////////////////////////////////////////////////////////////////


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

gulp.task('watch', function () {
    gulp.watch(['./src/**/*.html'], ['html']);
    gulp.watch(['./src/**/*.js'], ['js']);
    gulp.watch(['./src/**/*.scss'], ['css']);
});
//
//gulp.task('html', ['templates'], function () {
//    gulp.src('./dist/html/*.html')
//        .pipe(connect.reload());
//});
//
//gulp.task('js', function () {
//    gulp.src('./src/**/*.js')
//        .pipe(connect.reload());
//});
//
gulp.task('css', ['sass'], function () {
    gulp.src('./dist/css')
        .pipe(connect.reload());
});

////////////////////////////////////////////////////////////////////////////////

gulp.task('f', function () {
    const f = filter(['*', '!src/content']);
    return gulp
        .src(__.sass_src)
        .pipe(f)
        .pipe(metalsmith({
            // set Metalsmith's root directory, for example for locating templates, defaults to CWD
            root: __dirname,
            // files to exclude from the build
            ignore: [
                __.build_src + '/*.tmp',
                'io/*'
            ],
            // read frontmatter, defaults to true
            frontmatter: true,
            // Metalsmith plugins to use
            use: [
                metadata({
                    site: 'meta.json',
                    settings: 'settings.json'
                }),
                //gulpIgnore.include(condition),
                markdown(),
                collections({
                    articles: {
                        pattern: './content/articles/*.md',
                        sortBy: 'date',
                        reverse: 'True'
                    }
                    , news: {
                        pattern: './content/news/*.md',
                        sortBy: 'date',
                        reverse: 'True'
                    }
                    , books: {
                        pattern: './content/books/*.md',
                        sortBy: 'date',
                        reverse: 'True'
                    }
                }),
                permalinks({
                    pattern: ':collections:title'
                }),
                feed({collection: 'articles'}),
                layouts({
                    engine: 'jade',
                    moment: moment
                }),
                beautify()
            ],
            // Initial Metalsmith metadata:
            metadata: {
                site_title: 'Sample static site'
            }
        }))
        .resume();
});


gulp.task('content', function () {
    console.log('... building content ...');

    // TODO : could just source content here
    return gulp.src(['./src/**', '!./src/io/**'])
        //.pipe(f)
        .pipe(metalsmith({
            // set Metalsmith's root directory, for example for locating templates, defaults to CWD
            root: __dirname,
            // files to exclude from the build
            ignore: [],
            // read frontmatter, defaults to true
            frontmatter: true,
            // Metalsmith plugins to use
            use: [
                //lens(),
                metadata({
                    site: 'meta.json',
                    settings: 'settings.json'
                }),
                date({key: 'dateBuilt'}),
                //gulpIgnore.include(condition),
                markdown(),
                collections({
                    articles: {
                        pattern: './content/articles/*.md',
                        sortBy: 'date',
                        reverse: 'True'
                    }
                    , news: {
                        pattern: './content/news/*.md',
                        sortBy: 'date',
                        reverse: 'True'
                    }
                    , books: {
                        pattern: './content/books/*.md',
                        sortBy: 'date',
                        reverse: 'True'
                    }
                }),
                permalinks({
                    pattern: ':collections:title'
                }),
                feed({collection: 'articles'}),
                layouts({
                    engine: 'jade',
                    moment: moment
                }),
                beautify()
            ],
            // Initial Metalsmith metadata:
            metadata: {
                site_title: 'Sample static site'
            }
        }))
        .pipe(gulp.dest(__.pub));
});

gulp.task('sass', function () {
    return gulp
        .src(__.sass_src)
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(__.css_dest))
        .resume();
});


gulp.task('clean:js', function () {
    return del([
        __.pub + __.js_dest + '/io/**'
    ]);
});

gulp.task('js', function () {
    exec('npm run js', function (err, stdout, stderr) {
        if (err) {
            throw err;
        }
        else {
            console.log('js complete');
        }
    });
});

//var serve = require('gulp-serve');
//
//gulp.task('serve', serve('public'));
//gulp.task('serve-build', serve(['public', 'build']));
//gulp.task('serve-prod', serve({
//    root: ['public', 'build'],
//    port: 80,
//    middleware: function(req, res) {
//        // custom optional middleware
//    }
//}));

gulp.task('gulp monitor', function () {
    //var a = gulp.src('./_site/**/*.html')
    //    .pipe(frep(patterns))
    //    .pipe(spellcheck(({replacement: '<<<%s (suggestions: %s)>>>'})))
    //    .pipe(frep(nonSuggestions))
    //    ;
    //
    //a.on('data', function(chunk) {
    //    var contents = chunk.contents.toString().trim();
    //    var bufLength = process.stdout.columns;
    //    var hr = '\n\n' + Array(bufLength).join("_") + '\n\n'
    //    if (contents.length > 1) {
    //        process.stdout.write(chunk.path + '\n' + contents + '\n');
    //        process.stdout.write(chunk.path + hr);
    //    }
    //});


});


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

gulp.task('sassdoc', function () {
    return gulp
        .src(__.sass_src)
        .pipe(sassdoc({dest: __.sassdoc_dest}))
        .resume();
});


gulp.task('clean:build', function () {
    return del([
        __.pub + '/**/*'
    ]);
});


gulp.task('default', ['sass', 'watch' /*, possible other tasks... */]);

gulp.task('build', ['content', 'sass', 'js']);

gulp.task('dev', ['build', 'sass:watch', 'serve']);


gulp.task('prod', ['sassdoc'], function () {
    return gulp
        .src(__.sass_src)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(__.css_dest));
});
