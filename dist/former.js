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

// scripts/underscore.es6
define(
  'underscore', ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = _;
  });

// scripts/cursors.es6
define(
  'cursors', ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Cursors;
  });

// scripts/react.es6
define(
  'react', ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = React;
  });

// scripts/components/element.es6.jsx
define(
  'components/element', ["cursors","react","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Cursors = __dependency1__["default"] || __dependency1__;
    var React = __dependency2__["default"] || __dependency2__;

    __exports__["default"] = React.createClass({
      mixins: [Cursors],

      getClassName: function () {
        var classes = ['form'];
        if (this.props.required) classes.push('required');
        return classes.join(' ');
      },

      renderNote: function () {
        if (this.props.note) return React.createElement("p", {className: "note"}, this.props.note);
      },

      renderLabel: function () {
        if (this.props.label) return React.createElement("dt", null, React.createElement("label", null, this.props.label));
      },

      renderError: function () {
        var error = this.props.error;
        if (error) return React.createElement("div", {className: "error"}, error);
      },

      render: function () {
        return (
          React.createElement("dl", {className: this.getClassName()}, 
            this.renderLabel(), 
            this.renderNote(), 
            this.renderError(), 
            React.createElement("dd", null, this.props.children)
          )
        );
      }
    });
  });

// scripts/mixins/value-bind.es6
define(
  'mixins/value-bind', ["underscore","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var _ = __dependency1__["default"] || __dependency1__;

    __exports__["default"] = {
      componentDidMount: function () {
        var deltas = {};
        if (_.has(this.props, 'value')) deltas.value = {$set: this.props.value};
        if (_.has(this.props, 'error')) deltas.error = {$set: this.props.error};
        this.update(deltas);
      },

      handleValueChange: function (ev) {
        this.update({value: {$set: ev.target.value}});
      },

      handleCheckedChange: function (ev) {
        this.update({value: {$set: ev.target.checked}});
      }
    };
  });

// scripts/components/basic-input.es6.jsx
define(
  'components/basic-input', ["underscore","cursors","components/element","react","mixins/value-bind","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    "use strict";
    var _ = __dependency1__["default"] || __dependency1__;
    var Cursors = __dependency2__["default"] || __dependency2__;
    var Element = __dependency3__["default"] || __dependency3__;
    var React = __dependency4__["default"] || __dependency4__;
    var ValueBind = __dependency5__["default"] || __dependency5__;

    __exports__["default"] = React.createClass({
      mixins: [Cursors, ValueBind],

      getClassName: function () {
        var classes = [];
        if (this.state.error) classes.push('input-error');
        if (this.props.className) classes.join(this.props.className);
        return classes.join(' ');
      },

      render: function() {
        return (
          React.createElement(Element, {
            label: this.props.label, 
            note: this.props.note, 
            error: this.state.error, 
            required: this.props.required, 
            className: this.getClassName
          }, 
            React.createElement("input", React.__spread({}, 
              _.omit(this.props, 'label', 'note', 'className'), 
              {value: this.state.value, 
              onChange: this.handleValueChange})
            )
          )
        );
      }
    });
  });

// scripts/components/checkbox-input.es6.jsx
define(
  'components/checkbox-input', ["cursors","react","mixins/value-bind","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var Cursors = __dependency1__["default"] || __dependency1__;
    var React = __dependency2__["default"] || __dependency2__;
    var ValueBind = __dependency3__["default"] || __dependency3__;

    __exports__["default"] = React.createClass({
      mixins: [Cursors, ValueBind],

      render: function () {
        return (
          React.createElement("div", {className: "form-checkbox"}, 
            React.createElement("label", null, 
              React.createElement("input", {
                name: this.props.name, 
                type: "checkbox", 
                value: this.props.value, 
                checked: this.state.value, 
                onChange: this.handleCheckedChange}
              ), 
              this.props.label
            ), 
            this.props.note ? React.createElement("p", {className: "note"}, this.props.note) : null
          )
        );
      }
    });
  });

// scripts/components/email-input.es6.jsx
define(
  'components/email-input', ["components/basic-input","cursors","react","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var BasicInput = __dependency1__["default"] || __dependency1__;
    var Cursors = __dependency2__["default"] || __dependency2__;
    var React = __dependency3__["default"] || __dependency3__;

    __exports__["default"] = React.createClass({
      mixins: [Cursors],

      render: function () {
        return React.createElement(BasicInput, React.__spread({},  this.props, {type: "email"}));
      }
    });
  });

