<%= withBootstrap ? "require('bootstrap-webpack');" : "" %>
require('../assets/stylesheets/style<%= stylesheetSuffix %>');

// TODO: Require assets here.
// require('../assets/images/product.png');

var App = require('./components/App.js');
var ReactDom = require('react-dom');

ReactDom.render(<App />, document.getElementById('main'));
