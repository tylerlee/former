// examples/index.jsx
var React = window.React;
var f = window.former;

React.render(React.createFactory(React.createClass({
  render: function () {
    return (
      React.createElement(f.Form, {action: "/test", onSubmit: this.handleSubmit}, 
        React.createElement("h1", null, "Sample Form"), 
        React.createElement(f.TextInput, {label: "Text Input", size: "50", columns: "3"}), 
        React.createElement(f.TextInput, {label: "Text Input with Placeholder", placeholder: "this is some text", columns: "3"}), 
        React.createElement(f.TextInput, {label: "Disabled Text Input", disabled: true}), 
        React.createElement(f.TextInput, {label: "Required Text Input", required: true}), 

        React.createElement(f.NumberInput, {label: "Number Input", note: "pick something awesome"}), 

        React.createElement(f.UrlInput, {
          name: "my_url", 
          error: "nope", 
          label: "Url Input", 
          value: "wut", 
          note: "Input Error is not currently a working feature"}), 
        React.createElement(f.PasswordInput, {label: "Password Input"}), 
        React.createElement(f.PhoneInput, {label: "Phone Input"}), 
        React.createElement(f.EmailInput, {label: "Email Input", placeholder: "tyler@orgsync.com"}), 

        React.createElement(f.TextArea, {name: "text-stuff", label: "Text Area", required: true}), 

        React.createElement("hr", null), 

        React.createElement(f.SelectInput, {
          name: "version", 
          value: "2", 
          label: "Pick a version", 
          note: "You can only pick one.", 
          options: {
            '1': 'Alpha',
            '2': 'Beta',
            '3': 'Gamma',
            '4': 'Delta',
            '5': 'Iota'
          }}
        ), 

        React.createElement("hr", null), 

        React.createElement(f.QuestionGroup, {
          question: "What colors do you prefer?", 
          note: "Pick as many as you would like"}, 
          React.createElement(f.CheckboxInput, {name: "color-blue", label: "Blue"}), 
          React.createElement(f.CheckboxInput, {name: "color-red", label: "Red"}), 
          React.createElement(f.CheckboxInput, {name: "color-green", label: "Green"}), 
          React.createElement(f.CheckboxInput, {name: "color-orange", label: "Orange"})
        ), 

        React.createElement("hr", null), 

        React.createElement(f.RadioInput, {
          label: "Single Radio", 
          note: "this here is a note about this radio button"}), 
        React.createElement(f.CheckboxInput, {
          value: true, 
          label: "Single Checkbox", 
          note: "this here is a note about this checkbox"}), 

        React.createElement("hr", null), 

        React.createElement(f.QuestionGroup, {
          question: "Do you agree to this?", 
          required: true}, 
          React.createElement(f.RadioInput, {
            value: "no", 
            name: "agreement", 
            options: {
              yes: {
                label: 'Yes',
                note: 'You want to do it'
              },
              no: {
                label: 'No',
                note: 'You cannot has it'
              }
            }}
          )
        ), 

        React.createElement(f.Submit, null)
      )
    );
  }
}))(), document.getElementById('example-form'));
