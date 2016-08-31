'use strict';

const async = require('async');
const klaw = require('klaw');
const colors = require('colors');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');

async.waterfall([
    // 获取要压缩的图片
    function (cb) {
        var items = [],
            imgSrc = 'dist/images',
            bigSize = 90 * 1024,
            smallSize = 70 * 1024;

        klaw(imgSrc)
            .on('data', function (item) {
                var size = item.stats.size,
                    path = item.path;

                if (size > bigSize || path.indexOf('/sprite.png') !== -1) {
                    items.push({
                        path,
                        pngConfig: { quality: '65-80', speed: 4 },
                        jpgConfig: { min: 60, max: 75 }
                    });
                } else if (smallSize <= size && size <= bigSize) {
                    items.push({
                        path,
                        pngConfig: { quality: '75-90', speed: 4 },
                        jpgConfig: { min: 70, max: 95 }
                    });
                }
            })
            .on('end', function () {
                cb(null, items);
            });
    },

    // 压缩
    function (items, cb) {
        async.map(items, function (item, done) {
            imagemin([item.path], item.path.replace(/\/[^\/]+$/, ''), {
                plugins: [
                    imageminPngquant({ quality: '65-80', speed: 4 }),
                    imageminJpegRecompress({ min: 60, max: 75 })
                ]
            }).then(() => {
                console.log('✔ imagemin'.bold.green + `: ${item.path}`);
                done();
            });
        }, () => cb());
    }
]);