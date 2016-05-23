var _ = require('lodash');

module.exports = {
  get: function(dialectFlag) {
    if ( this[dialectFlag] ) {
      return this[dialectFlag];
    } else {
      var warning = { warning: "Warning: Don't recognize dialect: "
                                + dialectFlag + ", generate coffee-script instead." };
      return _.extend(this.babel, warning)
    }
  },

  ls: {
    name: 'LiveScript',
    suffix: '.ls'
  },

  js: {
    name: 'JavaScript',
    suffix: '.js'
  },

  es6: {
    name: 'Babel',
    suffix:'.js'
  },

  babel: {
    name: 'Babel',
    suffix:'.js'
  },

  coffee: {
    name: 'coffee-script',
    suffix:'.coffee'
  }
}
