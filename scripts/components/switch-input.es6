import Cursors from 'cursors';
import React from 'react';
import ValueBind from 'mixins/value-bind';

export default React.createClass({
  mixins: [Cursors, ValueBind],

  getClassName: function () {
    var classes = ['former-switch'];
    if (this.state.value) classes.push('former-switch-active');
    return classes.join(' ');
  },

  render: function () {
    return (
      <div className={this.getClassName()}>
        <label>
          {this.props.label}
          <span className='former-switch-container'>
            <input
              name={this.props.name}
              type='checkbox'
              value={this.props.value}
              checked={this.state.value}
              onChange={this.handleCheckedChange}
            />
            <div className='former-switch-display' />
          </span>
        </label>
        {this.props.note ? <p className='note'>{this.props.note}</p> : null}
      </div>
    );
  }
});
