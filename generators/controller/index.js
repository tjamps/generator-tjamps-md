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
        return this._generateControllerName(value);
      }.bind(this),
      default: this._generateControllerDefaultName(this.options.componentName)
    }, {
      type: 'confirm',
      name: 'controllerAs',
      message: 'Make controllerAs compatible ?',
    }, {
      type: 'confirm',
      name: 'template',
      message: 'Generate empty HTML template ?',
    }];

    return this.prompt(prompts).then(function(answers) {
      this.params = _.merge(this.params, answers);
    }.bind(this));
  }

  writing() {
    var filename = this._generateControllerFilename(this.options.componentName, this.params.name);
    this.params.moduleName = utils.generateModuleName(this.options.componentName);

    if (this.params.template) {
      this.fs.write(this._generateTemplatePath(this.options.componentName, this.params.name), '');
    }

    this.fs.copyTpl(this.templatePath('controller.js'), this.destinationPath(filename), {params: this.params});
  }

  _generateControllerDefaultName(componentName) {
    var basename = utils.generateBasename(componentName);

    return basename.substring(0, 1).toLocaleUpperCase() + basename.substring(1);
  }

  _generateControllerName(value) {
    var prefix = _.camelCase(value);
    prefix = prefix.substring(0, 1).toLocaleUpperCase() + prefix.substring(1);

    return prefix;
  }

  _generateControllerFilename(component, name) {
    var meta = utils.generateComponentMeta(component);

    return meta.directory + _.kebabCase(name) + '.controller.js';
  }

  _generateTemplatePath(component, name) {
    var meta = utils.generateComponentMeta(component);

    return meta.directory + _.kebabCase(name) + '.html';
  }
};
