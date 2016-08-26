'use strict';

const gulp = require('gulp');
const del = require('del');

gulp.task('cleanIcon', function () {
    del.sync([
        'dist/images/**/icon/'
    ]);
});