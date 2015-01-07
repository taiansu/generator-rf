'use strict';
var yeoman = require('yeoman-generator');
var generators = yeoman.generators;
var chalk = require('chalk');
var yosay = require('yosay');

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

  _setDialect: function (dialect_flag) {

    var configs = {
      "description": "RF: React/Flux app with ",
      'dev_dependencies':  {
        'react-addons': '^0.9.0',
        'react-hot-loader': '^1.0.4',
        'webpack-dev-server': '^1.7.0',
        'webpack': '^1.4.14'
      },
      'test_file_extensions': ['js'],
      'dialect_module_file_extensions': ['js', 'json'],
    }

    switch(dialect_flag) {
      case 'ls':
        // Fall through
      case 'lsc':
        configs['dialect'] = 'LiveScript';
        configs['scriptSuffix'] = '.ls';
        configs['dev_dependencies'] = this._.merge(configs['dev_dependencies'], {
          'cjsx-loader': '^1.1.0',
          'livescript-loader': '*',
          'LiveScript': '*'
        });

        configs['test_file_extensions'] =
          configs['test_file_extensions'].concat('ls');

        configs['dialect_module_file_extensions'] =
          configs['dialect_module_file_extensions'].concat('ls');
        break;
      case 'js':
        configs['dialect'] = 'JavaScript';
        configs['scriptSuffix'] = '.js';
        configs['dev_dependencies'] = this._.merge(configs['dev_dependencies'], {
          'jsx-loader': '*'
        });
        break;
      default:
        configs['dialect'] = 'coffee-script';
        configs['scriptSuffix'] = '.coffee';
        configs['dev_dependencies'] = this._.merge(configs['dev_dependencies'], {
          'cjsx-loader': '^1.1.0',
          'coffee-loader': '*',
          'coffee-script': '*'
        });

        configs['test_file_extensions'] =
          configs['test_file_extensions'].concat('coffee');

        configs['dialect_module_file_extensions'] =
          configs['dialect_module_file_extensions'].concat('coffee', 'litcoffee');
        break;
    }
    configs['description'] = configs['description'] + configs['dialect'];

    this.config.set(configs);
  },

  _setStylesheet: function (style_flag) {
    this.config.set('stylesheetSyntax', style_flag.toUpperCase());
    this.config.set('stylesheetSuffix', '.' + style_flag.toLowerCase());
  },

  _copyConfigFiles: function () {
      var configurateion = this._.each(this.config.getAll(), function(value, key, item){
        if (typeof item === 'object') {
          item[key] = JSON.stringify(value);
        }
      });

      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        configurateion
      );

      this.fs.copyTpl(
        this.templatePath('_preprocessor.js'),
        this.destinationPath('preprocessor.js'),
        {'dialect': this.config.get('dialect'),
         'scriptSuffix': this.config.get('scriptSuffix')}
      );
      this.fs.copyTpl(
        this.templatePath('_webpack.config.js'),
        this.destinationPath('webpack.config.js'),
        {'dialect': this.config.get('dialect'),
         'scriptSuffix': this.config.get('scriptSuffix'),
         'style': this.config.get('stylesheetSyntax')}
      );
  },

  _copyHTML: function () {
      this.fs.copyTpl(
        this.templatePath('_index.html'),
        this.destinationPath('src/index.html')
      );
  },

  _mkDirs: function (dest) {
    var _ = this._
    var folderTree = {
      "src/scripts": [ "actions", "components", "constants",
                   "dispatcher", "mixins", "stores" ],
      "src/assets": [ "images", "stylesheets" ],

    }

    _.map(_.keys(folderTree), function (dir) {
      dest.mkdir(dir);
      _.forEach(folderTree[dir], function (subdir) {
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

      that.fs.copy(
        that.templatePath(template),
        that.destinationPath(dist + fileSuffixed)
      );
    });
  }
});
