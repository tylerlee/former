import Cursors from 'cursors';
import React from 'react';

export default React.createClass({
  mixins: [Cursors],

  render: function () {
    return <input type='submit' {...this.props} />;
  }
});
