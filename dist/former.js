((function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['react', 'cursors'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('react'), require('cursors'));
  } else {
    root.former = factory(root.React, root.Cursors);
  }
})(this, function (React, Cursors) {
// bower_components/amdainty/amdainty.js
var define;
var require;

(function () {
  'use strict';

  // Store modules in an object.
  var mods = {};

  // Define just adds to the module storage.
  define = function (name, deps, cb) {
    if (!cb) {
      cb = deps;
      deps = ['require', 'exports', 'module'];
    }
    mods[name] = {isResolved: false, deps: deps, exports: {}, cb: cb};
  };

  // Fool the masses.
  define.amd = {};

  // Require the given module, recursively resolving dependencies as
  // necessary.
  require = function (name, requester) {

    // Special cases...
    if (name === 'require') return require;
    if (name === 'exports') return mods[requester].exports;
    if (name === 'module') return mods[requester];

    // Pull the module from the storage object.
    var mod = mods[name];
    if (!mod) throw new Error("Cannot find module '" + name + "'");

    // Return immediately if the module has already been resolved.
    if (mod.isResolved) return mod.exports;

    // Otherwise, resolve all dependencies.
    mod.isResolved = true;
    var deps = mod.deps || [];
    for (var i = 0, l = deps.length; i < l; ++i) {
      deps[i] = require(deps[i], name);
    }
    var val =
      typeof mod.cb === 'function' ?
      mod.cb.apply(mod.exports, deps) :
      mod.cb;

    // Delete obsolete variables.
    delete mod.cb;
    delete mod.deps;

    // Finally, return the module's return value, or fallback to exports.
    if (val !== undefined) mod.exports = val;
    return mod.exports;
  };

  // Require will always be defined as a special module.
  mods.require = {
    isResolved: true,
    exports: require
  };
})();

// scripts/react.es6
define(
  'react', ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = React;
  });

// scripts/former.es6
define(
  'former', ["react"],
  function(__dependency1__) {
    "use strict";





    var React = __dependency1__["default"] || __dependency1__;
  });

return require('former');
}));