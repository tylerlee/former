var React = window.React;
var f = window.former;

React.render(React.createFactory(React.createClass({
  render: function () {
    return (
      <f.Form action='/test' onSubmit={this.handleSubmit}>
        <h1>Sample Form</h1>
        <f.TextInput label='Text Input' size='50' columns='3' />
        <f.TextInput label='Text Input with Placeholder' placeholder='this is some text' columns='3'/>
        <f.TextInput label='Disabled Text Input' disabled={true} />
        <f.TextInput label='Required Text Input' required={true} />

        <f.NumberInput label='Number Input' note='pick something awesome'/>

        <f.UrlInput
          className='input-error'
          label='Url Input'
          note='Input Error is not currently a working feature'/>
        <f.PasswordInput label='Password Input' />
        <f.PhoneInput label='Phone Input' />
        <f.EmailInput label='Email Input' placeholder='tyler@orgsync.com' />

        <f.TextArea label='Text Area' required={true}/>

        <hr />

        <f.SelectInput
          value='2'
          label='Pick a version'
          note='You can only pick one.'>
          <option value='1'>Alpha</option>
          <option value='2'>Beta</option>
          <option value='3'>Gamma</option>
          <option value='4'>Delta</option>
          <option value='5'>Iota</option>
        </f.SelectInput>

        <hr />

        <f.QuestionGroup
          question='What colors do you prefer?'
          note='Pick as many as you would like'>
          <f.CheckboxInput name='color' label='Blue' />
          <f.CheckboxInput name='color' label='Red' />
          <f.CheckboxInput name='color' label='Green' />
          <f.CheckboxInput name='color' label='Orange' />
        </f.QuestionGroup>

        <hr />

        <f.RadioInput
          label='Single Radio'
          note='this here is a note about this radio button' />
        <f.CheckboxInput
          label='Single Checkbox'
          note='this here is a note about this checkbox' />

        <hr />

        <f.QuestionGroup
          question='Do you agree to this?'
          required={true}>
          <f.RadioInput name='agreement' label='Yes' />
          <f.RadioInput name='agreement' label='No' />
        </f.QuestionGroup>

        <f.Submit />
      </f.Form>
    );
  }
}))(), document.getElementById('example-form'));
