'use strict';

const gulp = require('gulp');
const gulpStylelint = require('gulp-stylelint');

gulp.task('stylelint', function () {
    return gulp
        .src(['dev/css/**/*.pcss', '!dev/css/libs/normalize.pcss'])
        .pipe(gulpStylelint({
            reporters: [
                {
                    formatter: 'string',
                    console: true
                }
            ]
        }));
});