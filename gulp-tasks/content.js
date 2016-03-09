module.exports = function (opt) {
    var content = {
        root: opt.root
    };
    return content;
};


var

opt = {
    title: "'A N P H E O N.org'"
},
__ = {
    build: './',
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
//lens = require('./modules/lensmith'),
date = require('metalsmith-build-date');

console.log("here in content");




gulp.task('content', function () {
    console.log('... building NEW content ...');

    // TODO : could just source content here
    return gulp.src(['../src/**', '!../src/io/**'])
        //.pipe(f)
        .pipe(metalsmith({
            // set Metalsmith's root directory, for example for locating templates, defaults to CWD
            root: './',
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