const opt = {
    title: "'A N P H E O N.org'",
    dir: __dirname,
    pub: '/__pub'
};


const server = require('./serve')(opt);
//
//server.build();
server.serve();

//function server() {
//    "use strict";
//
//
//
//    var app = koa();
//
//    app.use(server(__dirname + "__pub"));
//
//    app.listen('3000');
//
//    console.log('Server is listening at http://localhost:3000/');
//
//}
//
//server();