// scripts/components/form.es6.jsx
define(
  'components/form', ["underscore","cursors","react","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var _ = __dependency1__["default"] || __dependency1__;
    var Cursors = __dependency2__["default"] || __dependency2__;
    var React = __dependency3__["default"] || __dependency3__;

    var cloneWithProps = React.addons.cloneWithProps;

    var getPathFromName = function (name) {
      return _.compact(name.split(/\[|]\[|]/));
    };

    __exports__["default"] = React.createClass({
      mixins: [Cursors],

      getInitialState: function () {
        return {
          value: {},
          error: {}
        };
      },

      ensurePath: function (key, path) {
        var cursors = this.props.cursors || {};
        var state = cursors[key] ? cursors[key].root.state : this.state;
        path = [key].concat(path);
        while (path.length > 1) {
          key = path.shift();
          state = state[key] || (state[key] = {});
        }
      },

      renderChild: function (component) {
        var props = component && component.props;
        if (!props) return component;
        var cursors = props.cursors;
        if (_.has(props, 'name')) {
          var path = getPathFromName(props.name);
          this.ensurePath('value', path);
          this.ensurePath('error', path);
          cursors = _.extend({}, cursors, {
            value: this.getCursor('value', path),
            error: this.getCursor('error', path)
          });
        }
        return cloneWithProps(component, {
          children: this.renderChildren(component),
          cursors: cursors,
          key: component.key || void 0,
          ref: component.ref || void 0
        });
      },

      renderChildren: function (component) {
        if (!component.props) return component;
        return React.Children.map(component.props.children, this.renderChild);
      },

      render: function () {
        return (
          React.createElement("form", React.__spread({},  this.props), 
            this.renderChildren(this)
          )
        );
      }
    });
  });

// scripts/components/number-input.es6.jsx
define(
  'components/number-input', ["components/basic-input","cursors","react","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var BasicInput = __dependency1__["default"] || __dependency1__;
    var Cursors = __dependency2__["default"] || __dependency2__;
    var React = __dependency3__["default"] || __dependency3__;

    __exports__["default"] = React.createClass({
      mixins: [Cursors],

      render: function () {
        return React.createElement(BasicInput, React.__spread({},  this.props, {type: "number"}));
      }
    });
  });

// scripts/components/password-input.es6.jsx
define(
  'components/password-input', ["components/basic-input","cursors","react","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var BasicInput = __dependency1__["default"] || __dependency1__;
    var Cursors = __dependency2__["default"] || __dependency2__;
    var React = __dependency3__["default"] || __dependency3__;

    __exports__["default"] = React.createClass({
      mixins: [Cursors],

      render: function () {
        return React.createElement(BasicInput, React.__spread({},  this.props, {type: "password"}));
      }
    });
  });

// scripts/components/phone-input.es6.jsx
define(
  'components/phone-input', ["components/basic-input","cursors","react","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var BasicInput = __dependency1__["default"] || __dependency1__;
    var Cursors = __dependency2__["default"] || __dependency2__;
    var React = __dependency3__["default"] || __dependency3__;

    __exports__["default"] = React.createClass({
      mixins: [Cursors],

      render: function () {
        return React.createElement(BasicInput, React.__spread({},  this.props, {type: "tel"}));
      }
    });
  });

// scripts/components/question-group.es6.jsx
define(
  'components/question-group', ["cursors","components/element","react","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var Cursors = __dependency1__["default"] || __dependency1__;
    var Element = __dependency2__["default"] || __dependency2__;
    var React = __dependency3__["default"] || __dependency3__;

    __exports__["default"] = React.createClass({
      mixins: [Cursors],

      render: function(){
        return(
          React.createElement(Element, {
            label: this.props.question, 
            note: this.props.note, 
            className: "form-checkbox", 
            required: this.props.required
          }, 
            this.props.children
          )
        );
      }
    });
  });

// scripts/components/radio-input.es6.jsx
define(
  'components/radio-input', ["underscore","cursors","components/element","react","mixins/value-bind","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    "use strict";
    var _ = __dependency1__["default"] || __dependency1__;
    var Cursors = __dependency2__["default"] || __dependency2__;
    var Element = __dependency3__["default"] || __dependency3__;
    var React = __dependency4__["default"] || __dependency4__;
    var ValueBind = __dependency5__["default"] || __dependency5__;

    __exports__["default"] = React.createClass({
      mixins: [Cursors, ValueBind],

      renderOption: function (data, value) {
        var checked = this.state.value === value;
        return (
          React.createElement("div", {key: value, className: "form-checkbox"}, 
            React.createElement("label", null, 
              React.createElement("input", {
                name: this.props.name, 
                type: "radio", 
                value: value, 
                checked: checked, 
                onChange: this.handleValueChange}
              ), 
              data.label
            ), 
            data.note ? React.createElement("p", {className: "note"}, data.note) : null
          )
        );
      },

      renderOptions: function () {
        return _.map(this.props.options, this.renderOption);
      },

      render: function () {
        return (
          React.createElement(Element, {
            label: this.props.label, 
            note: this.props.note, 
            required: this.props.required
          }, 
            this.renderOptions()
          )
        );
      }
    });
  });

