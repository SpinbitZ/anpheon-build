//#!/usr/bin/env node
/*jshint node:true*/

module.exports = function () {
    require('shelljs/global');
    var program = require('commander');
    var MODULES = './modules/';
    var H = require(MODULES + 'holos')
    ({
        host: this,
        id: 'anpheon',
        root_path: __dirname + '/..',
        js: "./js",
        env: {
            PROD: "P",
            TEST: "T",
            DEV: "D",
            LOC: "L"
        },
        paths: {
            //root_path: './',
            //dir: '',
            //js: './js/',
            //file: '',
            //shellRoot: '',
            meta: 'anpheon-meta.json'
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
                //console.log("action");
                //console.log('cmd is ... ', cmd);
                //console.log('env is ... ', env);
                //console.log('options is ... ', options);
                var fn = cmds[cmd];
                //console.log('fn is ... ', fn);
                if (fn != undefined) {
                    //console.log('runnin func');
                    fn(env, options);
                }
            });

        program.parse(process.argv);


// ROUTES

        //function init(arg1, arg2, arg3) {
        //    logRoute('init', arg1);
        //    setupEnv();
        //}

        //function build(env, options) {
            //env = H.env[env];
            //var v = options[0];
            //if (v != undefined) {
            //    H.version.bump(v);
            //}
            //else {
            //    v = "";
            //}
            //console.log("building " + env.id +
            //    " version " + H.version.v +
            //    " at " + env.dir);
        //}

        function page(page, name) {
            console.log("page");
            console.log('page is ... ', page);
            //env = H.env[env];
            //H.version.bump();

        }

        //function deploy(param) {
        //    logRoute('deploy', param);
        //    var _ = require('lodash');
        //}
        //
        //function clean(params) {
        //    logRoute("cleanModules");
        //    goHome();
        //}

    }


// HELPER FUNCTIONS

    //function setupEnv() {
    //    //TODO: not working
    //    //exec("alias a='gulp'");
    //    //exec("alias watch='gulp watch'");
    //    //exec("alias build='gulp build'");
    //    //exec("alias deploy='gulp deploy'");
    //    echo("env setup complete");
    //}
    //
    //function goHome(path) {
    //    exec('cd ' + H.root_path);
    //}
    //
    //function chmodPackageJSON(p) {
    //    exec('sudo chmod ' + p + ' ' + H.root_path + 'package.json');
    //}
    //
    //function logRoute(route, params) {
    //    //H.meta.logTitle();
    //    echo('___ ' + route + ' ___ ');
    //    //console.log('params is ... ', params);
    //}
    //
    //function onRouteComplete(route) {
    //    logRoute(route + ' complete');
    //}


}();