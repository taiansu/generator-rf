var _ = require('lodash');

module.exports = {

  wrap: function (dialectAndStylesheet) {
    return _.reduce(dialectAndStylesheet, function(result, name) {
      return _.merge(result, this._get(name));
    }, _.clone(this.baseDependencies), this);
  },

  _get: function (name) {
    var key = name && name.replace(/-/, '') + "Dependencies";

    if (_.isPlainObject(this[key])) {
      return this[key];
    } else {
      // return an empty object if this[key] not exist, like CSSDependencies
      return {};
    }
  },

  JavaScriptDependencies: {
    'jsx-loader': '*'
  },

  BabelDependencies: {
    'babel-loader': '*',
    'babel-jest': '*'
  },

  coffeescriptDependencies: {
    'coffee-react-transform': '*',
    'cjsx-loader': '*',
    'coffee-loader': '*',
    'coffee-script': '*'
  },

  LiveScriptDependencies: {
    'coffee-react-transform': '*',
    'cjsx-loader': '*',
    'livescript-loader': '*',
    'LiveScript': '*'
  },

  SASSDependencies: {
    'node-sass': '*',
    'sass-loader': '*'
  },

  SCSSDependencies: {
    'node-sass': '*',
    'sass-loader': '*'
  },

  LessDependencies: {
    'less': '*',
    'less-loader': '*'
  },

  StylusDependencies: {
    'node-stylus': '*',
    'stylus-loader': '*'
  },

  BootstrapDependencies:{
    'bootstrap': '*',
    'bootstrap-webpack': '*',
    'imports-loader': '*',
    'jquery': '*'
  },

  baseDependencies: {
    'css-loader': '*',
    'file-loader': '*',
    'jest-cli': '*',
    'react-hot-loader': '*',
    'react-tools': '*',
    'style-loader': '*',
    'url-loader': '*',
    'webpack-dev-server': '*',
    'webpack': '*'
  }
}