// scripts/components/select-input.es6.jsx
define(
  'components/select-input', ["underscore","cursors","components/element","react","mixins/value-bind","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    "use strict";
    var _ = __dependency1__["default"] || __dependency1__;
    var Cursors = __dependency2__["default"] || __dependency2__;
    var Element = __dependency3__["default"] || __dependency3__;
    var React = __dependency4__["default"] || __dependency4__;
    var ValueBind = __dependency5__["default"] || __dependency5__;

    __exports__["default"] = React.createClass({
      mixins: [Cursors, ValueBind],

      renderOption: function (label, value) {
        return React.createElement("option", {key: value, value: value}, label);
      },

      renderOptions: function () {
        return _.map(this.props.options, this.renderOption);
      },

      render: function () {
        return (
          React.createElement(Element, {
            label: this.props.label, 
            note: this.props.note, 
            required: this.props.required
          }, 
            React.createElement("select", React.__spread({}, 
              _.omit(this.props, 'label'), 
              {value: this.state.value, 
              onChange: this.handleValueChange
            }), 
              this.renderOptions()
            )
          )
        );
      }
    });
  });

// scripts/components/submit.es6.jsx
define(
  'components/submit', ["cursors","react","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Cursors = __dependency1__["default"] || __dependency1__;
    var React = __dependency2__["default"] || __dependency2__;

    __exports__["default"] = React.createClass({
      mixins: [Cursors],

      render: function () {
        return React.createElement("input", React.__spread({type: "submit"},  this.props));
      }
    });
  });

// scripts/components/text-area.es6.jsx
define(
  'components/text-area', ["underscore","cursors","components/element","react","mixins/value-bind","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    "use strict";
    var _ = __dependency1__["default"] || __dependency1__;
    var Cursors = __dependency2__["default"] || __dependency2__;
    var Element = __dependency3__["default"] || __dependency3__;
    var React = __dependency4__["default"] || __dependency4__;
    var ValueBind = __dependency5__["default"] || __dependency5__;

    __exports__["default"] = React.createClass({
      mixins: [Cursors, ValueBind],

      render: function () {
        return (
          React.createElement(Element, {
            label: this.props.label, 
            note: this.props.note, 
            required: this.props.required
          }, 
            React.createElement("textarea", React.__spread({}, 
              _.omit(this.props, 'label'), 
              {value: this.state.value, 
              onChange: this.handleValueChange})
            )
          )
        );
      }
    });
  });

// scripts/components/text-input.es6.jsx
define(
  'components/text-input', ["components/basic-input","cursors","react","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var BasicInput = __dependency1__["default"] || __dependency1__;
    var Cursors = __dependency2__["default"] || __dependency2__;
    var React = __dependency3__["default"] || __dependency3__;

    __exports__["default"] = React.createClass({
      mixins: [Cursors],

      render: function () {
        return React.createElement(BasicInput, React.__spread({},  this.props, {type: "text"}));
      }
    });
  });

// scripts/components/url-input.es6.jsx
define(
  'components/url-input', ["components/basic-input","cursors","react","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var BasicInput = __dependency1__["default"] || __dependency1__;
    var Cursors = __dependency2__["default"] || __dependency2__;
    var React = __dependency3__["default"] || __dependency3__;

    __exports__["default"] = React.createClass({
      mixins: [Cursors],

      render: function () {
        return React.createElement(BasicInput, React.__spread({},  this.props, {type: "url"}));
      }
    });
  });

// scripts/former.es6
define(
  'former', ["components/basic-input","components/checkbox-input","components/element","components/email-input","components/form","components/number-input","components/password-input","components/phone-input","components/question-group","components/radio-input","components/select-input","components/submit","components/text-area","components/text-input","components/url-input","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __dependency8__, __dependency9__, __dependency10__, __dependency11__, __dependency12__, __dependency13__, __dependency14__, __dependency15__, __exports__) {
    "use strict";






    var BasicInput = __dependency1__["default"] || __dependency1__;
    var CheckboxInput = __dependency2__["default"] || __dependency2__;
    var Element = __dependency3__["default"] || __dependency3__;
    var EmailInput = __dependency4__["default"] || __dependency4__;
    var Form = __dependency5__["default"] || __dependency5__;
    var NumberInput = __dependency6__["default"] || __dependency6__;
    var PasswordInput = __dependency7__["default"] || __dependency7__;
    var PhoneInput = __dependency8__["default"] || __dependency8__;
    var QuestionGroup = __dependency9__["default"] || __dependency9__;
    var RadioInput = __dependency10__["default"] || __dependency10__;
    var SelectInput = __dependency11__["default"] || __dependency11__;
    var Submit = __dependency12__["default"] || __dependency12__;
    var TextArea = __dependency13__["default"] || __dependency13__;
    var TextInput = __dependency14__["default"] || __dependency14__;
    var UrlInput = __dependency15__["default"] || __dependency15__;

    __exports__.BasicInput = BasicInput;
    __exports__.CheckboxInput = CheckboxInput;
    __exports__.Element = Element;
    __exports__.EmailInput = EmailInput;
    __exports__.Form = Form;
    __exports__.NumberInput = NumberInput;
    __exports__.PasswordInput = PasswordInput;
    __exports__.PhoneInput = PhoneInput;
    __exports__.QuestionGroup = QuestionGroup;
    __exports__.RadioInput = RadioInput;
    __exports__.SelectInput = SelectInput;
    __exports__.Submit = Submit;
    __exports__.TextArea = TextArea;
    __exports__.TextInput = TextInput;
    __exports__.UrlInput = UrlInput;
  });

return require('former');
}));