var _ = require('lodash');

var styles = {
  stylus: {
    name: 'Stylus',
    suffix: '.styl'
  },

  less: {
    name: 'Less',
    suffix: '.less'
  },
  css: {
    name: 'CSS',
    suffix: '.css'
  },

  scss: {
    name: 'SCSS',
    suffix: '.scss'
  },

  sass: {
    name: 'SASS',
    suffix: '.sass'
  }
}

module.exports = {

  get: function(styleFlag) {
    if(!_.has(styles, styleFlag)){
      var warning = { warning: "Warning: Don't recognize stylesheet syntax: "
                                + styleFlag + ", generate SASS instead." };
      return _.merge(styles.sass, warning);
    }

    return styles[styleFlag];
  },

}
