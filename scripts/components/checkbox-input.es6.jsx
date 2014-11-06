import Cursors from 'cursors';
import McInput from 'components/mc-input';
import React from 'react';

export default React.createClass({
  mixins: [Cursors],

  render: function () {
    return <McInput {...this.props} type='checkbox' />;
  }
});
