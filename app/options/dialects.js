var _ = require('lodash');

var dialects = {
  'ls': {
    'name': 'LiveScript',
    'suffix': '.ls'
  },

  'js': {
    'name': 'JavaScript',
    'suffix': '.js'
  },

  'es6': {
    'name': 'Babel',
    'suffix':'.js'
  },

  'babel': {
    'name': 'Babel',
    'suffix':'.js'
  },

  'coffee': {
    'name': 'coffee-script',
    'suffix':'.coffee'
  }
}

module.exports = {
  get: function(dialectFlag) {
    if(!_.has(dialects, dialectFlag)) {
      return _.extend(dialects.babel, {
        'warning': "Warning: Don't recognize dialect: " + dialectFlag + ", generate coffee-script instead."
      })
    }

    return dialects[dialectFlag]
  },
}
