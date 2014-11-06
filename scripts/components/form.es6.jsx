import Cursors from 'cursors';
import React from 'react';

export default React.createClass({
  mixins: [Cursors],

  render: function () {
    return (
      <form action={this.props.action} onSubmit={this.props.onSubmit}>
        {this.props.children}
      </form>
    );
  }
});
