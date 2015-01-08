var React = require('react');

APP = React.createClass({
  render: function(){
    return (
      <div>
        <header>
          <h1><%= appname %></h1>
          <h3><%= description %></h3>
        </header>
        <p style={{'fontSize': 16}}>
        Greeting form <a href='https://github.com/taiansu/generator-rf'>RF generator</a>. You're powered with <a href='https://gaearon.github.io/react-hot-loader/'>react-hot-loader</a>. Edit this file in <span style={{ "fontFamily": "monospaced;", "backgroundColor": "#D0D0D0" }}> src/scripts/components/App<%= scriptSuffix %> </span> and save it.
        </p>
      </div>
    );
  }
});

module.exports = APP

