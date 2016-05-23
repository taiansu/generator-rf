var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    app: [
      "./src/scripts/main<%= scriptSuffix %>"
    ]
  },
  output: {
    path: "./build",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    modulesDirectories: ['node_modules'],
  },
  module: {
    loaders: [
      {
        test: /\<%= dialectTest %>$/,
        loader: "<%= dialectLoader %>",
        query: {
          presets: [<%= dialectPresets %>]
        },
        exclude: [ path.resolve(__dirname, "node_modules") ]
      },

      {
        test: /\<%= stylesheetSuffix %>$/,
        loader: "<%= stylesheetLoader %>"
      },

      <%= bootstrapLoaders %>
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      },

      {
        test: /\.html$/,
        loader: "file?name=[path][name].[ext]&context=./src"
      }
    ]
  }
};
