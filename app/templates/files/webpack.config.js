'use strict';

var path = require('path');

function getPath(jsPath) {
    return path.join(__dirname, jsPath);
}

var configs = [

    // channel1
    {
        entry: {
            'channel1/index': getPath('dev/js/app/channel1/main')
        },
        output: {
            path: getPath('dist/js/'),
            filename: '[name].js'
        }
    },

    // channel2
    {
        entry: {
            'channel2/index': getPath('dev/js/app/channel2/main')
        },
        output: {
            path: getPath('dist/js/'),
            filename: '[name].js'
        }
    }

];

function getConfigs() {
    // 通用的配置
    configs.forEach(function (currentValue, i, array) {
        array[i].resolve = {
            alias: {
                modules: getPath('dev/js/modules'),
                utils: getPath('dev/js/utils')
            }
        }
    });

    return configs;
}

module.exports = getConfigs();