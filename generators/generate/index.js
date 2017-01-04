'use strict';

const Generator = require('yeoman-generator');
const _ = require('lodash');
const path = require('path');
const utils = require('../utils');


module.exports = class extends Generator {
  /**
   *
   * @param args
   * @param opts
   */
  constructor(args, opts) {
    super(args, opts);

    this.argument('generator', {
      type: String,
      required: false,
      default: '',
      desc: 'Name of the generator to run.'
    });
  }

  /**
   *
   */
  initializing() {
    this.params = {};
    if (this.options.generator !== '') {
      this.params.generator = this.options.generator;
    }
  }

  /**
   *
   * @returns {Promise}
   */
  prompting() {
    var prompts = [{
      type: 'list',
      name: 'generator',
      message: 'Generator to run',
      choices: [{
        name: 'Module - Create a new module',
        value: 'module',
        short: 'Module'
      }, {
        name: 'Config - Create a new configuration file',
        value: 'config',
        short: 'Config'
      }, {
        name: 'Run - Create a new run file',
        value: 'run',
        short: 'Run'
      }, {
        name: 'Controller - Create a new controller',
        value: 'controller',
        short: 'Controller'
      }, {
        name: 'Directive - Create a new directive',
        value: 'directive',
        short: 'Controller'
      }, {
        name: 'ui-route - Create a new ui-route file',
        value: 'uiroute',
        short: 'ui-route'
      }, {
        name: 'API service - Create a new service using $resource',
        value: 'api',
        short: 'API service'
      }, {
        name: 'Service - Create a new service using a factory',
        value: 'servicef',
        short: 'Service (factory)'
      }],
      when: this.options.generator === '',
      store: true,
    }, {
      name: 'component',
      message: 'Name of the component',
      store: true,
      filter: _.kebabCase
    }];

    return this.prompt(prompts).then(function(answers) {
      this.params = _.merge(this.params, answers);
    }.bind(this));
  }

  /**
   *
   */
  default() {
    if (this.params.generator !== 'module' && ! this.fs.exists(utils.generateFilename(this.params.component, 'module'))) {
      this.composeWith(require.resolve('../module'), {componentName: this.params.component});
    }

    this.composeWith(require.resolve('../' + this.params.generator), {componentName: this.params.component});
  }
};
