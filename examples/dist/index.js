(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', 'cursors', 'react', 'former'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('cursors'), require('react'), require('former'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.cursors, global.React, global.Former);
    global.index = mod.exports;
  }
})(this, function (exports, module, _cursors, _react, _former) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var _React = _interopRequireDefault(_react);

  var _Former = _interopRequireDefault(_former);

  var F = _Former['default'];

  var _default = (function (_Component) {
    _inherits(_default, _Component);

    function _default() {
      _classCallCheck(this, _default);

      _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).apply(this, arguments);

      this.state = {
        value: {},
        error: {}
      };
    }

    _createClass(_default, [{
      key: 'handleSubmit',
      value: function handleSubmit(ev) {
        ev.preventDefault();
        window.alert(JSON.stringify(this.state.value, null, 2));
      }
    }, {
      key: 'render',
      value: function render() {
        return _React['default'].createElement(
          F.Form,
          {
            onSubmit: this.handleSubmit.bind(this),
            cursors: {
              value: this.getCursor('value'),
              error: this.getCursor('error')
            }
          },
          _React['default'].createElement(
            'h1',
            null,
            'Sample Form'
          ),
          _React['default'].createElement(F.SwitchInput, { name: 'dat-switch', label: 'Switch it real good' }),
          _React['default'].createElement(F.TextInput, { label: 'Text Input', size: '50', columns: '3' }),
          _React['default'].createElement(F.TextInput, { label: 'Text Input with Placeholder', placeholder: 'this is some text', columns: '3' }),
          _React['default'].createElement(F.TextInput, { label: 'Disabled Text Input', disabled: true }),
          _React['default'].createElement(F.TextInput, { label: 'Required Text Input', required: true }),
          _React['default'].createElement(F.NumberInput, { label: 'Number Input', note: 'pick something awesome' }),
          _React['default'].createElement(F.FileInput, { label: 'File Input' }),
          _React['default'].createElement(F.UrlInput, {
            name: 'my_url[deets]',
            value: 'hello',
            error: 'bad url',
            label: 'Url Input',
            note: 'Input Error is not currently a working feature' }),
          _React['default'].createElement(F.PasswordInput, { label: 'Password Input' }),
          _React['default'].createElement(F.PhoneInput, { label: 'Phone Input' }),
          _React['default'].createElement(F.EmailInput, { label: 'Email Input', placeholder: 'tyler@orgsync.com' }),
          _React['default'].createElement(F.TextArea, { name: 'text-stuff', label: 'Text Area', required: true }),
          _React['default'].createElement('hr', null),
          _React['default'].createElement(F.SelectInput, {
            name: 'version',
            value: '2',
            label: 'Pick a version',
            note: 'You can only pick one.',
            options: {
              1: 'Alpha',
              2: 'Beta',
              3: 'Gamma',
              4: 'Delta',
              5: 'Iota'
            } }),
          _React['default'].createElement('hr', null),
          _React['default'].createElement(
            F.QuestionGroup,
            {
              question: 'What colors do you prefer?',
              note: 'Pick as many as you would like' },
            _React['default'].createElement(F.CheckboxInput, { name: 'color-blue', label: 'Blue' }),
            _React['default'].createElement(F.CheckboxInput, { name: 'color-red', label: 'Red' }),
            _React['default'].createElement(F.CheckboxInput, { name: 'color-green', label: 'Green' }),
            _React['default'].createElement(F.CheckboxInput, { name: 'color-orange', label: 'Orange' })
          ),
          _React['default'].createElement('hr', null),
          _React['default'].createElement(F.RadioInput, {
            label: 'Single Radio',
            note: 'this here is a note about this radio button' }),
          _React['default'].createElement(F.CheckboxInput, {
            value: true,
            label: 'Single Checkbox',
            note: 'this here is a note about this checkbox' }),
          _React['default'].createElement('hr', null),
          _React['default'].createElement(
            F.QuestionGroup,
            {
              question: 'Do you agree to this?',
              required: true },
            _React['default'].createElement(F.RadioInput, {
              value: 'no',
              name: 'agreement',
              options: {
                yes: {
                  label: 'Yes',
                  note: 'You want to do it'
                },
                no: {
                  label: 'No',
                  note: 'You cannot has it'
                }
              }
            })
          ),
          _React['default'].createElement(F.Submit, null)
        );
      }
    }]);

    return _default;
  })(_cursors.Component);

  module.exports = _default;
});
