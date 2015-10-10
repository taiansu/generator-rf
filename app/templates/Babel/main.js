<%= withBootstrap ? "require('bootstrap-webpack');" : "" %>
require('../assets/stylesheets/style<%= stylesheetSuffix %>');

// TODO: Require assets here.
// require('../assets/images/product.png');

import App from './components/App.js';
import ReactDom from 'react-dom';

ReactDom.render(<App />, document.getElementById('main'));
