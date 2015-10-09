import Cursors from 'cursors';
import Element from 'components/element';
import React from 'react';

export default React.createClass({
  mixins: [Cursors],

  render: function(){
    return(
      <Element
        label={this.props.question}
        note={this.props.note}
        className='form-checkbox'
        required={this.props.required}
      >
        {this.props.children}
      </Element>
    );
  }
});
