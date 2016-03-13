var opt = {
    title: "'A N P H E O N.org'",
    dir: __dirname,
    pub: './__pub',
    port: '3000'
};

var

koa = require('koa'),
serve = require('koa-static');
const exec = require("child_process").exec;
exec("echo exec....");

//var server = require('./koa_serve_module')(opt);

var app = koa();

var path = __dirname + '/__pub';

var url = 'http://localhost:' + opt.port + '/';

console.log("koa server:starting to serve pages from ... " + path);

app.use(serve(path));

app.listen(opt.port);

console.log(opt.title + '... is being served at '+url);

exec('open '+url);
