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
sassdoc = require('gulp-sassdoc');


gulp.task('markup', function () {
    const
    metalsmith = require('gulp-metalsmith'),
    markdown = require('metalsmith-markdown'),
    layouts = require('metalsmith-layouts'),
    collections = require('metalsmith-collections'),
    permalinks = require('metalsmith-permalinks'),
    beautify = require('metalsmith-beautify'),
    feed = require('metalsmith-feed'),
    moment = require('moment'),
    metadata = require('metalsmith-metadata');
    console.log('... building markup ...');

    return gulp.src(__.build_src+'/**')
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

var http = require('http');
var ecstatic = require('ecstatic');

gulp.task('serve', function(){
    http.createServer(
        ecstatic({ root: __dirname + __.pub })
    ).listen(8080);

    console.log('Listening on :8080');
    gulp.watch('**/*.js', function(){
        console.log("watching...");
        //gulp.run('your awesome task');
    });
});





gulp.task('sassdoc', function () {
    return gulp
        .src(__.sass_src)
        .pipe(sassdoc({dest: __.sassdoc_dest}))
        .resume();
});


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


gulp.task('default', ['sass', 'watch' /*, possible other tasks... */]);


gulp.task('prod', ['sassdoc'], function () {
    return gulp
        .src(__.sass_src)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(__.css_dest));
});
