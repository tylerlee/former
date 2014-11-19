import _ from 'underscore';
import Cursors from 'cursors';
import Element from 'components/element';
import React from 'react';
import ValueBind from 'mixins/value-bind';

export default React.createClass({
  mixins: [Cursors, ValueBind],

  getClassName: function () {
    var classes = [];
    if (this.state.error) classes.push('input-error');
    if (this.props.className) classes.join(this.props.className);
    return classes.join(' ');
  },

  render: function() {
    return (
      <Element
        label={this.props.label}
        note={this.props.note}
        error={this.state.error}
        required={this.props.required}
        className={this.getClassName}
      >
        <input
          {..._.omit(this.props, 'label', 'note', 'className')}
          value={this.state.value}
          onChange={this.handleValueChange}
        />
      </Element>
    );
  }
});
