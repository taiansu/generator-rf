'use strict';
var yeoman = require('yeoman-generator');
var generators = yeoman.generators;
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = generators.Base.extend({

  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('appName', { type: String, required: true});
    this.config.set('appName', this.appName);

    this.option('d', { type: String,
                       defaults: "coffee-script",
                       desc: "Dialect: 'lsc' for LiveScript or 'js' for native JavaScript" });

    this.option('s', { type: String,
                       defaults: "SASS",
                       desc: "Stylesheet syntax, can be 'scss' or 'css' "});

    this.option('skip-test', { type: Boolean,
                               defaults: false,
                               desc: "Don't create __test__ for every subfolder in src/scripts" });

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

  },

  writing: {
    app: function () {
      this._copyConfigFiles();
      this._copyHTML();
      this._mkDirs(this.dest);
      this._copyScripts();
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
    config = this._.merge(this._dialectConfig(dialect, suffix),
                          this._dialectDependencies(dialect));

    this.config.set(config);
  },

  _setStylesheet: function (styleFlag) {
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

  _mkDirs: function (dest) {
    var _ = this._;
    var folderTree = {
      "src/scripts": [ "actions", "components", "constants",
                   "dispatcher", "mixins", "stores" ],
      "src/assets": [ "images", "stylesheets" ],

    }

    _.each(_.keys(folderTree), function (dir) {
      dest.mkdir(dir);
      _.each(folderTree[dir], function (subdir) {
        dest.mkdir(dir + "/" + subdir);
      });
    });

    if (this.config.get('mkTestDirs')) {
      this._mkTestDirs(folderTree, dest);
    }
  },

  _mkTestDirs: function (tree, dest){
    this._.forEach(tree['src/scripts'], function (dir) {
      dest.mkdir('src/scripts/' + dir + '/__test__');
    });
  },

  _copyScripts: function () {
    var that = this;
    var file_dests = {
      'main': 'src/scripts/',
      'App': 'src/scripts/components/',
      'AppDispatcher': 'src/scripts/dispatcher/'
    };

    this._.each(file_dests, function(dist, filename){
      var fileSuffixed = filename.toString() + that.config.get('scriptSuffix');
      var template = that.config.get('dialect') + "/"  + fileSuffixed;

      that.fs.copyTpl(
        that.templatePath(template),
        that.destinationPath(dist + fileSuffixed),
        that._stringifiedConfig()
      );
    });
  },

  _dialectDependencies: function(dialect) {
    var _ = this._;
    var devDependencies = {
      'react-addons': '^0.9.0',
      'react-hot-loader': '^1.0.4',
      'webpack-dev-server': '^1.7.0',
      'webpack': '^1.4.14'
    };

    switch(dialect) {
      case 'JavaScript':
        return {"devDependencies": _.merge(devDependencies,
                                           {'jsx-loader': '*'})};
        break;
      case 'LiveScript':
        return {"devDependencies": _.merge(devDependencies,
                                           {'cjsx-loader': '^1.1.0',
                                            'livescript-loader': '*',
                                            'LiveScript': '*' })};
        break;
      default:
        return {"devDependencies": _.merge(devDependencies,
                                           {'cjsx-loader': '^1.1.0',
                                            'coffee-loader': '*',
                                            'coffee-script': '*' })};
        break;
    }
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

  _stringifiedConfig: function () {
    return this._.each(this.config.getAll(), function(value, key, item){
      if (typeof value === 'object') {
        item[key] = JSON.stringify(value);
      }
    });
  }
});
