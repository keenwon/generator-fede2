'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    requireDir = require('require-dir');

requireDir('./build', { recurse: true });

gulp.task('test', function() {
    runSequence(
        'eslint',
        'stylelint',
        'puglint'
    );
});

gulp.task('build', function() {
    runSequence(
        'clean',
        'copy',
        'css',
        [
            'sprites-channel1'
        ],
        'css-process',
        [
            'imagemin'
        ],
        'js',
        'cleanIcon'
    );
});