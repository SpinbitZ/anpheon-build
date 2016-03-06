module.exports = function (opt) {

    var
    dir = opt.dir || __dirname,
    pub = opt.pub || '__pub',
    koa = require('koa'),
    serve = require('koa-static');

    return {
        serve: runServer
    };


    function runServer() {
        "use strict";


        var app = koa();

        app.use(serve(__dirname + pub));

        app.listen('3000');

        console.log(opt.title + ':: Server is listening at http://localhost:3000/');

    }


};





