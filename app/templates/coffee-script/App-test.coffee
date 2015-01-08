jest.dontMock '../App.coffee'

React = require('react/addons')
TestUtils = React.addons.TestUtils
App = require('../App.coffee')

describe 'App', ->
  it 'generate appName in <h1>',  ->
    app = TestUtils.renderIntoDocument <App />
    title = TestUtils.findRenderedDOMComponentWithTag(app, 'h1')
    expect(title.getDOMNode().textContent).toEqual('<%= appName %>')
