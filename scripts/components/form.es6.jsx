import Cursors from 'cursors';
import React from 'react';

export default React.createClass({
  mixins: [Cursors],

  render: function () {
    return (
      <form action={this.props.action}
        method={this.props.method}
        onSubmit={this.props.onSubmit}>
        {this.props.children}
      </form>
    );
  }
});
