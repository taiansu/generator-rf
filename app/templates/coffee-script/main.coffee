require('../index.html')
require('../assets/stylesheets/style<%= stylesheetSuffix %>')

# Require assets here.
# require('../assets/product.png')

APP = require('./components/App.coffee')
React = require('react')

React.render(<APP />, document.getElementById('main'))
