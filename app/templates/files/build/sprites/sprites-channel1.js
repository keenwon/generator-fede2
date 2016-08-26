'use strict';

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sprites = require('postcss-sprites').default;

gulp.task('sprites-channel1', [
    'sprites-channel1-index'
]);

gulp.task('sprites-channel1-index', function () {
    return gulp.src('dist/css/channel1/index.css')
        .pipe(postcss([
            sprites({
                stylesheetPath: './dist/css',
                spritePath: './dist/images/channel1/index',
                basePath: './dist/css',
                relativeTo: 'rule',
                filterBy: function (image) {
                    if (image.url.indexOf('/icon/') === -1) {
                        return Promise.reject();
                    }
                    return Promise.resolve();
                }
            })
        ]))
        .pipe(gulp.dest('dist/css/channel1'));
});