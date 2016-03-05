#!/usr/bin/env node

module.exports = function () {

    require('shelljs/global');

    var address = require('./modules/holos/address')({process: process});
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


    var A = {
        id: 'anpheon',
        root_path: address.path_utils.getRootPath()
    };

    console.log('A.root_path is ... ', A.root_path);

    A.routes = {
        clean: clean,
        build: build,
        page: page,
        init: init
    };


    address.setRoutes(0, A.routes);

    A.paths = {
        id: A.id,
        root_path: A.root_path,
        dir: A.root_path,
        js: A.root_path,
        file: address.path_utils.getFileName(),
        shellRoot: address.shellPath()
    };

    A.meta = require(A.root_path + 'modules/holos/holos-meta')(A.paths);

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
        logRoute('building a page with id = ', A.id);
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
        exec('cd ' + A.paths.shellRoot);
    }

    function chmodPackageJSON(p) {
        exec('sudo chmod ' + p + ' ' + A.paths.shellRoot + 'package.json');
    }

    function logRoute(route, params) {
        A.meta.logTitle();
        echo('___ ' + route + ' ___ ');
    }

    function onRouteComplete(route) {
        logRoute(route + ' complete');
    }

    address.tick(0, onRouteComplete);

    //console.log('A.meta is ... ', A.meta);

    return A;
}();