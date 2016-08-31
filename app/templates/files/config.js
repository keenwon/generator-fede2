'use strict';

const configPro = require('./configs/production');
const configTest = require('./configs/testing');
const configDev = require('./configs/development');

var config, env = process.env.NODE_ENV;

/* istanbul ignore next */
if (env === 'production') {
    config = configPro;
} else if (env === 'testing') {
    config = configTest;
} else {
    config = configDev;
}

module.exports = config;