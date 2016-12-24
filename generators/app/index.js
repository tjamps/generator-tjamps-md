'use strict';

const Generator = require('yeoman-generator');
const _ = require('lodash');
const path = require('path');

module.exports = Generator.extend({
  initializing: function () {
    this.appName = _.kebabCase(path.basename(process.cwd()));
  },

  writing: function () {
    var params = {
      appName: this.appName
    };

    this.fs.copyTpl(this.templatePath('root/_bower.json'), this.destinationPath('bower.json'), params);
    this.fs.copyTpl(this.templatePath('root/_package.json'), this.destinationPath('package.json'), params);

    this.fs.copy(this.templatePath('root/_bowerrc'), this.destinationPath('.bowerrc'));
    this.fs.copy(this.templatePath('root/_editorconfig'), this.destinationPath('.editorconfig'));
    this.fs.copy(this.templatePath('root/_gitattributes'), this.destinationPath('.gitattributes'));
    this.fs.copy(this.templatePath('root/_gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('root/_Gruntfile.js'), this.destinationPath('Gruntfile.js'));
    this.fs.copy(this.templatePath('root/_jscsrc'), this.destinationPath('.jscsrc'));
    this.fs.copy(this.templatePath('root/_jshintrc'), this.destinationPath('.jshintrc'));
    this.fs.copy(this.templatePath('root/_yo-rc.json'), this.destinationPath('.yo-rc.json'));
    this.fs.copy(this.templatePath('root/README.md'), this.destinationPath('README.md'));


    this.fs.copy(this.templatePath('parameters/**'), this.destinationPath('parameters'));
    this.fs.copy(this.templatePath('app/components/**'), this.destinationPath('app/components'));
    this.fs.copy(this.templatePath('app/images/_gitkeep'), this.destinationPath('app/images/.gitkeep'));
    this.fs.copy(this.templatePath('app/less/**'), this.destinationPath('app/less'));
    this.fs.copy(this.templatePath('app/index.html'), this.destinationPath('app/index.html'));
    this.fs.copy(this.templatePath('app/robots.txt'), this.destinationPath('app/robots.txt'));
  },
  install: function () {
    this.installDependencies();
  },
});
