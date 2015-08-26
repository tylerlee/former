'use strict';

var Cursors = window.Cursors;
var React = window.React;
var F = window.Former;

React.render(React.createFactory(React.createClass({
  mixins: [Cursors],

  getInitialState: function getInitialState() {
    return {
      value: {},
      error: {},
      files: []
    };
  },

  onDrop: function onDrop(files) {
    console.log('Received files: ', files);
    this.setState({
      files: files
    });
  },

  displayFile: function displayFile(file) {
    return React.createElement(
      'li',
      null,
      file.name
    );
  },

  showFiles: function showFiles() {
    if (this.state.files.length <= 0) return;

    var files = this.state.files;

    return React.createElement(
      'div',
      null,
      React.createElement(
        'h3',
        null,
        'Dropped Files:'
      ),
      React.createElement(
        'ul',
        null,
        _.map(files, this.displayFile)
      )
    );
  },

  handleSubmit: function handleSubmit(ev) {
    ev.preventDefault();
    window.alert(JSON.stringify(this.state.value, null, 2));
  },

  render: function render() {
    return React.createElement(
      F.Form,
      {
        onSubmit: this.handleSubmit,
        cursors: {
          value: this.getCursor('value'),
          error: this.getCursor('error')
        }
      },
      React.createElement(
        'h1',
        null,
        'Sample Form'
      ),
      React.createElement(F.SwitchInput, { name: 'dat-switch', label: 'Switch it real good' }),
      React.createElement(F.TextInput, { label: 'Text Input', size: '50', columns: '3' }),
      React.createElement(F.TextInput, { label: 'Text Input with Placeholder', placeholder: 'this is some text', columns: '3' }),
      React.createElement(F.TextInput, { label: 'Disabled Text Input', disabled: true }),
      React.createElement(F.TextInput, { label: 'Required Text Input', required: true }),
      React.createElement(F.NumberInput, { label: 'Number Input', note: 'pick something awesome' }),
      React.createElement(F.FileInput, { label: 'File Input' }),
      React.createElement(F.Dropzone, { onDrop: this.onDrop }),
      this.showFiles(),
      React.createElement(F.UrlInput, {
        name: 'my_url[deets]',
        value: 'hello',
        error: 'bad url',
        label: 'Url Input',
        note: 'Input Error is not currently a working feature' }),
      React.createElement(F.PasswordInput, { label: 'Password Input' }),
      React.createElement(F.PhoneInput, { label: 'Phone Input' }),
      React.createElement(F.EmailInput, { label: 'Email Input', placeholder: 'tyler@orgsync.com' }),
      React.createElement(F.TextArea, { name: 'text-stuff', label: 'Text Area', required: true }),
      React.createElement('hr', null),
      React.createElement(F.SelectInput, {
        name: 'version',
        value: '2',
        label: 'Pick a version',
        note: 'You can only pick one.',
        options: {
          '1': 'Alpha',
          '2': 'Beta',
          '3': 'Gamma',
          '4': 'Delta',
          '5': 'Iota'
        } }),
      React.createElement('hr', null),
      React.createElement(
        F.QuestionGroup,
        {
          question: 'What colors do you prefer?',
          note: 'Pick as many as you would like' },
        React.createElement(F.CheckboxInput, { name: 'color-blue', label: 'Blue' }),
        React.createElement(F.CheckboxInput, { name: 'color-red', label: 'Red' }),
        React.createElement(F.CheckboxInput, { name: 'color-green', label: 'Green' }),
        React.createElement(F.CheckboxInput, { name: 'color-orange', label: 'Orange' })
      ),
      React.createElement('hr', null),
      React.createElement(F.RadioInput, {
        label: 'Single Radio',
        note: 'this here is a note about this radio button' }),
      React.createElement(F.CheckboxInput, {
        value: true,
        label: 'Single Checkbox',
        note: 'this here is a note about this checkbox' }),
      React.createElement('hr', null),
      React.createElement(
        F.QuestionGroup,
        {
          question: 'Do you agree to this?',
          required: true },
        React.createElement(F.RadioInput, {
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
      React.createElement(F.Submit, null)
    );
  }
}))(), document.getElementById('example-form'));
