'use strict';

const Generator = require('yeoman-generator');
const utils = require('../utils.js');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('componentName', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Name of the component where the module will be generated.'
    });
  }

  writing() {
    var component = this.options.componentName;
    var filename = utils.generateFilename(component, 'module');
    var moduleName = utils.generateModuleName(component);

    this.fs.copyTpl(this.templatePath('module.js'), this.destinationPath(filename), {moduleName: moduleName});
  }
};
