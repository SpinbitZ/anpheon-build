var metalsmith = require('metalsmith'),
    templates = require('metalsmith-templates'),
    include = require('metalsmith-include'),
    markdown = require('metalsmith-markdown'),
    sass = require('metalsmith-sass'),
    //excerpts = require('metalsmith-excerpts'),
    collections = require('metalsmith-collections'),
    branch = require('metalsmith-branch'),
    permalinks = require('metalsmith-permalinks'),
    feed = require('metalsmith-feed'),
    //wordcount = require('metalsmith-word-count'),
    sitemap = require('metalsmith-sitemap'),
    moment = require('moment'),
    serve = require('metalsmith-serve'),
    watch = require('metalsmith-watch'),
    sh = require('shelljs');

module.exports = function MetalSmith(A) {

    console.log('MetalSmith building ' +
        A.meta.site.title_alt+ ' ',
        'at:  ', A.ROOT);
    return metalsmith(__dirname)
        .metadata(A.meta)
        .source(A.PATHS.SRC)
        .destination(A.PATHS.PUB)
        //.use(markdown())
        //.use(excerpts())
        // __ COLLECTIONS __
        .use(collections({
            posts: {
                pattern: 'content/posts/**.html',
                sortBy: 'publishDate',
                reverse: true
            },
            pages: {
                pattern: 'pages/'
            }
        }))
        //.use(branch('posts/**.html')
        //    .use(permalinks({
        //        pattern: 'posts/:title',
        //        relative: false
        //    }))
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
        //.use(feed({collection: 'posts'}))
        //.use(sitemap({
        //    output: 'sitemap.xml',
        //    urlProperty: 'path',
        //    hostname: 'http://anpheon.org',
        //    defaults: {
        //        priority: 0.5,
        //        changefreq: 'daily'
        //    }
        //}));
        .build(function (err, files) {
            if (err) {
                console.log(err);
            }
        });
};


//var _self = {
//        ROOT: options.ROOT
//    },
//    A = require('./anpheon')({root_path: './'}),
//    metalsmith = require('metalsmith'),
//    markdown = require('metalsmith-markdown'),
//    templates = require('metalsmith-templates'),
//    serve = require('metalsmith-serve'),
//    watch = require('metalsmith-watch'),
//    excerpts = require('metalsmith-excerpts'),
//    collections = require('metalsmith-collections'),
//    branch = require('metalsmith-branch'),
//    permalinks = require('metalsmith-permalinks'),
//    feed = require('metalsmith-feed'),
//    wordcount = require('metalsmith-word-count'),
//    sitemap = require('metalsmith-sitemap'),
//    moment = require('moment'),
//    sh = require('shelljs');
//
//
//console.log('root_process.env.NODE_ENV is ... ', root_process.env.NODE_ENV);

//    var siteBuild = metalsmith(__dirname)
//        .metadata(A.meta)
//        .source(A.PATHS.SRC)
//        .destination(A.PATHS.PUB)
//        //.use(markdown())
//        //.use(excerpts())
//        // __ COLLECTIONS __
//        .use(collections({
//            posts: {
//                pattern: 'content/posts/**.html',
//                sortBy: 'publishDate',
//                reverse: true
//            },
//            pages: {
//                pattern: 'pages/'
//            }
//        }))
//    //.use(branch('posts/**.html')
//    //    .use(permalinks({
//    //        pattern: 'posts/:title',
//    //        relative: false
//    //    }))
////)
////    .use(branch('!posts/**.html')
////        .use(branch('!index.md').use(permalinks({
////            relative: false
////        })))
////)
////    .use(wordcount({
////        metaKeyCount: "wordCount",
////        metaKeyReadingTime: "readingTime",
////        speed: 300,
////        seconds: false,
////        raw: false
////    }))
////    .use(templates({
////        engine: 'jade',
////        moment: moment
////    }))
//    //.use(feed({collection: 'posts'}))
//    //.use(sitemap({
//    //    output: 'sitemap.xml',
//    //    urlProperty: 'path',
//    //    hostname: 'http://anpheon.org',
//    //    defaults: {
//    //        priority: 0.5,
//    //        changefreq: 'daily'
//    //    }
//    //}));
//
//    if (root_process.env.NODE_ENV !== 'production') {
//        siteBuild = siteBuild
//            .use(serve({
//                port: 8080,
//                verbose: true
//            }))
//            .use(watch({
//                pattern: '**/*',
//                livereload: true
//            }))
//    }
//
//    siteBuild.build(function (err) {
//        if (err) {
//            console.log(err);
//        }
//        else {
//            sh.echo('Site build complete!');
//            sh.exec('open http://localhost:8080/');
//        }
//    });


//    return Metalsmith;
//};



