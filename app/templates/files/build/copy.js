'use strict';

var gulp = require('gulp'),
    copy = require('gulp-copy');

gulp.task('copy', function () {
    return gulp.src('dev/images/**')
        .pipe(copy('dist', { prefix: 1 }));
});