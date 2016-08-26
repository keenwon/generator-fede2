'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    webpackConfig = require('../webpack.config.js');

gulp.task('js', function (callback) {
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
            throw new gutil.PluginError("webpack", err);
        }
        gutil.log("[webpack]", stats.toString());
        callback();
    });
});