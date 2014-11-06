import _ from 'underscore';
import Cursors from 'cursors';
import Element from 'components/element';
import React from 'react';

export default React.createClass({
  mixins: [Cursors],

  render: function() {
    return (
      <Element
        label={this.props.label}
        note={this.props.note}
        required={this.props.required}
      >
        <input {..._.omit(this.props, 'label', 'note')} />
      </Element>
    );
  }
});
