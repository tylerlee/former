((function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'react', 'cursors'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(
      require('underscore'),
      require('react'),
      require('cursors')
    );
  } else {
    root.Former = factory(root._, root.React, root.Cursors);
  }
})(this, function (_, React, Cursors) {
