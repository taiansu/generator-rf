module.exports = {
  get: function (dialectOrStylesheet) {
    var key = dialectOrStylesheet.replace(/-/, '') + "Loader";
    // return an empty string if this[key] not exist
    return this[key] || '';
  },

  coffeescriptLoader:   'react-hot!coffee!cjsx',
  JavaScriptLoader:     'react-hot!jsx',
  BabelLoader:          'react-hot!babel',
  LiveScriptLoader:     'react-hot!livescript!cjsx',
  CSSLoader:            'style!css',
  LessLoader:           'style!css!less',
  StylusLoader:         'style!css!stylus',
  SASSLoader:           'style!css!sass?indentedSyntax=true&outputStyle=expanded',
  SCSSLoader:           'style!css!sass?outputStyle=expanded',
  // Different from other, fetch this directly.
  BootstrapLoaders:     "{"                                                                   + "\n        " +
                           "test: /bootstrap\\/js\\//,"                                       + "\n        " +
                           "loader: 'imports?jQuery=jquery'"                                  + "\n      "   +
                        "},"                                                                 + "\n\n      " +
                        "{"                                                                   + "\n        " +
                           "test: /\\.(ttf|eot|svg)$/,"                                       + "\n        " +
                           "loader: 'file-loader'"                                            + "\n      "   +
                         "},"                                                                 + "\n\n      " +
                        "{"                                                                   + "\n        " +
                           "test: /\\.woff2?$/,"                                              + "\n        " +
                           "loader: 'url-loader?limit=10000&minetype=application/font-woff'"  + "\n      "   +
                         "},"                                                                 + "\n"
}
