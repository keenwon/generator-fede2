'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const precss = require('precss');
const postcssshort = require('postcss-short');
const postcsseach = require('postcss-each');
const cssnext = require('postcss-cssnext');
const minifyCss = require('gulp-minify-css');

gulp.task('css', function () {
    var processors = [
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
    ];

    return gulp.src([
        'dev/css/**/*.pcss',
        '!dev/css/libs/*.pcss'
    ]).pipe(postcss(processors))
        .pipe(rename({ extname: '.css' }))
        .pipe(minifyCss({
            keepSpecialComments: 0,
            compatibility: 'ie7'
        }))
        .pipe(gulp.dest('dist/css'));
});