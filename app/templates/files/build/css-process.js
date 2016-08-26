'use strict';

const gulp = require('gulp');
const replace = require('gulp-replace');
const argv = require('optimist').argv;

const getCdnImgUrl = function (env) {
    return env === 'testing'
        ? 'http://test-toa-web-cdn.pingan.com.cn/app_images/fmall'
        : 'http://img0.yztcdn.com/app_images/fmall'
};

gulp.task('css-process', function () {
    if (!argv.e) {
        throw new gutil.PluginError('css-process', '请输入编译环境');
    }

    var timestamp = Date.now();

    return gulp.src('dist/css/**/*.css')
        .pipe(replace(/(\.\.\/)+images/g, getCdnImgUrl(argv.e)))
        .pipe(replace(/url\(([^)]+)\)/g, 'url($1?v=' + timestamp + ')'))
        .pipe(gulp.dest('dist/css'));
});