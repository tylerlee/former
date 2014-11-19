var React = window.React;
var F = window.Former;

React.render(React.createFactory(React.createClass({
  render: function () {
    return (
      <F.Form action='/test' onSubmit={this.handleSubmit}>
        <h1>Sample Form</h1>
        <F.TextInput label='Text Input' size='50' columns='3' />
        <F.TextInput label='Text Input with Placeholder' placeholder='this is some text' columns='3'/>
        <F.TextInput label='Disabled Text Input' disabled={true} />
        <F.TextInput label='Required Text Input' required={true} />

        <F.NumberInput label='Number Input' note='pick something awesome'/>

        <F.UrlInput
          name='my_url'
          error='nope'
          label='Url Input'
          value='wut'
          note='Input Error is not currently a working feature'/>
        <F.PasswordInput label='Password Input' />
        <F.PhoneInput label='Phone Input' />
        <F.EmailInput label='Email Input' placeholder='tyler@orgsync.com' />

        <F.TextArea name='text-stuff' label='Text Area' required={true}/>

        <hr />

        <F.SelectInput
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
        </F.SelectInput>

        <hr />

        <F.QuestionGroup
          question='What colors do you prefer?'
          note='Pick as many as you would like'>
          <F.CheckboxInput name='color-blue' label='Blue' />
          <F.CheckboxInput name='color-red' label='Red' />
          <F.CheckboxInput name='color-green' label='Green' />
          <F.CheckboxInput name='color-orange' label='Orange' />
        </F.QuestionGroup>

        <hr />

        <F.RadioInput
          label='Single Radio'
          note='this here is a note about this radio button' />
        <F.CheckboxInput
          value={true}
          label='Single Checkbox'
          note='this here is a note about this checkbox' />

        <hr />

        <F.QuestionGroup
          question='Do you agree to this?'
          required={true}>
          <F.RadioInput
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
        </F.QuestionGroup>

        <F.Submit />
      </F.Form>
    );
  }
}))(), document.getElementById('example-form'));
