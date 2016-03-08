(function (){
        var

        koa = require('koa'),
        serve = require('koa-static');
        tags = function(opts){

            console.log("opts is ... ", opts);

            var dir = opts.dir || __dirname,
            pub = opts.pub || '__pub';
            //commonly set default options here

            // return the function to be given to the `.use` call.
            return function(files, metalsmith, done){
                console.log("metalsmith is ... ", metalsmith);

                // ...do something with `files` here...
                var app = koa();


                app.use(serve(__dirname + pub));

                app.listen('3000');

                console.log(opts.title + ':: Server is listening at http://localhost:3000/');

                done();
            };
        };


        module.exports = koa;
    }
)();







