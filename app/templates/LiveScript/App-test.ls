jest.dontMock '../App.ls'

React = require('react/addons')
TestUtils = React.addons.TestUtils
App = require('../App.ls')

let test = it
  describe 'App', ->
    test 'generate appname in <h1>',  ->
      app = TestUtils.renderIntoDocument <App />
      title = TestUtils.findRenderedDOMComponentWithTag(app, 'h1')
      expect(title.getDOMNode().textContent).toEqual('<%= appname %>')
