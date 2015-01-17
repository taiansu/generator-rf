var ReactTools = require('react-tools');
var cjsx = require('coffee-react-transform');
var dialect = require('coffee-script');

module.exports = {
  process: function(src, path) {
    if (path.match(/\.coffee$/)) {
      return dialect.compile(cjsx(src), {bare: true})
    } else {
      return ReactTools.transform(src);
    }
  }
};
