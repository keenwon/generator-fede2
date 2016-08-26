var generators = require('yeoman-generator');

module.exports = generators.Base.extend({

    name: function () {
        var done = this.async();

        this.prompt({
            type: 'input',
            name: 'projectName',
            message: 'name: ',
            default: this.appname
        }, function (answers) {
            this.projectName = answers.projectName;
            done();
        }.bind(this));
    },

    version: function () {
        var done = this.async();

        this.prompt({
            type: 'input',
            name: 'projectVersion',
            message: 'version: ',
            default: '1.0.0'
        }, function (answers) {
            this.projectVersion = answers.projectVersion;
            done();
        }.bind(this));
    },

    description: function () {
        var done = this.async();

        this.prompt({
            type: 'input',
            name: 'projectDescription',
            message: 'description: '
        }, function (answers) {
            this.projectDescription = answers.projectDescription;
            done();
        }.bind(this));
    },

    buildPackageFile: function () {
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            {
                name: this.projectName,
                version: this.projectVersion,
                description: this.projectDescription
            }
        );
    },

    copyFiles: function () {
        this.directory('files', './');
    },

    install: function () {
        this.npmInstall([
            'co-body',
            'css-loader',
            'del',
            'gulp',
            'gulp-copy',
            'gulp-eslint',
            'gulp-imagemin',
            'gulp-minify-css',
            'gulp-postcss',
            'gulp-pug-linter',
            'gulp-rename',
            'gulp-replace',
            'gulp-stylelint',
            'imagemin-jpeg-recompress',
            'imagemin-pngquant',
            'koa',
            'koa-pug',
            'koa-router',
            'koa-static',
            'koa-subdomain',
            'koa-webpack-dev-middleware',
            'nodemon',
            'optimist',
            'postcss',
            'postcss-cssnext',
            'postcss-each',
            'postcss-short',
            'postcss-sprites',
            'precss',
            'pug-loader',
            'require-dir',
            'run-sequence',
            'style-loader',
            'stylelint-config-standard',
            'webpack'
        ], {'save': true});
    }

});
