'use strict';

const config = require('../config');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const CleanCSS = require('clean-css');

const imageUrl = config.cdn.image;

const options = {
    keepSpecialComments: 0,
    compatibility: 'ie7',
    rebase: false
};

glob('dist/css/**/*.css', function (error, files) {
    if (error) {
        throw error;
    }

    var minified,
        timestamp = Date.now(),
        absFilePath;

    files.forEach(file => {
        minified = new CleanCSS(options).minify([file]).styles;

        // 替换image cdn地址
        minified = minified.replace(/(\.\.\/)+images/g, imageUrl);

        // 图片添加版本号
        minified = minified.replace(/url\(([^)]+)\)/g, 'url($1?v=' + timestamp + ')');

        absFilePath = path.join(process.cwd(), file);
        fs.writeFileSync(absFilePath, minified);
    });
});