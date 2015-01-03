var ReactTools = require('react-tools');
<% if ( dialect !== 'JavaScript' ) { %>
var cjsx = require('coffee-react-transform');
var dialect = require('<%= dialect %>');
<% } %>

module.exports = {
  process: function(src, path) {
    <% if ( dialect !== 'JavaScript' ) { %>
    if (path.match(/\<%= scriptSuffix %>$/)) {
      return dialect.compile(cjsx(src), {bare: true})
    } else {
      return ReactTools.transform(src);
    }
    <% } else { %>
    return ReactTools.transform(src);
    <% } %>
  }
};
