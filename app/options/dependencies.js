var _ = require('lodash');

module.exports = {

  wrap: function (dialectAndStylesheet) {
    return _.reduce(dialectAndStylesheet, function(result, name) {
      return _.merge(result, this._get(name));
    }, this.baseDependencies, this);
  },

  _get: function (name) {
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
    'sass-loader': '*'
  },

  SCSSDependencies: {
    'sass-loader': '*'
  },

  LessDependencies: {
    'less-loader': '*'
  },

  StylusDependencies: {
    'stylus-loader': '*'
  },

  baseDependencies: {
    'css-loader': '*',
    'file-loader': '*',
    'jest-cli': '*',
    'react-hot-loader': '*',
    'react-tools': '*',
    'style-loader': '*',
    'webpack-dev-server': '*',
    'webpack': '*'
  }
}
