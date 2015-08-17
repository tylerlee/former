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

  renderLabel: function () {
    if (this.props.label) return <dt><label>{this.props.label}</label></dt>;
  },

  renderError: function () {
    var error = this.props.error;
    if (error) return <div className='error'>{error}</div>;
  },

  render: function () {
    return (
      <dl className={this.getClassName()}>
        {this.renderLabel()}
        {this.renderNote()}
        {this.renderError()}
        <dd>{this.props.children}</dd>
      </dl>
    );
  }
});
