const

opt = {
    title: "'A N P H E O N.org'"
},
__ = {
    build: __dirname,
    build_src: 'src',
    pub: '__pub',
    sass_src: './theme/smas/**/*.scss',
    css_dest: './__pub/theme',
    js_src: '',
    js_dest: '',
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
filter = require('gulp-filter');


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


gulp.task('watch', function () {
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

//
//gulp.task('watch', function () {
//    gulp.watch(['./src/**/*.html'], ['html']);
//    gulp.watch(['./src/**/*.js'], ['js']);
//    gulp.watch(['./src/**/*.scss'], ['css']);
//});
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
//gulp.task('css', ['sass'], function () {
//    gulp.src('./dist/css')
//        .pipe(connect.reload());
//});

////////////////////////////////////////////////////////////////////////////////




gulp.task('markup', function () {
    const

    markdown = require('metalsmith-markdown'),
    layouts = require('metalsmith-layouts'),
    collections = require('metalsmith-collections'),
    permalinks = require('metalsmith-permalinks'),
    beautify = require('metalsmith-beautify'),
    feed = require('metalsmith-feed'),
    moment = require('moment'),
    metadata = require('metalsmith-metadata');
    console.log('... building markup ...');

    return gulp.src(__.build_src + '/**')
        .pipe(metalsmith({
            // set Metalsmith's root directory, for example for locating templates, defaults to CWD
            root: __dirname,
            // files to exclude from the build
            ignore: [__.build_src + '/*.tmp'],
            // read frontmatter, defaults to true
            frontmatter: true,
            // Metalsmith plugins to use
            use: [
                metadata({
                    site: 'meta.json',
                    settings: 'settings.json'
                }),
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


gulp.task('clean:build', function () {
    return del([
        __.build + __.pub + '/**/*'
    ]);
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


gulp.task('serve', function () {
    const
    lensmith = require('./lensmith');
    console.log("serve is ... ", lensmith);
    console.log('... serving markup ...');

    return gulp.src(__.build_src + '/**')
        .pipe(metalsmith({
            // set Metalsmith's root directory, for example for locating templates, defaults to CWD
            root: __dirname,
            frontmatter: true,
            // Metalsmith plugins to use
            use: [
                lensmith({
                    //site: 'meta.json',
                    //settings: 'settings.json'
                })
            ],
            // Initial Metalsmith metadata:
            metadata: {
                site_title: 'Sample static site'
            }
        }));
});


gulp.task('sassdoc', function () {
    return gulp
        .src(__.sass_src)
        .pipe(sassdoc({dest: __.sassdoc_dest}))
        .resume();
});




gulp.task('default', ['sass', 'watch' /*, possible other tasks... */]);

gulp.task('dev', ['markup', 'sass', 'watch' /*, possible other tasks... */]);


gulp.task('prod', ['sassdoc'], function () {
    return gulp
        .src(__.sass_src)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(__.css_dest));
});
