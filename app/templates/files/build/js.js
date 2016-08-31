'use strict';

const webpack = require('webpack');
var webpackConfig = require('../webpack.config.js');

if (!Object.prototype.toString.call(webpackConfig) === '[object Array]') {
    webpackConfig = [webpackConfig];
}

webpackConfig.forEach(function (currentValue, i, array) {
    array[i].bail = true;
    array[i].plugins = [
        new webpack.optimize.UglifyJsPlugin({
            comments: ''
        })
    ];
});

webpack(webpackConfig, function (err, stats) {
    if (err) {
        throw err;
    }

    console.log(stats.toString({
        colors: true
    }));
});