var loaders = {
  coffeescript:   'coffee!cjsx',
  JavaScript:     'babel?presets[]=react',
  Babel:          'babel?presets[]=es2015,presets[]=react',
  LiveScript:     'livescript!cjsx',
  CSS:            'style!css',
  Less:           'style!css!less',
  Stylus:         'style!css!stylus',
  SASS:           'style!css!sass?indentedSyntax=true&outputStyle=expanded',
  SCSS:           'style!css!sass?outputStyle=expanded',
}
module.exports = {
  get: function (dialectOrStylesheet) {
    var key = dialectOrStylesheet.replace(/-/, '');
    // return an empty string if loader not exist
    return loaders[key] || '';
  },

  // Different from others, fetch this directly.
  BootstrapLoaders:     "{"                                                                   + "\n        " +
                           "test: /bootstrap\\/js\\//,"                                       + "\n        " +
                           "loader: 'imports?jQuery=jquery'"                                  + "\n      "   +
                        "},"                                                                  + "\n\n      " +
                        "{"                                                                   + "\n        " +
                           "test: /\\.(ttf|eot|svg)$/,"                                       + "\n        " +
                           "loader: 'file-loader'"                                            + "\n      "   +
                         "},"                                                                 + "\n\n      " +
                        "{"                                                                   + "\n        " +
                           "test: /\\.woff2?$/,"                                              + "\n        " +
                           "loader: 'url-loader?limit=10000&minetype=application/font-woff'"  + "\n      "   +
                         "},"                                                                 + "\n"
}
