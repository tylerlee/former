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
          name='my_url'
          error='nope'
          label='Url Input'
          value='wut'
          note='Input Error is not currently a working feature'/>
        <f.PasswordInput label='Password Input' />
        <f.PhoneInput label='Phone Input' />
        <f.EmailInput label='Email Input' placeholder='tyler@orgsync.com' />

        <f.TextArea name='text-stuff' label='Text Area' required={true}/>

        <hr />

        <f.SelectInput
          name='version'
          value='2'
          label='Pick a version'
          note='You can only pick one.'
          options={{
            '1': 'Alpha',
            '2': 'Beta',
            '3': 'Gamma',
            '4': 'Delta',
            '5': 'Iota'
          }}>
        </f.SelectInput>

        <hr />

        <f.QuestionGroup
          question='What colors do you prefer?'
          note='Pick as many as you would like'>
          <f.CheckboxInput name='color-blue' label='Blue' />
          <f.CheckboxInput name='color-red' label='Red' />
          <f.CheckboxInput name='color-green' label='Green' />
          <f.CheckboxInput name='color-orange' label='Orange' />
        </f.QuestionGroup>

        <hr />

        <f.RadioInput
          label='Single Radio'
          note='this here is a note about this radio button' />
        <f.CheckboxInput
          value={true}
          label='Single Checkbox'
          note='this here is a note about this checkbox' />

        <hr />

        <f.QuestionGroup
          question='Do you agree to this?'
          required={true}>
          <f.RadioInput
            value='no'
            name='agreement'
            options={{
              yes: {
                label: 'Yes',
                note: 'You want to do it'
              },
              no: {
                label: 'No',
                note: 'You cannot has it'
              }
            }}
          />
        </f.QuestionGroup>

        <f.Submit />
      </f.Form>
    );
  }
}))(), document.getElementById('example-form'));
