var

ANPHEON = 'A N P H E O N.org',

pub = '/__pub',
koa = require('koa'),
serve = require('koa-static'),
metalsmith = require('metalsmith'),
markdown = require('metalsmith-markdown'),
layouts = require('metalsmith-layouts'),
collections = require('metalsmith-collections'),
permalinks = require('metalsmith-permalinks'),
beautify = require('metalsmith-beautify'),
feed = require('metalsmith-feed'),
moment = require('moment'),
metadata = require('metalsmith-metadata');
//sass = require('metalsmith-sass');





metalsmith(__dirname)
    .use(metadata({
        site: 'meta.json',
        settings: 'settings.json'
    }))
    .use(markdown())
    .use(collections({
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
    }))
    .use(permalinks({
        pattern: ':collections:title'
    }))
    .use(feed({collection: 'articles'}))
    .use(layouts({
        engine: 'jade',
        moment
    }))
    .use(beautify())
    //.use(sass({
    //    outputStyle: "expanded"
    //}))
    .destination('.' + pub)
    .build(function (err) {
        if (err) {
            throw err;
        }
        console.log(ANPHEON + ' ... has been built');
    });

app = koa();

app.use(serve(__dirname + pub));

app.listen('3000');

console.log('Server is listening at http://localhost:3000/');
