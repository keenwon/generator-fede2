'use strict';

const gulp = require('gulp');
const pugLinter = require('gulp-pug-linter');

gulp.task('puglint', function() {
    return gulp
        .src('dev/pugs/**/*.pug')
        .pipe(pugLinter())
        .pipe(pugLinter.reporter());
});