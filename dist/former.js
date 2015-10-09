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
})();
define('underscore', ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = _;
});
define('cursors', ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = Cursors;
});
define('react', ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = React;
});
define('components/element', ['exports', 'module', 'cursors', 'react'], function (exports, module, _cursors, _react) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Cursors = _interopRequireDefault(_cursors);

  var _React = _interopRequireDefault(_react);

  module.exports = _React['default'].createClass({
    displayName: 'element',

    mixins: [_Cursors['default']],

    getClassName: function getClassName() {
      var classes = ['form'];
      if (this.props.required) classes.push('required');
      return classes.join(' ');
    },

    renderNote: function renderNote() {
      if (this.props.note) return _React['default'].createElement(
        'p',
        { className: 'note' },
        this.props.note
      );
    },

    renderLabel: function renderLabel() {
      if (this.props.label) return _React['default'].createElement(
        'dt',
        null,
        _React['default'].createElement(
          'label',
          null,
          this.props.label
        )
      );
    },

    renderError: function renderError() {
      var error = this.props.error;
      if (error) return _React['default'].createElement(
        'div',
        { className: 'error' },
        error
      );
    },

    render: function render() {
      return _React['default'].createElement(
        'dl',
        { className: this.getClassName() },
        this.renderLabel(),
        this.renderNote(),
        this.renderError(),
        _React['default'].createElement(
          'dd',
          null,
          this.props.children
        )
      );
    }
  });
});
define('mixins/value-bind', ['exports', 'module', 'underscore'], function (exports, module, _underscore) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _2 = _interopRequireDefault(_underscore);

  module.exports = {
    componentDidMount: function componentDidMount() {
      var deltas = {};
      if (_2['default'].has(this.props, 'value')) deltas.value = { $set: this.props.value };
      if (_2['default'].has(this.props, 'error')) deltas.error = { $set: this.props.error };
      this.update(deltas);
    },

    handleValueChange: function handleValueChange(ev) {
      this.update({ value: { $set: ev.target.value } });
    },

    handleCheckedChange: function handleCheckedChange(ev) {
      this.update({ value: { $set: ev.target.checked } });
    }
  };
});
define('components/basic-input', ['exports', 'module', 'underscore', 'cursors', 'components/element', 'react', 'mixins/value-bind'], function (exports, module, _underscore, _cursors, _componentsElement, _react, _mixinsValueBind) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _2 = _interopRequireDefault(_underscore);

  var _Cursors = _interopRequireDefault(_cursors);

  var _Element = _interopRequireDefault(_componentsElement);

  var _React = _interopRequireDefault(_react);

  var _ValueBind = _interopRequireDefault(_mixinsValueBind);

  module.exports = _React['default'].createClass({
    displayName: 'basic-input',

    mixins: [_Cursors['default'], _ValueBind['default']],

    getClassName: function getClassName() {
      var classes = [];
      if (this.state.error) classes.push('input-error');
      if (this.props.className) classes.join(this.props.className);
      return classes.join(' ');
    },

    render: function render() {
      return _React['default'].createElement(
        _Element['default'],
        {
          label: this.props.label,
          note: this.props.note,
          error: this.state.error,
          required: this.props.required,
          className: this.getClassName
        },
        _React['default'].createElement('input', _extends({}, _2['default'].omit(this.props, 'label', 'note', 'className'), {
          value: this.state.value,
          onChange: this.handleValueChange
        }))
      );
    }
  });
});
define('components/checkbox-input', ['exports', 'module', 'cursors', 'react', 'mixins/value-bind'], function (exports, module, _cursors, _react, _mixinsValueBind) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Cursors = _interopRequireDefault(_cursors);

  var _React = _interopRequireDefault(_react);

  var _ValueBind = _interopRequireDefault(_mixinsValueBind);

  module.exports = _React['default'].createClass({
    displayName: 'checkbox-input',

    mixins: [_Cursors['default'], _ValueBind['default']],

    render: function render() {
      return _React['default'].createElement(
        'div',
        { className: 'form-checkbox' },
        _React['default'].createElement(
          'label',
          null,
          _React['default'].createElement('input', {
            name: this.props.name,
            type: 'checkbox',
            value: this.props.value,
            checked: this.state.value,
            onChange: this.handleCheckedChange
          }),
          this.props.label
        ),
        this.props.note ? _React['default'].createElement(
          'p',
          { className: 'note' },
          this.props.note
        ) : null
      );
    }
  });
});
define('components/email-input', ['exports', 'module', 'components/basic-input', 'cursors', 'react'], function (exports, module, _componentsBasicInput, _cursors, _react) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _BasicInput = _interopRequireDefault(_componentsBasicInput);

  var _Cursors = _interopRequireDefault(_cursors);

  var _React = _interopRequireDefault(_react);

  module.exports = _React['default'].createClass({
    displayName: 'email-input',

    mixins: [_Cursors['default']],

    render: function render() {
      return _React['default'].createElement(_BasicInput['default'], _extends({}, this.props, { type: 'email' }));
    }
  });
});
define('components/file-input', ['exports', 'module', 'components/basic-input', 'cursors', 'react'], function (exports, module, _componentsBasicInput, _cursors, _react) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _BasicInput = _interopRequireDefault(_componentsBasicInput);

  var _Cursors = _interopRequireDefault(_cursors);

  var _React = _interopRequireDefault(_react);

  module.exports = _React['default'].createClass({
    displayName: 'file-input',

    mixins: [_Cursors['default']],

    render: function render() {
      return _React['default'].createElement(_BasicInput['default'], _extends({}, this.props, { type: 'file' }));
    }
  });
});
define('components/form', ['exports', 'module', 'underscore', 'cursors', 'react'], function (exports, module, _underscore, _cursors, _react) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _2 = _interopRequireDefault(_underscore);

  var _Cursors = _interopRequireDefault(_cursors);

  var _React = _interopRequireDefault(_react);

  var getPathFromName = function getPathFromName(name) {
    return _2['default'].compact(name.split(/\[|]\[|]/));
  };

  module.exports = _React['default'].createClass({
    displayName: 'form',

    mixins: [_Cursors['default']],

    getInitialState: function getInitialState() {
      return {
        value: {},
        error: {}
      };
    },

    ensurePath: function ensurePath(key, path) {
      var cursors = this.props.cursors || {};
      var state = cursors[key] ? cursors[key].root.state : this.state;
      path = [key].concat(path);
      while (path.length > 1) {
        key = path.shift();
        state = state[key] || (state[key] = {});
      }
    },

    renderChild: function renderChild(component) {
      var props = component && component.props;
      if (!props) return component;
      var cursors = props.cursors;
      if (_2['default'].has(props, 'name')) {
        var path = getPathFromName(props.name);
        this.ensurePath('value', path);
        this.ensurePath('error', path);
        cursors = _2['default'].extend({}, cursors, {
          value: this.getCursor('value', path),
          error: this.getCursor('error', path)
        });
      }
      return _React['default'].cloneElement(component, { cursors: cursors }, this.renderChildren(component));
    },

    renderChildren: function renderChildren(component) {
      if (!component.props) return component;
      return _React['default'].Children.map(component.props.children, this.renderChild);
    },

    render: function render() {
      return _React['default'].createElement(
        'form',
        this.props,
        this.renderChildren(this)
      );
    }
  });
});
define('components/number-input', ['exports', 'module', 'components/basic-input', 'cursors', 'react'], function (exports, module, _componentsBasicInput, _cursors, _react) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _BasicInput = _interopRequireDefault(_componentsBasicInput);

  var _Cursors = _interopRequireDefault(_cursors);

  var _React = _interopRequireDefault(_react);

  module.exports = _React['default'].createClass({
    displayName: 'number-input',

    mixins: [_Cursors['default']],

    render: function render() {
      return _React['default'].createElement(_BasicInput['default'], _extends({}, this.props, { type: 'number' }));
    }
  });
});
define('components/password-input', ['exports', 'module', 'components/basic-input', 'cursors', 'react'], function (exports, module, _componentsBasicInput, _cursors, _react) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _BasicInput = _interopRequireDefault(_componentsBasicInput);

  var _Cursors = _interopRequireDefault(_cursors);

  var _React = _interopRequireDefault(_react);

  module.exports = _React['default'].createClass({
    displayName: 'password-input',

    mixins: [_Cursors['default']],

    render: function render() {
      return _React['default'].createElement(_BasicInput['default'], _extends({}, this.props, { type: 'password' }));
    }
  });
});
define('components/phone-input', ['exports', 'module', 'components/basic-input', 'cursors', 'react'], function (exports, module, _componentsBasicInput, _cursors, _react) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _BasicInput = _interopRequireDefault(_componentsBasicInput);

  var _Cursors = _interopRequireDefault(_cursors);

  var _React = _interopRequireDefault(_react);

  module.exports = _React['default'].createClass({
    displayName: 'phone-input',

    mixins: [_Cursors['default']],

    render: function render() {
      return _React['default'].createElement(_BasicInput['default'], _extends({}, this.props, { type: 'tel' }));
    }
  });
});
define('components/question-group', ['exports', 'module', 'cursors', 'components/element', 'react'], function (exports, module, _cursors, _componentsElement, _react) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Cursors = _interopRequireDefault(_cursors);

  var _Element = _interopRequireDefault(_componentsElement);

  var _React = _interopRequireDefault(_react);

  module.exports = _React['default'].createClass({
    displayName: 'question-group',

    mixins: [_Cursors['default']],

    render: function render() {
      return _React['default'].createElement(
        _Element['default'],
        {
          label: this.props.question,
          note: this.props.note,
          className: 'form-checkbox',
          required: this.props.required
        },
        this.props.children
      );
    }
  });
});
define('components/radio-input', ['exports', 'module', 'underscore', 'cursors', 'components/element', 'react', 'mixins/value-bind'], function (exports, module, _underscore, _cursors, _componentsElement, _react, _mixinsValueBind) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _2 = _interopRequireDefault(_underscore);

  var _Cursors = _interopRequireDefault(_cursors);

  var _Element = _interopRequireDefault(_componentsElement);

  var _React = _interopRequireDefault(_react);

  var _ValueBind = _interopRequireDefault(_mixinsValueBind);

  module.exports = _React['default'].createClass({
    displayName: 'radio-input',

    mixins: [_Cursors['default'], _ValueBind['default']],

    renderOption: function renderOption(data, value) {
      var checked = this.state.value === value;
      return _React['default'].createElement(
        'div',
        { key: value, className: 'form-checkbox' },
        _React['default'].createElement(
          'label',
          null,
          _React['default'].createElement('input', {
            name: this.props.name,
            type: 'radio',
            value: value,
            checked: checked,
            onChange: this.handleValueChange
          }),
          data.label
        ),
        data.note ? _React['default'].createElement(
          'p',
          { className: 'note' },
          data.note
        ) : null
      );
    },

    renderOptions: function renderOptions() {
      return _2['default'].map(this.props.options, this.renderOption);
    },

    render: function render() {
      return _React['default'].createElement(
        _Element['default'],
        {
          label: this.props.label,
          note: this.props.note,
          required: this.props.required
        },
        this.renderOptions()
      );
    }
  });
});
define('components/select-input', ['exports', 'module', 'underscore', 'cursors', 'components/element', 'react', 'mixins/value-bind'], function (exports, module, _underscore, _cursors, _componentsElement, _react, _mixinsValueBind) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _2 = _interopRequireDefault(_underscore);

  var _Cursors = _interopRequireDefault(_cursors);

  var _Element = _interopRequireDefault(_componentsElement);

  var _React = _interopRequireDefault(_react);

  var _ValueBind = _interopRequireDefault(_mixinsValueBind);

  module.exports = _React['default'].createClass({
    displayName: 'select-input',

    mixins: [_Cursors['default'], _ValueBind['default']],

    renderOption: function renderOption(label, value) {
      return _React['default'].createElement(
        'option',
        { key: value, value: value },
        label
      );
    },

    renderOptions: function renderOptions() {
      return _2['default'].map(this.props.options, this.renderOption);
    },

    render: function render() {
      return _React['default'].createElement(
        _Element['default'],
        {
          label: this.props.label,
          note: this.props.note,
          required: this.props.required
        },
        _React['default'].createElement(
          'select',
          _extends({}, _2['default'].omit(this.props, 'label'), {
            value: this.state.value,
            onChange: this.handleValueChange
          }),
          this.renderOptions()
        )
      );
    }
  });
});
define('components/submit', ['exports', 'module', 'cursors', 'react'], function (exports, module, _cursors, _react) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Cursors = _interopRequireDefault(_cursors);

  var _React = _interopRequireDefault(_react);

  module.exports = _React['default'].createClass({
    displayName: 'submit',

    mixins: [_Cursors['default']],

    render: function render() {
      return _React['default'].createElement('input', _extends({ type: 'submit' }, this.props));
    }
  });
});
define('components/switch-input', ['exports', 'module', 'cursors', 'react', 'mixins/value-bind'], function (exports, module, _cursors, _react, _mixinsValueBind) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Cursors = _interopRequireDefault(_cursors);

  var _React = _interopRequireDefault(_react);

  var _ValueBind = _interopRequireDefault(_mixinsValueBind);

  module.exports = _React['default'].createClass({
    displayName: 'switch-input',

    mixins: [_Cursors['default'], _ValueBind['default']],

    getClassName: function getClassName() {
      var classes = ['former-switch'];
      if (this.state.value) classes.push('former-switch-active');
      return classes.join(' ');
    },

    render: function render() {
      return _React['default'].createElement(
        'div',
        { className: this.getClassName() },
        _React['default'].createElement(
          'label',
          null,
          this.props.label,
          _React['default'].createElement(
            'span',
            { className: 'former-switch-container' },
            _React['default'].createElement('input', {
              name: this.props.name,
              type: 'checkbox',
              value: this.props.value,
              checked: this.state.value,
              onChange: this.handleCheckedChange
            }),
            _React['default'].createElement('div', { className: 'former-switch-display' })
          )
        ),
        this.props.note ? _React['default'].createElement(
          'p',
          { className: 'note' },
          this.props.note
        ) : null
      );
    }
  });
});
define('components/text-area', ['exports', 'module', 'underscore', 'cursors', 'components/element', 'react', 'mixins/value-bind'], function (exports, module, _underscore, _cursors, _componentsElement, _react, _mixinsValueBind) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _2 = _interopRequireDefault(_underscore);

  var _Cursors = _interopRequireDefault(_cursors);

  var _Element = _interopRequireDefault(_componentsElement);

  var _React = _interopRequireDefault(_react);

  var _ValueBind = _interopRequireDefault(_mixinsValueBind);

  module.exports = _React['default'].createClass({
    displayName: 'text-area',

    mixins: [_Cursors['default'], _ValueBind['default']],

    render: function render() {
      return _React['default'].createElement(
        _Element['default'],
        {
          label: this.props.label,
          note: this.props.note,
          required: this.props.required
        },
        _React['default'].createElement('textarea', _extends({}, _2['default'].omit(this.props, 'label'), {
          value: this.state.value,
          onChange: this.handleValueChange
        }))
      );
    }
  });
});
define('components/text-input', ['exports', 'module', 'components/basic-input', 'cursors', 'react'], function (exports, module, _componentsBasicInput, _cursors, _react) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _BasicInput = _interopRequireDefault(_componentsBasicInput);

  var _Cursors = _interopRequireDefault(_cursors);

  var _React = _interopRequireDefault(_react);

  module.exports = _React['default'].createClass({
    displayName: 'text-input',

    mixins: [_Cursors['default']],

    render: function render() {
      return _React['default'].createElement(_BasicInput['default'], _extends({}, this.props, { type: 'text' }));
    }
  });
});
define('components/url-input', ['exports', 'module', 'components/basic-input', 'cursors', 'react'], function (exports, module, _componentsBasicInput, _cursors, _react) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _BasicInput = _interopRequireDefault(_componentsBasicInput);

  var _Cursors = _interopRequireDefault(_cursors);

  var _React = _interopRequireDefault(_react);

  module.exports = _React['default'].createClass({
    displayName: 'url-input',

    mixins: [_Cursors['default']],

    render: function render() {
      return _React['default'].createElement(_BasicInput['default'], _extends({}, this.props, { type: 'url' }));
    }
  });
});
define('former', ['exports', 'module', 'components/basic-input', 'components/checkbox-input', 'components/element', 'components/email-input', 'components/file-input', 'components/form', 'components/number-input', 'components/password-input', 'components/phone-input', 'components/question-group', 'components/radio-input', 'components/select-input', 'components/submit', 'components/switch-input', 'components/text-area', 'components/text-input', 'components/url-input'], function (exports, module, _componentsBasicInput, _componentsCheckboxInput, _componentsElement, _componentsEmailInput, _componentsFileInput, _componentsForm, _componentsNumberInput, _componentsPasswordInput, _componentsPhoneInput, _componentsQuestionGroup, _componentsRadioInput, _componentsSelectInput, _componentsSubmit, _componentsSwitchInput, _componentsTextArea, _componentsTextInput, _componentsUrlInput) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _BasicInput = _interopRequireDefault(_componentsBasicInput);

  var _CheckboxInput = _interopRequireDefault(_componentsCheckboxInput);

  var _Element = _interopRequireDefault(_componentsElement);

  var _EmailInput = _interopRequireDefault(_componentsEmailInput);

  var _FileInput = _interopRequireDefault(_componentsFileInput);

  var _Form = _interopRequireDefault(_componentsForm);

  var _NumberInput = _interopRequireDefault(_componentsNumberInput);

  var _PasswordInput = _interopRequireDefault(_componentsPasswordInput);

  var _PhoneInput = _interopRequireDefault(_componentsPhoneInput);

  var _QuestionGroup = _interopRequireDefault(_componentsQuestionGroup);

  var _RadioInput = _interopRequireDefault(_componentsRadioInput);

  var _SelectInput = _interopRequireDefault(_componentsSelectInput);

  var _Submit = _interopRequireDefault(_componentsSubmit);

  var _SwitchInput = _interopRequireDefault(_componentsSwitchInput);

  var _TextArea = _interopRequireDefault(_componentsTextArea);

  var _TextInput = _interopRequireDefault(_componentsTextInput);

  var _UrlInput = _interopRequireDefault(_componentsUrlInput);

  module.exports = {
    BasicInput: _BasicInput['default'],
    CheckboxInput: _CheckboxInput['default'],
    Element: _Element['default'],
    EmailInput: _EmailInput['default'],
    FileInput: _FileInput['default'],
    Form: _Form['default'],
    NumberInput: _NumberInput['default'],
    PasswordInput: _PasswordInput['default'],
    PhoneInput: _PhoneInput['default'],
    QuestionGroup: _QuestionGroup['default'],
    RadioInput: _RadioInput['default'],
    SelectInput: _SelectInput['default'],
    Submit: _Submit['default'],
    SwitchInput: _SwitchInput['default'],
    TextArea: _TextArea['default'],
    TextInput: _TextInput['default'],
    UrlInput: _UrlInput['default']
  };
});
  return require('former');
}));
