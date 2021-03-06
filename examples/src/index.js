import Cursors from 'cursors';
import React from 'react';
import Former from 'former';

const F = Former;

export default React.createClass({
  mixins: [Cursors],

  getInitialState() {
    return {
      value: {},
      error: {}
    };
  },

  handleSubmit(ev) {
    ev.preventDefault();
    window.alert(JSON.stringify(this.state.value, null, 2));
  },

  render() {
    return (
      <F.Form
        onSubmit={this.handleSubmit}
        cursors={{
          value: this.getCursor('value'),
          error: this.getCursor('error')
        }}
      >
        <h1>Sample Form</h1>

        <F.SwitchInput name='dat-switch' label='Switch it real good' />
        <F.TextInput label='Text Input' size='50' columns='3' />
        <F.TextInput label='Text Input with Placeholder' placeholder='this is some text' columns='3'/>
        <F.TextInput label='Disabled Text Input' disabled={true} />
        <F.TextInput label='Required Text Input' required={true} />

        <F.NumberInput label='Number Input' note='pick something awesome'/>

        <F.FileInput label='File Input' />

        <F.UrlInput
          name='my_url[deets]'
          value='hello'
          error='bad url'
          label='Url Input'
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
            1: 'Alpha',
            2: 'Beta',
            3: 'Gamma',
            4: 'Delta',
            5: 'Iota'
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
});
