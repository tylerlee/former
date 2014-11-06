import _ from 'underscore';
import Cursors from 'cursors';
import React from 'react';

export default React.createClass({
  mixins: [Cursors],

  getClassName: function () {
    var classes = ['form-checkbox'];
    if (this.props.required) classes.push('required');
    return classes.join(' ');
  },

  renderNote: function () {
    if (this.props.note) return <p className='note'>{this.props.note}</p>;
  },

  render: function () {
    return (
      <div className={this.getClassName()}>
        <label>
          <input type='checkbox' {..._.omit(this.props, 'label')} />
          {this.props.label}
        </label>
        {this.renderNote()}
      </div>
    );
  }
});
