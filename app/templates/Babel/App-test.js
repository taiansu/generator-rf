jest.dontMock('../App.js');

var React = require('react/addons');
const {TestUtils} = React.addons;
var App = require('../App.js');

describe('App', () => {
  it('generate appname in <h1>', () => {
    var app = TestUtils.renderIntoDocument(<App />);
    var title = TestUtils.findRenderedDOMComponentWithTag(app, 'h1');
    expect(title.getDOMNode().textContent).toEqual('<%= appname %>');
  });
});
