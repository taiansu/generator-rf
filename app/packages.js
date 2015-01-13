var _ = require('lodash');

module.exports = {

  wrap: function(items) {
    return _.reduce(items, function(result, item) {
      return _.merge(result, this._dependenciesOf(item));
    }, this.baseDependencies, this);
  },

  _dependenciesOf: function (suffix) {
    var key = suffix.replace(/\./, '') + "Dependencies";

    if (_.isPlainObject(this[key])) {
      return this[key];
    } else {
      // return an empty object if this[key] not exist, like _cssDependencies
      return {};
    }
  },

  jsDependencies: {
    'jsx-loader': '*'
  },

  coffeeDependencies: {
    'cjsx-loader': '^1.1.0',
    'coffee-loader': '*',
    'coffee-script': '*'
  },

  lsDependencies: {
    'cjsx-loader': '^1.1.0',
    'livescript-loader': '*',
    'LiveScript': '*'
  },

  sassDependencies: {
    'sass-loader': '*'
  },

  scssDependencies: {
    'sass-loader': '*'
  },

  lessDependencies: {
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
