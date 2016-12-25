'use strict';

const Generator = require('yeoman-generator');
const utils = require('../utils.js');
const _ = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('componentName', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Name of the component where the API service will be generated.'
    });
  }

  writing() {
    var component = this.options.componentName;
    var filename = utils.generateFilename(component, 'api');
    var moduleName = utils.generateModuleName(component);
    var serviceName = utils.generateBasename(component) + 'Api';

    this.fs.copyTpl(this.templatePath('api.js'), this.destinationPath(filename), {moduleName: moduleName, serviceName: serviceName});
  }
};
