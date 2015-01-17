var _ = require('lodash');

module.exports = {

  wrap: function(dialectAndStylesheet) {
    return _.reduce(dialectAndStylesheet, function(result, name) {
      return _.merge(result, this._dependenciesOf(name));
    }, this.baseDependencies, this);
  },

  _dependenciesOf: function (name) {
    var key = name.replace(/-/, '') + "Dependencies";

    if (_.isPlainObject(this[key])) {
      return this[key];
    } else {
      // return an empty object if this[key] not exist, like _cssDependencies
      return {};
    }
  },

  JavaScriptDependencies: {
    'jsx-loader': '*'
  },

  JavaScript6to5Dependencies: {
    '6to5-loader': '*',
    '6to5-jest': '*'
  },

  coffeescriptDependencies: {
    'cjsx-loader': '^1.1.0',
    'coffee-loader': '*',
    'coffee-script': '*'
  },

  LiveScriptDependencies: {
    'cjsx-loader': '^1.1.0',
    'livescript-loader': '*',
    'LiveScript': '*'
  },

  SASSDependencies: {
    'sass-loader': '*'
  },

  SCSSDependencies: {
    'sass-loader': '*'
  },

  LESSDependencies: {
    'less-loader': '*'
  },

  baseDependencies: {
    'react-addons': '^0.9.0',
    'react-tools': '^0.12.2',
    'react-hot-loader': '^1.0.4',
    'css-loader': '*',
    'style-loader': '*',
    'webpack-dev-server': '^1.7.0',
    'webpack': '^1.4.14'
  }
}
