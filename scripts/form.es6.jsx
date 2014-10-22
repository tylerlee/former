/** @jsx React.DOM */

import _ from 'underscore';
import React from 'react';

var Form = React.createClass({
  render: function() {
    return(
      <form action={this.props.action}>
        {this.props.children}
      </form>
    );
  }
});

var Submit = React.createClass({
  render: function() {
    return(
      <input type="submit" {...this.props} />
    );
  }
});

var ElementWrapper = React.createClass({
  renderNote: function(){
    if(this.props.note) return <p className='note'>{this.props.note}</p>;
  },

  render: function() {
    var classes = 'form ' + this.props.className;
    return(
      <dl className={classes}>
        <dt><label>{this.props.label}</label></dt>
        {this.renderNote()}
        <dd>{this.props.children}</dd>
      </dl>
    );
  }
});

var BasicInput = React.createClass({
  render: function() {
    var requiredClass = this.props.required ? 'required' : '';
    return (
      <ElementWrapper
        label={this.props.label}
        note={this.props.note}
        className={requiredClass} >
        <input {..._.omit(this.props, 'label')} />
      </ElementWrapper>
    );
  }
});

var TextArea = React.createClass({

  render: function() {
    return(
      <ElementWrapper label={this.props.label}>
        <textarea {..._.omit(this.props, 'label')} />
      </ElementWrapper>
    );
  }
});

var SelectInput = React.createClass({
  render: function(){
    return (
      <ElementWrapper label={this.props.label}>
        <select {..._.omit(this.props, 'label')}>
          {this.props.children}
        </select>
      </ElementWrapper>
    );
  }
});

var CheckboxInput = React.createClass({
  renderNote: function(){
    if(this.props.note) return <p className='note'>{this.props.note}</p>;
  },
  render: function (){
    return(
      <div className="form-checkbox">
        <label>
          <input
            type="checkbox"
            {..._.omit(this.props, 'label')} />
          {this.props.label}
        </label>
        {this.renderNote()}
      </div>
    );
  }
});

var RadioInput = React.createClass({
  renderNote: function(){
    if(this.props.note) return <p className='note'>{this.props.note}</p>;
  },

  render: function (){
    return(
      <div className="form-checkbox">
        <label>
          <input
            type="radio"
            {..._.omit(this.props, 'label')} />
          {this.props.label}
        </label>
        {this.renderNote()}
      </div>
    );
  }
});

var QuestionGroup = React.createClass({
  render: function(){
    var requiredClass = this.props.required ? 'required' : '';
    return(
      <ElementWrapper
        label={this.props.question}
        note={this.props.note}
        className={requiredClass} >
        {this.props.children}
      </ElementWrapper>
    );
  }
});

var TextInput = React.createClass({
  render: function() {
    return <BasicInput type="text" {...this.props} />;
  }
});

var NumberInput = React.createClass({
  render: function() {
    return <BasicInput type="number" {...this.props} />;
  }
});

var UrlInput = React.createClass({
  render: function() {
    return <BasicInput type="url" {...this.props} />;
  }
});

var PasswordInput = React.createClass({
  render: function() {
    return <BasicInput type="password" {...this.props} />;
  }
});

var PhoneInput = React.createClass({
  render: function() {
    return <BasicInput type="tel" {...this.props} />;
  }
});

var EmailInput = React.createClass({
  render: function() {
    return <BasicInput type="email" {...this.props} />;
  }
});


export default React.createClass({
  render: function () {
    return (
      <Form>
        <h1>Sample Form</h1>
        <TextInput label="Text Input" size="50"/>
        <TextInput label="Text Input with Placeholder" placeholder="this is some text"/>
        <TextInput label="Disabled Text Input" disabled={true} />
        <TextInput label="Required Text Input" required={true}/>

        <NumberInput label="Number Input" note="pick something awesome"/>

        <UrlInput label="Url Input"/>
        <PasswordInput label="Password Input" />
        <PhoneInput label="Phone Input" />
        <EmailInput label="Email Input" placeholder="tyler@orgsync.com" />

        <TextArea label="Text Area" />

        <hr />

        <SelectInput
          value="2"
          label="Pick a version">
          <option value="1">alpha</option>
          <option value="2">beta</option>
          <option value="3">gamma</option>
        </SelectInput>

        <hr />

        <QuestionGroup
          question="Pick your favorite color?"
          note="pick one or many">
          <CheckboxInput name="color" label="blue" />
          <CheckboxInput name="color" label="red" />
        </QuestionGroup>

        <hr />

        <RadioInput
          label="Single Radio"
          note="this here is a note about this radio button" />
        <CheckboxInput
          label="Single Checkbox"
          note="this here is a note about this checkbox" />

        <hr />

        <QuestionGroup
          question="do you agree to this?"
          required="true">
          <RadioInput name="agreement" label="Yes" />
          <RadioInput name="agreement" label="No" />
        </QuestionGroup>

        <Submit />
      </Form>
    );
  }
});

