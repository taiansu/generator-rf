<%= withBootstrap ? "require('bootstrap-webpack')" : "" %>
require('../assets/stylesheets/style<%= stylesheetSuffix %>')

# Require assets here.
# require('../assets/images/product.png')

App = require('./components/App.coffee')
React = require('react')

React.render(<App />, document.getElementById('main'))
