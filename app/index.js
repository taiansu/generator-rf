'use strict';
var yeoman = require('yeoman-generator');
var generators = yeoman.generators;
var chalk = require('chalk');
var yosay = require('yosay');
var packages = require('./packages.js');

module.exports = generators.Base.extend({

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
                                  desc: "Skip automatic installation" });
  },

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
  },

  configuring: function () {
    this.config.set('mkTestDirs', !this.options['skip-test']);
    this._setDialect(this.options.d);
    this._setStylesheet(this.options.s);
    this._setDependencies();
  },

  writing: {
    app: function () {
      this._copyConfigFiles();
      this._copyHTML();
      this._mkDirs();
      this._copyScripts();
      this._copyStylesheets();
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies({
      bower: false,
      skipInstall: this.options['skip-install']
    });
  },

  //////////////////////
  // Helper Functions //
  //////////////////////

  _setDialect: function (dialectFlag) {
    var dialect, suffix, config;
    switch(dialectFlag) {
      case 'ls':
        // Fall through
      case 'lsc':
        dialect = 'LiveScript';
        suffix = 'ls';
        break;
      case 'js':
        dialect = 'JavaScript';
        suffix = 'js';
        break;
      default:
        dialect = 'coffee-script';
        suffix = 'coffee';
        break;
    }

    this.config.set(this._dialectConfig(dialect, suffix));
  },

  _setStylesheet: function (styleFlag) {
    if (!this._.contains(['sass', 'scss', 'css', 'less'], styleFlag.toLowerCase())) {
      this.log("Warning: I don't recognize stylesheet: " + styleFlag.replace(/=/, '') + ", will use SASS instead.");
      styleFlag = 'sass';
    }
    this.config.set('stylesheetSyntax', styleFlag.toUpperCase());
    this.config.set('stylesheetSuffix', '.' + styleFlag.toLowerCase());
  },

  _copyConfigFiles: function () {
    var that = this;
    var configFiles = [
      "package.json",
      "preprocessor.js",
      "webpack.config.js"
    ];

    this._.each(configFiles, function(file){
      that.fs.copyTpl(
        that.templatePath('_' + file),
        that.destinationPath(file),
        that._stringifiedConfig()
      );
    });
  },

  _copyHTML: function () {
    this.fs.copy(
      this.templatePath('_index.html'),
      this.destinationPath('src/index.html')
    );
  },

  _mkDirs: function () {
    var that = this;
    var _ = this._;
    var folderTree = {
      "src/scripts": [ "actions", "components", "constants",
                       "dispatcher", "mixins", "stores" ],
      "src/assets":  [ "images", "stylesheets" ]
    }

    _.each(_.keys(folderTree), function (dir) {
      that.dest.mkdir(dir);
      _.each(folderTree[dir], function (subdir) {
        that.dest.mkdir(dir + "/" + subdir);
      });
    });

    this._mkTestDirs(folderTree);
  },

  _mkTestDirs: function (tree){
    var that = this;
    if (!this.config.get('mkTestDirs')) {
      return;
    }

    this._.each(tree['src/scripts'], function (dir) {
      that.dest.mkdir('src/scripts/' + dir + '/__tests__');
    });

    var testFile = this._suffixedScriptFile('App-test');
    var testFilePath = this._dialectTemplate('App-test');

    this.fs.copyTpl(
      this.templatePath(testFilePath),
      this.destinationPath('src/scripts/components/__tests__/' + testFile),
      this._stringifiedConfig()
    );
  },

  _copyScripts: function () {
    var that = this;
    var file_dests = {
      'main': 'src/scripts/',
      'App': 'src/scripts/components/',
      'AppDispatcher': 'src/scripts/dispatcher/'
    };

    this._.each(file_dests, function(dist, filename){
      var suffixedScriptFile = that._suffixedScriptFile(filename);
      var template = that._dialectTemplate(filename);

      that.fs.copyTpl(
        that.templatePath(template),
        that.destinationPath(dist + suffixedScriptFile),
        that._stringifiedConfig()
      );
    });
  },

  _copyStylesheets: function () {
    this.fs.copy(
      this.templatePath(this._stylesheetTemplate('style')),
      this.destinationPath('src/assets/stylesheets/' + this._suffixedStylesheet('style'))
    );
  },

  _dialectConfig: function (dialect, suffix) {
    var _ = this._;

    return  {
      'description': "A React/Flux app generate by RF, powered with " + dialect,
      'dialect': dialect,
      'scriptSuffix': "." + suffix,
      'testFileExtensions': _.uniq(['js', suffix]),
      'dialectModuleFileExtensions': _.uniq(['js', 'json', suffix]),
    };
  },

  _suffixedScriptFile: function(filename) {
    return (filename + this.config.get('scriptSuffix'));
  },

  _dialectTemplate: function(filename) {
    return this.config.get('dialect') + "/"  + this._suffixedScriptFile(filename);
  },

  _suffixedStylesheet: function (filename) {
    return (filename + this.config.get('stylesheetSuffix'));
  },

  _stylesheetTemplate: function(filename) {
    return this.config.get('stylesheetSyntax') + "/"  + this._suffixedStylesheet(filename);
  },

  _stringifiedConfig: function () {
    return this._.each(this.config.getAll(), function(value, key, item){
      if (typeof value === 'object') {
        item[key] = JSON.stringify(value, null, '\t');
      }
    });
  },

  _setDependencies: function () {
    var scriptSuffix = this.config.get('scriptSuffix');
    var stylesheetSuffix = this.config.get('stylesheetSuffix');

    this.config.set('devDependencies',
                    packages.fetch(['base', scriptSuffix, stylesheetSuffix]));
  }
});
