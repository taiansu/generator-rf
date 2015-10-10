<%= withBootstrap ? "require('bootstrap-webpack')" : "" %>
require('../assets/stylesheets/style<%= stylesheetSuffix %>')

# TODO: Require assets here.
# require('../assets/images/product.png')

App = require('./components/App.ls')
React = require('react')
ReactDom = require('react-dom')

ReactDom.render(<App />, document.getElementById('main'))
