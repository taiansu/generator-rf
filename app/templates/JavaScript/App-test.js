jest.dontMock('../App.js');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var App = require('../App.js');

describe('App', function () {
  it('generate appName in <h1>', function () {
    var app = TestUtils.renderIntoDocument(<App />);
    var title = TestUtils.findRenderedDOMComponentWithTag(app, 'h1');
    expect(title.getDOMNode().textContent).toEqual('<%= appName %>');
  });
});
