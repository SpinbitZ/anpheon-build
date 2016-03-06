//#!/usr/bin/env node
/*jshint node:true*/

module.exports = function () {
    require('shelljs/global');
    var program = require('commander');
    //var MODULES = './modules/';
    var H = require('holos-site')
    ({
        host: this,
        id: 'anpheon',
        root_path: __dirname,
        js: "./js",
        env: {
            PROD: "P",
            TEST: "T",
            DEV: "D",
            LOC: "L"
        },
        paths:{
            src:"src"
        }
    });

    H.onInit.then(function (version) {
        loadProgram();
    });

    function loadProgram() {

        var cmds = {
            build: H.build,
            page: page
        };

        program

            .version(H.version.v)

        /** BUILD **/
            .arguments('<cmd> [env] [options...]')
            .option('<build>, [ D = dev, P = prod, L = local ]', 'builds the environment, D, P, or L')

        /** PAGE **/
            .option('<page>, [name]', 'builds a page called [name]')

        /** ACTION **/
            .action(function (cmd, env, options) {
                var fn = cmds[cmd];
                if (fn != undefined) {
                    fn(env, options);
                }
            });

        program.parse(process.argv);

// ROUTES

        function page(page, name) {
            console.log("page");
            console.log('page is ... ', page);
        }

    }

}();