module.exports = function (opt) {

    var
    dir = opt.dir || __dirname,
    pub = opt.pub || '.__pub',
    port = opt.port || '3000',
    koa = require('koa'),
    serve = require('koa-static');

    return {
        serve: runServer
    };


    function runServer() {
        "use strict";
        console.log("path.join(opt.dir + pub) is ... ", path.join(opt.dir + pub));

        var app = koa();

        app.use(serve(path.join(opt.dir + pub)));

        app.listen(opt.port);

        console.log('... now serving__ '+opt.title + ' at http://localhost:3000/');

    }


};





