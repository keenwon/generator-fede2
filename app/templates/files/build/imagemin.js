'use strict';

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');

gulp.task('imagemin', function () {
    return gulp.src('dist/images/jijin/index/sprite.png')
        .pipe(imagemin([
            imageminPngquant({ quality: '65-80', speed: 4 }),
            imageminJpegRecompress({ min: 60, max: 75 })
        ]))
        .pipe(gulp.dest('dist/images/jijin/index'));
});