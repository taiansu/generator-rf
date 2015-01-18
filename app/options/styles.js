var _ = require('lodash');

module.exports = {

  get: function(styleFlag) {
    if ( this[styleFlag] ) {
      return this[styleFlag];
    } else {
      var warning = { warning: "Warning: Don't recognize stylesheet syntax: "
                               + styleFlag + ", generate SASS instead." }
      return _.merge(this.sass, warning);
    }
  },

  stylus: {
    name: 'Stylus',
    suffix: '.styl'
  },

  less: {
    name: 'Less',
    suffix:'.less'
  },
  css: {
    name: 'CSS',
    suffix:'.css'
  },

  scss: {
    name: 'SCSS',
    suffix:'.scss'
  },

  sass: {
    name: 'SASS',
    suffix:'.sass'
  }
}
