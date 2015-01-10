React = require('react')

APP = React.createClass do
  render: ->
    codeBlockStyle =
      "fontFamily": "monospace"
      "backgroundColor": "\#D0D0D0"

    <div>
      <header>
        <h1><%= appname %></h1>
        <h3><%= description %></h3>
      </header>
      <article className="context">
        <p>
          Greeting form <a href="https://github.com/taiansu/generator-rf">RF generator</a>.
        </p>

        <p>
          Remember you are powered with <a href="https://gaearon.github.io/react-hot-loader/">react-hot-loader</a> now. Edit this file in <span style={ codeBlockStyle }>src/scripts/components/App.ls</span> and save it, it will auto reload the page for you.
        </p>
      </article>
    </div>

module.exports = APP

