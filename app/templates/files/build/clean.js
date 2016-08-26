'use strict';

var gulp = require('gulp'),
    del = require('del');

gulp.task('clean', function (callback) {
    del(['dist']).then(() => callback());
});