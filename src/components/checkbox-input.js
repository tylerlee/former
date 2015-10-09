import {Mixin as Cursors} from 'cursors';
import React from 'react';
import ValueBind from 'mixins/value-bind';

export default React.createClass({
  mixins: [Cursors, ValueBind],

  render: function () {
    return (
      <div className='form-checkbox'>
        <label>
          <input
            name={this.props.name}
            type='checkbox'
            value={this.props.value}
            checked={this.state.value}
            onChange={this.handleCheckedChange}
          />
          {this.props.label}
        </label>
        {this.props.note ? <p className='note'>{this.props.note}</p> : null}
      </div>
    );
  }
});
