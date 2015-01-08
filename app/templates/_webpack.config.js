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
            <% if ( dialect == 'LiveScript') { %>
            { test: /\.ls$/, loader: "livescript!cjsx" },
            <% } else if ( dialect =='JavaScript') { %>
            { test: /\.jsx?$/, loader: "jsx" },
            <% } else { %>
            { test: /\.coffee$/, loader: "coffee!cjsx" },
            <% } %>

            <% if ( stylesheetSyntax === 'CSS' ) { %>
            { test: /\.css$/, loader: "style!css" },
            <% } else if ( stylesheetSyntax === 'SCSS') { %>
            {
              test: /\.scss$/,
              loader: "style!css!sass?outputStyle=expanded"
            },
            <% } else { %>
            {
              test: /\.sass$/,
              loader: "style!css!sass?indentedSyntax=true&outputStyle=expanded"
            },
            <% } %>

            {
              test: /\.(html|png)$/,
              loader: "file?name=[path][name].[ext]&context=./src"
            }
        ]
    }
};

