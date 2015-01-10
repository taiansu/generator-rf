require('../index.html');
require('../assets/stylesheets/style<%= stylesheetSuffix %>');

// TODO: Require assets here.
// require('../assets/product.png');

var APP = require('./components/App.js');
var React = require('react');

React.render(<APP />, document.getElementById('main'));
