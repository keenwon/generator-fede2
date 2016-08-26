var gulp = require('gulp'),
    eslint = require('gulp-eslint');

gulp.task('eslint', function () {
    return gulp.src([
        'dev/js/**/*.js',
        '!dev/js/libs/**'
    ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});