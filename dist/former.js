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

// scripts/underscore.es6
define(
  'underscore', ["exports"],
  function(__exports__) {
    "use strict";
    if (!Object.assign) Object.assign = _.extend;

    __exports__["default"] = _;
  });

// scripts/form.es6.jsx
define(
  'form', ["underscore","react","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var _ = __dependency1__["default"] || __dependency1__;
    var React = __dependency2__["default"] || __dependency2__;

    var Form = React.createClass({displayName: 'Form',
      render: function() {
        return(
          React.DOM.form({action: this.props.action}, 
            this.props.children
          )
        );
      }
    });

    var Submit = React.createClass({displayName: 'Submit',
      render: function() {
        return(
          React.DOM.input(Object.assign({type: "submit"}, this.props))
        );
      }
    });

    var ElementWrapper = React.createClass({displayName: 'ElementWrapper',
      renderNote: function(){
        if(this.props.note) return React.DOM.p({className: "note"}, this.props.note);
      },

      render: function() {
        var classes = 'form ' + this.props.className;
        return(
          React.DOM.dl({className: classes}, 
            React.DOM.dt(null, React.DOM.label(null, this.props.label)), 
            this.renderNote(), 
            React.DOM.dd(null, this.props.children)
          )
        );
      }
    });

    var BasicInput = React.createClass({displayName: 'BasicInput',
      render: function() {
        var requiredClass = this.props.required ? 'required' : '';
        return (
          ElementWrapper({
            label: this.props.label, 
            note: this.props.note, 
            className: requiredClass}, 
            React.DOM.input(Object.assign({}, _.omit(this.props, 'label')))
          )
        );
      }
    });

    var TextArea = React.createClass({displayName: 'TextArea',

      render: function() {
        return(
          ElementWrapper({label: this.props.label}, 
            React.DOM.textarea(Object.assign({}, _.omit(this.props, 'label')))
          )
        );
      }
    });

    var SelectInput = React.createClass({displayName: 'SelectInput',
      render: function(){
        return (
          ElementWrapper({label: this.props.label}, 
            React.DOM.select(Object.assign({}, _.omit(this.props, 'label')), 
              this.props.children
            )
          )
        );
      }
    });

    var CheckboxInput = React.createClass({displayName: 'CheckboxInput',
      render: function (){
        return(
          React.DOM.div({className: "form-checkbox"}, 
            React.DOM.label(null, 
              React.DOM.input(Object.assign({
                type: "checkbox"}, _.omit(this.props, 'label'))), 
              this.props.label
            )
          )
        );
      }
    });

    var RadioInput = React.createClass({displayName: 'RadioInput',
      render: function (){
        return(
          React.DOM.div({className: "form-checkbox"}, 
            React.DOM.label(null, 
              React.DOM.input(Object.assign({
                type: "radio"}, _.omit(this.props, 'label'))), 
              this.props.label
            )
          )
        );
      }
    });

    var QuestionGroup = React.createClass({displayName: 'QuestionGroup',
      render: function(){
        var requiredClass = this.props.required ? 'required' : '';
        return(
          ElementWrapper({
            label: this.props.question, 
            note: this.props.note, 
            className: requiredClass}, 
            this.props.children
          )
        );
      }
    });

    var TextInput = React.createClass({displayName: 'TextInput',
      render: function() {
        return BasicInput(Object.assign({type: "text"}, this.props));
      }
    });

    var NumberInput = React.createClass({displayName: 'NumberInput',
      render: function() {
        return BasicInput(Object.assign({type: "number"}, this.props));
      }
    });

    var UrlInput = React.createClass({displayName: 'UrlInput',
      render: function() {
        return BasicInput(Object.assign({type: "url"}, this.props));
      }
    });

    var PasswordInput = React.createClass({displayName: 'PasswordInput',
      render: function() {
        return BasicInput(Object.assign({type: "password"}, this.props));
      }
    });

    var PhoneInput = React.createClass({displayName: 'PhoneInput',
      render: function() {
        return BasicInput(Object.assign({type: "tel"}, this.props));
      }
    });

    var EmailInput = React.createClass({displayName: 'EmailInput',
      render: function() {
        return BasicInput(Object.assign({type: "email"}, this.props));
      }
    });


    __exports__["default"] = React.createClass({
      render: function () {
        return (
          Form(null, 
            React.DOM.h1(null, "Sample Form"), 
            TextInput({label: "Text Input", size: "50"}), 
            TextInput({label: "Text Input with Placeholder", placeholder: "this is some text"}), 
            TextInput({label: "Disabled Text Input", disabled: true}), 
            TextInput({label: "Required Text Input", required: true}), 

            NumberInput({label: "Number Input", note: "pick something awesome"}), 

            UrlInput({label: "Url Input"}), 
            PasswordInput({label: "Password Input"}), 
            PhoneInput({label: "Phone Input"}), 
            EmailInput({label: "Email Input", placeholder: "tyler@orgsync.com"}), 

            TextArea({label: "Text Area"}), 

            React.DOM.hr(null), 

            SelectInput({
              value: "2", 
              label: "Pick a version"}, 
              React.DOM.option({value: "1"}, "alpha"), 
              React.DOM.option({value: "2"}, "beta"), 
              React.DOM.option({value: "3"}, "gamma")
            ), 

            React.DOM.hr(null), 

            QuestionGroup({
              question: "Pick your favorite color?", 
              note: "pick one or many"}, 
              CheckboxInput({name: "color", label: "blue"}), 
              CheckboxInput({name: "color", label: "red"})
            ), 

            React.DOM.hr(null), 

            RadioInput({label: "Single Radio"}), 
            CheckboxInput({label: "Single Checkbox"}), 

            React.DOM.hr(null), 

            QuestionGroup({
              question: "do you agree to this?", 
              required: "true"}, 
              RadioInput({name: "agreement", label: "Yes"}), 
              RadioInput({name: "agreement", label: "No"})
            ), 

            Submit(null)
          )
        );
      }
    });
  });

// scripts/former.es6
define(
  'former', ["react","form","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";





    var React = __dependency1__["default"] || __dependency1__;
    var Form = __dependency2__["default"] || __dependency2__;

    var Form = Form;
    __exports__.Form = Form;
  });

return require('former');
}));