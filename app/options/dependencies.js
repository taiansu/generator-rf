var _ = require('lodash');

var dependencies = {
  'Javascript': {
    'jsx-loader': '*'
  },

  'Babel': {
    'babel-loader': '*',
    'babel-preset-es2015': '*',
    'babel-preset-react': '*',
    'babel-jest': '*'
  },

  'coffeescript': {
    'coffee-react-transform': '*',
    'cjsx-loader': '*',
    'coffee-loader': '*',
    'coffee-script': '*'
  },

  'LiveScript': {
    'coffee-react-transform': '*',
    'cjsx-loader': '*',
    'livescript-loader': '*',
    'LiveScript': '*'
  },

  'SASS': {
    'node-sass': '*',
    'sass-loader': '*'
  },

  'SCSS': {
    'node-sass': '*',
    'sass-loader': '*'
  },

  'Less': {
    'less': '*',
    'less-loader': '*'
  },

  'Stylus': {
    'stylus': '*',
    'stylus-loader': '*'
  },

  'Bootstrap':{
    'bootstrap': '*',
    'bootstrap-webpack': '*',
    'imports-loader': '*',
    'jquery': '*'
  },

  'base': {
    'less-loader': '*',
    'less': '*',
    'exports-loader': '*',
    'extract-text-webpack-plugin': '*',
    'css-loader': '*',
    'file-loader': '*',
    'jest-cli': '*',
    'react-hot-loader': '*',
    'react': '*',
    'react-dom': '*',
    'style-loader': '*',
    'url-loader': '*',
    'webpack-dev-server': '*',
    'webpack': '*'
  }
}

module.exports = {
  _get: function (name) {
    var key = name && name.replace(/-/, '')

    // return an empty object if this[key] not exist, like CSSDependencies
    if(!_.has(dependencies, key)){ return {} }

    return dependencies[key]
  },

  wrap: function (dialectAndStylesheet) {
    return _(dialectAndStylesheet)
             .concat('base')
             .map(this._get)
             .reduce(function(result, item) {
               return _.extend(result, item)
             }, {})
  }
}
