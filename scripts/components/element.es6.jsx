import Cursors from 'cursors';
import React from 'react';

export default React.createClass({
  mixins: [Cursors],

  getClassName: function () {
    var classes = ['form'];
    if (this.props.required) classes.push('required');
    return classes.join(' ');
  },

  renderNote: function () {
    if (this.props.note) return <p className='note'>{this.props.note}</p>;
  },

  render: function () {
    return (
      <dl className={this.getClassName()}>
        <dt><label>{this.props.label}</label></dt>
        {this.renderNote()}
        <dd>{this.props.children}</dd>
      </dl>
    );
  }
});
