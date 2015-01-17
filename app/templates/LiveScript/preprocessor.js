var ReactTools = require('react-tools');
var cjsx = require('coffee-react-transform');
var dialect = require('LiveScript');

module.exports = {
  process: function(src, path) {
    if (path.match(/\.ls$/)) {
      return dialect.compile(cjsx(src), {bare: true})
    } else {
      return ReactTools.transform(src);
    }
  }
};
