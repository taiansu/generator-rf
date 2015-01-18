var generators = require('yeoman-generator').generators;
var dialects = require('./dialects.js');
var styles = require('./styles.js');
var packages = require('./packages.js');
var loaders = require('./loaders.js');

module.exports = generators.Base.extend({

  setDialect: function (dialectFlag) {
    var dialect = dialects.get(dialectFlag);

    if (dialect.warning) {
      this.log(dialect.warning);
    }

    this.config.set(this._dialectConfig(dialect['name'], dialect['suffix']));
  },

  setStylesheet: function (styleFlag) {
    var style = styles.get(styleFlag);

    if (style.warning) {
      this.log(style.warning);
    }

    this.config.set('stylesheet', style.name);
    this.config.set('stylesheetSuffix', style.suffix);
  },

  setEnv: function () {
    var dialect = this.config.get('dialect');
    var stylesheet = this.config.get('stylesheet');
    var scriptSuffix = this.config.get('scriptSuffix');
    var dialectTest = (scriptSuffix === 'js') ? '.jsx?' : scriptSuffix;

    this.config.set('devDependencies',
                    packages.wrap([dialect, stylesheet]));

    this.config.set('dialectTest', dialectTest);
    this.config.set('dialectLoader',  loaders.get(dialect));
    this.config.set('stylesheetLoader',  loaders.get(stylesheet));
  },

  copyConfigFiles: function () {
    var self = this;
    var configFiles = [
      "package.json",
      "webpack.config.js"
    ];

    this._.each(configFiles, function(file){
      self.fs.copyTpl(
        self.templatePath('_' + file),
        self.destinationPath(file),
        self._stringifiedConfig()
      );
    });

    // Copy preprocessor.js base on chosen dialect
    this.fs.copy(
      this.templatePath(this._template('preprocessor.js', 'config')),
      this.destinationPath('preprocessor.js')
    );
  },

  copyHTML: function () {
    this.fs.copy(
      this.templatePath('_index.html'),
      this.destinationPath('src/index.html')
    );
  },

  mkDirs: function () {
    var self = this;
    var _ = this._;
    var folderTree = {
      "src/scripts": [ "actions", "components", "constants",
                       "dispatcher", "mixins", "stores" ],
      "src/assets":  [ "images", "stylesheets" ]
    }

    _.each(_.keys(folderTree), function (dir) {
      self.dest.mkdir(dir);
      _.each(folderTree[dir], function (subdir) {
        self.dest.mkdir(dir + "/" + subdir);
      });
    });

    this._mkTestDirs(folderTree);
  },

  copyScripts: function () {
    var self = this;
    var file_dests = {
      'main': 'src/scripts/',
      'App': 'src/scripts/components/',
      'AppDispatcher': 'src/scripts/dispatcher/'
    };

    this._.each(file_dests, function(dist, filename){
      var suffixedFile = self._suffixedFile(filename, 'script');
      var template = self._template(filename, 'script');

      self.fs.copyTpl(
        self.templatePath(template),
        self.destinationPath(dist + suffixedFile),
        self._stringifiedConfig()
      );
    });
  },

  copyStylesheets: function () {
    this.fs.copy(
      this.templatePath(this._template('style', 'stylesheet')),
      this.destinationPath('src/assets/stylesheets/' + this._suffixedFile('style', 'stylesheet'))
    );
  },

  _dialectConfig: function (dialect, suffix) {
    var _ = this._;

    return  {
      'description': "A React/Flux app generate by RF, powered with " + dialect,
      'dialect': dialect,
      'scriptSuffix': suffix,
      'testFileExtensions': _.uniq(['js', suffix]),
      'dialectModuleFileExtensions': _.uniq(['js', 'json', suffix]),
    };
  },

  _mkTestDirs: function (tree){
    var self = this;
    if (!this.config.get('mkTestDirs')) {
      return;
    }

    this._.each(tree['src/scripts'], function (dir) {
      self.dest.mkdir('src/scripts/' + dir + '/__tests__');
    });

    var testFile = this._suffixedFile('App-test', 'script');
    var testFilePath = this._template('App-test', 'script');

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

  _template: function(filename, type) {
    if (type === 'config') {
      this.log( this.config.get('dialect') + "/" + filename);
      return this.config.get('dialect') + "/" + filename;
    } else {
      var templateDir = ('script' === type) ? 'dialect' : 'stylesheet';
      return this.config.get(templateDir) + "/" + this._suffixedFile(filename, type);
    }
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
