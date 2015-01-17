jest.dontMock('../App.js');

import React from 'react/addons';
const {TestUtils} = React.addons;
import App from '../App.js';

describe('App', function () {
  it('generate appname in <h1>', function () {
    var app = TestUtils.renderIntoDocument(<App />);
    var title = TestUtils.findRenderedDOMComponentWithTag(app, 'h1');
    expect(title.getDOMNode().textContent).toEqual('<%= appname %>');
  });
});
