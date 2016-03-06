const opt = {
    title: "'A N P H E O N.org'",
    dir: __dirname,
    pub: '/__pub'
};

const metal = require('./metal')(opt);

metal.build();
metal.serve();

