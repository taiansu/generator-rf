'use strict';
var generators = require('yeoman-generator').generators;
var chalk = require('chalk');
var yosay = require('yosay');
var RfHelper = require('./rf-helper.js');

module.exports = RfHelper.extend({

  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('appname', { type: String, required: true});
    this.config.set('appname', this.appname);

    this.option('d', { type: String,
                       defaults: "coffee-script",
                       desc: "Dialect: 'lsc' for LiveScript or 'js' for native JavaScript" });

    this.option('s', { type: String,
                       defaults: "SASS",
                       desc: "Stylesheet syntax, can be 'scss', 'less' or 'css' "});

    this.option('skip-test', { type: Boolean,
                               defaults: false,
                               desc: "Don't create __tests__ for every subfolder in src/scripts" });

    this.option('skip-install', { type: Boolean,
                                  defaults: false,
                                  desc: "Skip automatic package installation" });
  },

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
  },

  configuring: function () {
    this.config.set('mkTestDirs', !this.options.skipTest);
    this.setDialect(this.options.d);
    this.setStylesheet(this.options.s);
    this.setDependencies();
  },

  writing: {
    app: function () {
      this.copyConfigFiles();
      this.copyHTML();
      this.mkDirs();
      this.copyScripts();
      this.copyStylesheets();
    },

    projectfiles: function () {
      var that = this;
      this._.each([".editorconfig", ".jshintrc"], function (file) {
        that.fs.copy(
          that.templatePath(file.replace(/\./, "")),
          that.destinationPath(file)
        );
      });
    }
  },

  install: function () {
    this.installDependencies({
      bower: false,
      skipInstall: this.options.skipInstall
    });
  }
});
