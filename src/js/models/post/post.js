"use strict";
var log;
module.exports = function (options, imports, register) {
    var self = imports.base;

    log = self.logger.get(__filename);

    register(null, {
        "post": self
    });
};

