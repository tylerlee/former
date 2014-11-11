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
          className: "input-error", 
          label: "Url Input", 
          note: "Input Error is not currently a working feature"}), 
        React.createElement(f.PasswordInput, {label: "Password Input"}), 
        React.createElement(f.PhoneInput, {label: "Phone Input"}), 
        React.createElement(f.EmailInput, {label: "Email Input", placeholder: "tyler@orgsync.com"}), 

        React.createElement(f.TextArea, {label: "Text Area", required: true}), 

        React.createElement("hr", null), 

        React.createElement(f.SelectInput, {
          value: "2", 
          label: "Pick a version", 
          note: "You can only pick one."}, 
          React.createElement("option", {value: "1"}, "Alpha"), 
          React.createElement("option", {value: "2"}, "Beta"), 
          React.createElement("option", {value: "3"}, "Gamma"), 
          React.createElement("option", {value: "4"}, "Delta"), 
          React.createElement("option", {value: "5"}, "Iota")
        ), 

        React.createElement("hr", null), 

        React.createElement(f.QuestionGroup, {
          question: "What colors do you prefer?", 
          note: "Pick as many as you would like"}, 
          React.createElement(f.CheckboxInput, {name: "color", label: "Blue"}), 
          React.createElement(f.CheckboxInput, {name: "color", label: "Red"}), 
          React.createElement(f.CheckboxInput, {name: "color", label: "Green"}), 
          React.createElement(f.CheckboxInput, {name: "color", label: "Orange"})
        ), 

        React.createElement("hr", null), 

        React.createElement(f.RadioInput, {
          label: "Single Radio", 
          note: "this here is a note about this radio button"}), 
        React.createElement(f.CheckboxInput, {
          label: "Single Checkbox", 
          note: "this here is a note about this checkbox"}), 

        React.createElement("hr", null), 

        React.createElement(f.QuestionGroup, {
          question: "Do you agree to this?", 
          required: true}, 
          React.createElement(f.RadioInput, {name: "agreement", label: "Yes"}), 
          React.createElement(f.RadioInput, {name: "agreement", label: "No"})
        ), 

        React.createElement(f.Submit, null)
      )
    );
  }
}))(), document.getElementById('example-form'));
