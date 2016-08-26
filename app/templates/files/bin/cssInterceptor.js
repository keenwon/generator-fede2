'use strict';

const path = require('path');
const fs = require('fs');
const postcss = require('postcss');
const precss = require('precss');
const postcssshort = require('postcss-short');
const postcsseach = require('postcss-each');
const cssnext = require('postcss-cssnext');

module.exports = intercept;

function intercept(staticDir) {
    return function *(next) {
        var pathname, pcssFilePath;
        pathname = this.request.path;

        if (!/\.css$/.test(pathname)) {
            return yield next;
        }

        pcssFilePath = path.join(staticDir, pathname.replace(/\.css/, '.pcss'));

        if (fs.existsSync(pcssFilePath)) {
            var result = yield cssRender(pcssFilePath);
            this.set('Content-Type', 'text/css');
            this.body = result.css;
            return yield next;
        } else {
            return yield next;
        }
    };
}

function cssRender(pcssFilePath) {
    var css = fs.readFileSync(pcssFilePath);

    return postcss([
        postcsseach,
        precss,
        cssnext({
            browsers: [
                'ie > 7',
                'Chrome > 0',
                'Firefox > 0',
                'iOS > 0',
                'Android > 0',
                'Edge > 0'
            ]
        }),
        postcssshort
    ]).process(css, { from: pcssFilePath })
}