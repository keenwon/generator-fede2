var generators = require('yeoman-generator');

module.exports = generators.Base.extend({

    name: function () {
        return this.prompt([
            {
                type: 'input',
                name: 'projectName',
                message: 'name: ',
                default: this.appname
            }
        ]).then(function (answers) {
            this.projectName = answers.projectName;
        }.bind(this));
    },

    version: function () {
        return this.prompt([
            {
                type: 'input',
                name: 'projectVersion',
                message: 'version: ',
                default: '1.0.0'
            }
        ]).then(function (answers) {
            this.projectVersion = answers.projectVersion;
        }.bind(this));
    },

    description: function () {
        return this.prompt([
            {
                type: 'input',
                name: 'projectDescription',
                message: 'description: '
            }
        ]).then(function (answers) {
            this.projectDescription = answers.projectDescription;
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
        this.runInstall('npm');
    }

});
