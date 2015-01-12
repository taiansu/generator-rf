var generators = require('yeoman-generator').generators;
var packages = require('./packages.js');

module.exports = generators.Base.extend({

  setDialect: function (dialectFlag) {
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

    this.config.set(this.dialectConfig(dialect, suffix));
  },

  setStylesheet: function (styleFlag) {
    var style = styleFlag.toUpperCase();
    if (!this._.contains(['SASS', 'SCSS', 'CSS', 'LESS'], style)) {
      this.log("Warning: Don't recognize stylesheet syntax: " + style + ", will use SASS instead.");
      style = 'SASS';
    }
    this.config.set('stylesheetSyntax', style);
    this.config.set('stylesheetSuffix', '.' + style.toLowerCase());
  },

  copyConfigFiles: function () {
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
        that.stringifiedConfig()
      );
    });
  },

  copyHTML: function () {
    this.fs.copy(
      this.templatePath('_index.html'),
      this.destinationPath('src/index.html')
    );
  },

  mkDirs: function () {
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

    this.mkTestDirs(folderTree);
  },

  mkTestDirs: function (tree){
    var that = this;
    if (!this.config.get('mkTestDirs')) {
      return;
    }

    this._.each(tree['src/scripts'], function (dir) {
      that.dest.mkdir('src/scripts/' + dir + '/__tests__');
    });

    var testFile = this.suffixedScriptFile('App-test');
    var testFilePath = this.dialectTemplate('App-test');

    this.fs.copyTpl(
      this.templatePath(testFilePath),
      this.destinationPath('src/scripts/components/__tests__/' + testFile),
      this.stringifiedConfig()
    );
  },

  copyScripts: function () {
    var that = this;
    var file_dests = {
      'main': 'src/scripts/',
      'App': 'src/scripts/components/',
      'AppDispatcher': 'src/scripts/dispatcher/'
    };

    this._.each(file_dests, function(dist, filename){
      var suffixedScriptFile = that.suffixedScriptFile(filename);
      var template = that.dialectTemplate(filename);

      that.fs.copyTpl(
        that.templatePath(template),
        that.destinationPath(dist + suffixedScriptFile),
        that.stringifiedConfig()
      );
    });
  },

  copyStylesheets: function () {
    this.fs.copy(
      this.templatePath(this.stylesheetTemplate('style')),
      this.destinationPath('src/assets/stylesheets/' + this.suffixedStylesheet('style'))
    );
  },

  dialectConfig: function (dialect, suffix) {
    var _ = this._;

    return  {
      'description': "A React/Flux app generate by RF, powered with " + dialect,
      'dialect': dialect,
      'scriptSuffix': "." + suffix,
      'testFileExtensions': _.uniq(['js', suffix]),
      'dialectModuleFileExtensions': _.uniq(['js', 'json', suffix]),
    };
  },

  suffixedScriptFile: function(filename) {
    return (filename + this.config.get('scriptSuffix'));
  },

  dialectTemplate: function(filename) {
    return this.config.get('dialect') + "/"  + this.suffixedScriptFile(filename);
  },

  suffixedStylesheet: function (filename) {
    return (filename + this.config.get('stylesheetSuffix'));
  },

  stylesheetTemplate: function(filename) {
    return this.config.get('stylesheetSyntax') + "/"  + this.suffixedStylesheet(filename);
  },

  stringifiedConfig: function () {
    var _ = this._;

    return _.each(this.config.getAll(), function(value, key, item){
      if (_.isObject(value)) {
        item[key] = JSON.stringify(value, null, '\t');
                                             // '\t' option for prettify output file,
                                             // not perfect but better than one line only
      }
    });
  },

  setDependencies: function () {
    var scriptSuffix = this.config.get('scriptSuffix');
    var stylesheetSuffix = this.config.get('stylesheetSuffix');

    this.config.set('devDependencies',
                    packages.fetch([scriptSuffix, stylesheetSuffix]));
  }
});
