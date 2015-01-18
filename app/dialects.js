module.exports = {
  get: function(dialectFlag) {
    return this[dialectFlag] || this.coffee;
  },

  ls: {
    name: 'LiveScript',
    suffix: '.ls'
  },

  js: {
    name: 'JavaScript',
    suffix: '.js'
  },

  "6to5": { // object property name constraints
    name: 'JavaScript-6to5',
    suffix:'.js'
  },

  coffee: {
    name: 'coffee-script',
    suffix:'.coffee'
  }
}
