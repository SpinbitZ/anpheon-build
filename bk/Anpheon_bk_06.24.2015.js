#!/usr/bin/env node


//var $p = require('procstreams');
//$p('cat lines.txt').pipe('wc -l')
//    .data(function(err, stdout, stderr) {
//        // handle error
//
//        console.log(stdout); // prints number of lines in the file lines.txt
//    });
//
//$p('mkdir foo')
//    .and('cp file.txt foo/')
//    .and('rm file.txt')
//    .on('exit', function() {
//        console.log('done');
//    });

module.exports = function () {

    require('shelljs/global');
    //var version = require('./v.js');
    //console.log('version is ... ', version);
    //console.log('version is ... ', version.n)({root_process: root_process});

    //var path = require('./modules/holos/utils/path')({root_process: root_process});

    var M = './modules/';
    var H = require(M + 'holos/Holos')
    ({
        id: 'anpheon',
        root_process: process,
        //root_path:"./",
        //dir: "./",
        js: "./js",
        //require:['cats','dogs']
        env:{
            ENV: "E",
            PROD: "P",
            STAGE: "S",
            DEV: "D",
            LOC: "L"
        },
        paths : {
            root_path: './',
            dir: '',
            js: './js/',
            file: '',
            shellRoot: '',
            meta:'anpheon-meta.json'
        }
    });


    echo("_____________________ "+process);

    //console.log('H is ... ', H);
    var program = require('commander');

    //var A = {
    //    ,
    //    root_path
    //:
    //H.getRootPath()
//};



    H.meta.logTitle();

    program
        .version('0.0.1');

    program
        .command('setup [env]')
        .description('run setup commands for all envs')
        .option("-s, --setup_mode [mode]", "Which setup mode to use")
        .option("-d, --deploy mode", "deploy mode")
        .action(function (env, options) {
            var mode = options.setup_mode || "normal";
            env = env || 'all';
            console.log('setup for %s env(s) with %s mode', env, mode);
        });

    program
        .command('build [env]')
        .description('run setup commands for all envs')
        .action(function (env, options) {
            switch (env) {
                case H.env.P:
                    break;
                case H.env.D:
                    break;
                case H.env.L:
                    break;
                default:
            }

            env = env || 'all';
            console.log('build for ' + env + ' env');
        });


    program
        .command('*')
        .action(function (env) {
            console.log('attempting to run "%s"', env);
        });

    program.parse(process.argv);


//H.routes = {
//    clean: clean,
//    build: build,
//    page: page,
//    init: init
//};

//
//
//H.paths = {
//    id: H.id,
//    root_path: H.root_path,
//    dir: H.root_path,
//    js: H.root_path,
//    file: address.path_utils.getFileName(),
//    shellRoot: address.shellPath()
//};
//
//H.meta = require(H.root_path + 'modules/holos/holos-meta')(H.paths);

// ROUTES

    function init(arg1, arg2, arg3) {
        logRoute('init', arg1);
        setupEnv();
    }

    function build(param) {
        logRoute('build', param);
        var _ = require('lodash');
        console.log("building from");


    }

    function deploy(param) {
        logRoute('deploy', param);
        var _ = require('lodash');
    }

    function clean(params) {
        logRoute("cleanModules");
        goHome();
        echo(exec('pwd').output);
        //exec('sudo rm -rf node_modules');
        //sh.exec('sudo npm install');
    }

    function page(id) {
        logRoute('building a page with id = ', H.id);
        goHome();
        exec('pwd');

    }


// HELPER FUNCTIONS

    function setupEnv() {
        //TODO: not working
        //exec("alias a='gulp'");
        //exec("alias a='gulp'");
        //exec("alias watch='gulp watch'");
        //exec("alias build='gulp build'");
        //exec("alias deploy='gulp deploy'");
        echo("env setup complete");
    }

    function goHome(path) {
        exec('cd ' + H.paths.shellRoot);
    }

    function chmodPackageJSON(p) {
        exec('sudo chmod ' + p + ' ' + H.paths.shellRoot + 'package.json');
    }

    function logRoute(route, params) {
        //H.meta.logTitle();
        echo('___ ' + route + ' ___ ');
    }

    function onRouteComplete(route) {
        logRoute(route + ' complete');
    }

//address.tick(0, onRouteComplete);

//console.log('H.meta is ... ', H.meta);

//return A;
}
();