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

    this.config.set(this._dialectConfig(dialect, suffix));
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

  setDependencies: function () {
    var scriptSuffix = this.config.get('scriptSuffix');
    var stylesheetSuffix = this.config.get('stylesheetSuffix');

    this.config.set('devDependencies',
                    packages.fetch([scriptSuffix, stylesheetSuffix]));
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
        that._stringifiedConfig()
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

    this._mkTestDirs(folderTree);
  },

  copyScripts: function () {
    var that = this;
    var file_dests = {
      'main': 'src/scripts/',
      'App': 'src/scripts/components/',
      'AppDispatcher': 'src/scripts/dispatcher/'
    };

    this._.each(file_dests, function(dist, filename){
      var suffixedFile = that._suffixedFile(filename, 'script');
      var template = that._templatePath(filename, 'script');

      that.fs.copyTpl(
        that.templatePath(template),
        that.destinationPath(dist + suffixedFile),
        that._stringifiedConfig()
      );
    });
  },

  copyStylesheets: function () {
    this.fs.copy(
      this.templatePath(this._templatePath('style', 'stylesheet')),
      this.destinationPath('src/assets/stylesheets/' + this._suffixedFile('style', 'stylesheet'))
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

  _mkTestDirs: function (tree){
    var that = this;
    if (!this.config.get('mkTestDirs')) {
      return;
    }

    this._.each(tree['src/scripts'], function (dir) {
      that.dest.mkdir('src/scripts/' + dir + '/__tests__');
    });

    var testFile = this._suffixedFile('App-test', 'script');
    var testFilePath = this._templatePath('App-test', 'script');

    this.fs.copyTpl(
      this.templatePath(testFilePath),
      this.destinationPath('src/scripts/components/__tests__/' + testFile),
      this._stringifiedConfig()
    );
  },

  _suffixedFile: function(filename, type) {
    var suffix = this.config.get(type + 'Suffix');
    return filename + suffix;
  },

  _templatePath: function(filename, type) {
    var templateDir = ('script' === type) ? 'dialect' : 'stylesheetSyntax';
    return this.config.get(templateDir) + "/" + this._suffixedFile(filename, type);
  },

  _stringifiedConfig: function () {
    var _ = this._;

    return _.each(this.config.getAll(), function(value, key, item){
      if (_.isObject(value)) {
        item[key] = JSON.stringify(value, null, '\t');
                                             // '\t' option for prettify output file,
                                             // not perfect but better than one line only
      }
    });
  }
});
