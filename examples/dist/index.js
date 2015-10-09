(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', 'cursors', 'react', 'former'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('cursors'), require('react'), require('former'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.Cursors, global.React, global.Former);
    global.index = mod.exports;
  }
})(this, function (exports, module, _cursors, _react, _former) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Cursors = _interopRequireDefault(_cursors);

  var _React = _interopRequireDefault(_react);

  var _Former = _interopRequireDefault(_former);

  var F = _Former['default'];

  module.exports = _React['default'].createClass({
    displayName: 'index',

    mixins: [_Cursors['default']],

    getInitialState: function getInitialState() {
      return {
        value: {},
        error: {}
      };
    },

    handleSubmit: function handleSubmit(ev) {
      ev.preventDefault();
      window.alert(JSON.stringify(this.state.value, null, 2));
    },

    render: function render() {
      return _React['default'].createElement(
        F.Form,
        {
          onSubmit: this.handleSubmit,
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
  });
});
