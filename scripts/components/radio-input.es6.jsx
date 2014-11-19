import _ from 'underscore';
import Cursors from 'cursors';
import Element from 'components/element';
import React from 'react';
import ValueBind from 'mixins/value-bind';

export default React.createClass({
  mixins: [Cursors, ValueBind],

  renderOption: function (data, value) {
    var checked = this.state.value === value;
    return (
      <div key={value} className='form-checkbox'>
        <label>
          <input
            name={this.props.name}
            type='radio'
            value={value}
            checked={checked}
            onChange={this.handleValueChange}
          />
          {data.label}
        </label>
        {data.note ? <p className='note'>{data.note}</p> : null}
      </div>
    );
  },

  renderOptions: function () {
    return _.map(this.props.options, this.renderOption);
  },

  render: function () {
    return (
      <Element
        label={this.props.label}
        note={this.props.note}
        required={this.props.required}
      >
        {this.renderOptions()}
      </Element>
    );
  }
});
