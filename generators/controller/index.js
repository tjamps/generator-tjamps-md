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
      desc: 'Name of the component where the configuration will be generated.'
    });
  }

  initializing() {
    this.params = {};
  }

  prompting() {
    var prompts = [{
      name: 'name',
      message: 'Name of the controller (without suffix)',
      filter: function(value) {
        return value + 'Controller';
      },
      default: this._generateControllerDefaultName(this.options.componentName)
    }, {
      type: 'confirm',
      name: 'controllerAs',
      message: 'Make controllerAs compatible ?',
    }];

    return this.prompt(prompts).then(function(answers) {
      this.params = _.merge(this.params, answers);
    }.bind(this));
  }

  writing() {
    var component = this.options.componentName;
    var filename = utils.generateFilename(component, 'controller');
    this.params.moduleName = utils.generateModuleName(component);

    this.fs.copyTpl(this.templatePath('controller.js'), this.destinationPath(filename), {params: this.params});
  }

  _generateControllerDefaultName(componentName) {
    var basename = utils.generateBasename(this.options.componentName);

    return basename.substring(0, 1).toLocaleUpperCase() + basename.substring(1);
  }
};
