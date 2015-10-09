import _ from 'underscore';
import {Mixin as Cursors} from 'cursors';
import Element from 'components/element';
import React from 'react';
import ValueBind from 'mixins/value-bind';

export default React.createClass({
  mixins: [Cursors, ValueBind],

  render: function () {
    return (
      <Element
        label={this.props.label}
        note={this.props.note}
        required={this.props.required}
      >
        <textarea
          {..._.omit(this.props, 'label')}
          value={this.state.value}
          onChange={this.handleValueChange}
        />
      </Element>
    );
  }
});
