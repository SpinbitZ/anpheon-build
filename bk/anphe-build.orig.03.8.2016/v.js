module.exports = function (opt) {
    var version = {
        n: "0.0.1",
        p: opt.production,
        s: opt.stage,
        d: opt.dev,
        l: opt.loc
    };
    return version;
};