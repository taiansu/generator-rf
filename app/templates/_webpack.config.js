module.exports = {
  entry: {
    app: ["webpack/hot/dev-server", "./src/scripts/main<%= scriptSuffix %>"]
  },
  output: {
    path: "./build",
    filename: "bundle.js"
  },
  plugins: [],
  resolve: {
    modulesDirectories: ['node_modules'],
  },
  module: {
    loaders: [
      { test: /\<%= dialectTest %>$/, loader: "<%= dialectLoader %>" },

      {
        test: /\<%= stylesheetSuffix %>$/,
        loader: "<%= stylesheetLoader %>"
      },

      {
        test: /\.(html|png)$/,
        loader: "file?name=[path][name].[ext]&context=./src"
      }
    ]
  }
};
