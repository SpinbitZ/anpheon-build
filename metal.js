module.exports = function (opt) {

    var
    dir = opt.dir || __dirname,
    pub = opt.pub || '__pub',
    metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    layouts = require('metalsmith-layouts'),
    collections = require('metalsmith-collections'),
    permalinks = require('metalsmith-permalinks'),
    beautify = require('metalsmith-beautify'),
    feed = require('metalsmith-feed'),
    moment = require('moment'),
    metadata = require('metalsmith-metadata');

    return {
        build: build,
        serve: serve
    };

    function build() {
        "use strict";
        console.log(opt.title);
        console.log("... building ...");
        metalsmith(dir)
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
            .destination('.' + pub)
            .build(function (err) {
                if (err) {
                    throw err;
                }
                console.log('... building complete');
            });

    }

    function serve() {
        "use strict";
        var koa = require('koa'),
        serve = require('koa-static');


        var app = koa();

        app.use(serve(__dirname + pub));

        app.listen('3000');

        console.log('Server is listening at http://localhost:3000/');

    }


};





