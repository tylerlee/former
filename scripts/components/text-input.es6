import BasicInput from 'components/basic-input';
import Cursors from 'cursors';
import React from 'react';

export default React.createClass({
  mixins: [Cursors],

  render: function () {
    return <BasicInput {...this.props} type='text' />;
  }
});
