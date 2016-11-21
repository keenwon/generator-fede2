'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const async = require('async');
const colors = require('colors');
const Spritesmith = require('spritesmith');

// 获取需要合并sprite的css文件和icons
function getCssWithIcon() {
    var cssFilePaths = glob.sync('dist/css/**/*.css');
    var results = [];

    cssFilePaths.forEach(file => {
        var content = fs.readFileSync(path.join(process.cwd(), file)).toString(),
            reg = new RegExp('background\\-image:\\s?url\\(([^)]+?\\/icon\\/[^)]+?)\\)', 'g'),
            lastIndex = 0,
            icons = [];

        do {
            var res = reg.exec(content);
            if (res !== null) {
                icons.push(res[1]);
                lastIndex = reg.lastIndex;
            } else {
                lastIndex = 0;
            }
        } while (lastIndex !== 0);

        if (icons.length) {
            results.push({
                file,
                icons
            });
        }
    });

    return results;
}

var cssWithIcon = getCssWithIcon();

async.waterfall([
    // 生成Sprite
    function (cb) {
        async.map(cssWithIcon, function (item, done) {
            var spritesmith = new Spritesmith();
            var icons = item.icons.map(icon => {
                return path.resolve(path.parse(item.file).dir, icon)
            });

            spritesmith.createImages(icons, function (err, images) {
                if(err) {
                    console.error(err);
                    return;
                }

                if (!images) {
                    return;
                }

                var imagesStream = spritesmith.processImages(images);
                var spriteOutPutPath = icons[0].replace(/\/icon\/[^/]+$/, '/sprite.png');
                var spritePath = item.icons[0].replace(/\/icon\/[^/]+$/, '/sprite.png');
                var writer = fs.createWriteStream(spriteOutPutPath);

                // 输出sprite
                imagesStream.image.pipe(writer);

                item.spritePath = spritePath;
                item.coordinates = imagesStream.coordinates;

                writer.on('error', function (error) {
                    done(error);
                });

                writer.on('finish', function () {
                    console.info('✔ sprite'.bold.green + `: ${path.resolve(spritePath)}`);
                    done(null, item);
                });
            });
        }, function (error, result) {
            if (error) {
                throw error;
            }
            cb(null, result);
        });
    },

    // 修改css文件
    function (data, cb) {
        data.forEach(item => {
            var absFilePath = path.resolve(item.file),
                cssContent = fs.readFileSync(absFilePath).toString(),
                reg = /background\-image:\s?url\(([^)]+?\/icon\/([^)]+?))\);?/g;

            cssContent = cssContent.replace(reg, function () {
                var iconPath = arguments[1],
                    iconName = arguments[2],
                    x, y;

                for (var key in item.coordinates) {
                    if (!item.coordinates.hasOwnProperty(key)) {
                        return;
                    }
                    if (key.includes(`icon/${iconName}`)) {
                        x = item.coordinates[key].x;
                        y = item.coordinates[key].y;
                        break;
                    }
                }

                return `background-image:url(${item.spritePath});background-position:-${x}px -${y}px;`;
            });

            fs.writeFileSync(absFilePath, cssContent);
        });
        cb();
    }
]);