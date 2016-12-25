'use strict';

const Generator = require('yeoman-generator');
const utils = require('../utils.js');
const _ = require('lodash');

module.exports = class extends Generator {
  /**
   *
   * @param args
   * @param opts
   */
  constructor(args, opts) {
    super(args, opts);

    this.argument('componentName', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Name of the component where the directive will be generated.'
    });
  }

  initializing() {
    this.params = {};
  }

  /**
   *
   * @returns {Promise}
   */
  prompting() {
    var prompts = [{
      name: 'name',
      message: 'Name of the directive (without suffix)',
      filter: function(value) {
        return this._generateDirectiveName(value);
      }.bind(this),
      default: this._generateDirectiveName(this.options.componentName)
    }, {
      type: 'confirm',
      name: 'template',
      message: 'Generate template ?',
    }, {
      type: 'confirm',
      name: 'link',
      message: 'Use link function ?',
    }, {
      type: 'confirm',
      name: 'restrictElement',
      message: 'Restrict to element ?',
    }, {
      type: 'confirm',
      name: 'restrictAttribute',
      message: 'Restrict to attribute ?',
    }];

    return this.prompt(prompts).then(function(answers) {
      this.params = _.merge(this.params, answers);
    }.bind(this));
  }

  /**
   *
   */
  writing() {
    var component = this.options.componentName;
    var filename = this._generateDirectiveFilename(component, this.params.name.substring(3));
    var moduleName = utils.generateModuleName(component);
    var restrict = '';

    if (this.params.restrictElement) {
      restrict += 'E';
    }
    if (this.params.restrictAttribute) {
      restrict += 'A';
    }
    if (this.params.template) {
      this.params.templateUrl = this._generateTemplateUrl(component, this.params.name.substring(3));
      this.fs.write('app/' + this.params.templateUrl, '');

    }

    var options = {moduleName: moduleName, restrict: restrict, params: this.params};
    this.fs.copyTpl(this.templatePath('directive.js'), this.destinationPath(filename), options);
  }

  /**
   *
   * @param value
   * @returns {string}
   * @private
   */
  _generateDirectiveName(value) {
    var name = _.camelCase(value);
    if (name.substring(0, 3) === 'app') {
      return name;
    }

    name = name.substring(0, 1).toLocaleUpperCase() + name.substring(1);

    return 'app' + name;
  }

  /**
   *
   * @param component
   * @param name
   * @param extension
   * @returns {string}
   * @private
   */
  _generateDirectiveFilename(component, name) {
    var meta = utils.generateComponentMeta(component);
    return meta.directory + _.kebabCase(name) + '.directive.js';

  }

  /**
   *
   * @param component
   * @param name
   * @returns {string}
   * @private
   */
  _generateTemplateUrl(component, name) {
    var meta = utils.generateComponentMeta(component);

    return 'components/' + meta.filenameBase + '/' + _.kebabCase(name) + '.directive.html';
  }
};
