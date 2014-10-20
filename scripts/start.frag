((function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['react', 'cursors'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('react'), require('cursors'));
  } else {
    root.former = factory(root.React, root.Cursors);
  }
})(this, function (React, Cursors) {
  return (function () {
