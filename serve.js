var opt = {
    title: "'A N P H E O N.org'",
    dir: __dirname,
    pub: './__pub',
    port: '3000'
};

var

koa = require('koa'),
serve = require('koa-static');

//var server = require('./koa_serve_module')(opt);

var app = koa();

var path = __dirname + '/__pub';

console.log("koa server:starting to serve pages from ... " + path);

app.use(serve(path));

app.listen(opt.port);

console.log(opt.title + '... is being served at http://localhost:' + opt.port + '/');