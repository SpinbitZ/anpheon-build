module.exports = {
    sass: require('gulp-sass'),
    sourcemaps: require('gulp-sourcemaps'),
    autoprefixer: require('gulp-autoprefixer'),
    sassdoc: require('gulp-sassdoc'),
    metalsmith: require('gulp-metalsmith'),
    del: require('del'),
    filter: require('gulp-filter'),
    exec: require('child_process').exec,

//// metalsmith
    markdown: require('metalsmith-markdown'),
    layouts: require('metalsmith-layouts'),
    collections: require('metalsmith-collections'),
    permalinks: require('metalsmith-permalinks'),
    beautify: require('metalsmith-beautify'),
    feed: require('metalsmith-feed'),
    moment: require('moment'),
    metadata: require('metalsmith-metadata'),
    gulpIgnore: require('gulp-ignore'),
    lens: require('../modules/lensmith'),
    date: require('metalsmith-build-date')
};