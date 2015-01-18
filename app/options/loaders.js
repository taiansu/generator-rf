module.exports = {
  get: function (dialectOrStylesheet) {
    var key = dialectOrStylesheet.replace(/-/, '') + "Loader";
    // return an empty string if this[key] not exist
    return this[key] || '';
  },

  coffeescriptLoader:   'coffee!cjsx',
  JavaScriptLoader:     'jsx',
  JavaScript6to5Loader: '6to5',
  LiveScriptLoader:      'livescript!cjsx',
  CSSLoader:            'style!css',
  LessLoader:           'style!css!less',
  StylusLoader:         'style!css!stylus',
  SASSLoader:           'style!css!sass?indentedSyntax=true&outputStyle=expanded',
  SCSSLoader:           'style!css!sass?outputStyle=expanded'
}
