// Based off of React Dropzone by paramaggarwal
// https://github.com/paramaggarwal/react-dropzone

import BasicInput from 'components/basic-input';
import Cursors from 'cursors';
import React from 'react';

export default React.createClass({
  mixins: [Cursors],

  getDefaultProps: function() {
    return {
      activeClassName: 'former-active',
      className: 'former-dropzone',
      multiple: true,
      supportClick: true
    };
  },

  getInitialState: function() {
    return {
      isDragActive: false
    };
  },

  onDragLeave: function(e) {
    this.setState({
      isDragActive: false
    });

    if (this.props.onDragLeave) {
      this.props.onDragLeave(e);
    }
  },

  onDragOver: function(e) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';

    // set active drag state only when file is dragged into
    // (in mozilla when file is dragged effect is "uninitialized")
    var effectAllowed = e.dataTransfer.effectAllowed;
    if (effectAllowed === 'all' || effectAllowed === 'uninitialized') {
      this.setState({
        isDragActive: true
      });
    }

    if (this.props.onDragOver) {
      this.props.onDragOver(e);
    }
  },

  onDrop: function(e) {
    e.preventDefault();

    this.setState({
      isDragActive: false
    });

    var files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    var maxFiles = (this.props.multiple) ? files.length : 1;
    for (var i = 0; i < maxFiles; i++) {
      files[i].preview = URL.createObjectURL(files[i]);
    }

    if (this.props.onDrop) {
      files = Array.prototype.slice.call(files, 0, maxFiles);
      this.props.onDrop(files, e);
    }
  },

  onClick: function () {
    if (this.props.supportClick === true) {
      this.open();
    }
  },

  open: function() {
    var fileInput = React.findDOMNode(this.refs.fileInput);
    fileInput.value = null;
    fileInput.click();
  },

  render: function() {
    var className = this.props.className;
    if (this.state.isDragActive) {
      className += ' ' + this.props.activeClassName;
    }

    return (
      <div
        className={className}
        onClick={this.onClick}
        onDragLeave={this.onDragLeave}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}>
        Drop your files here
        <input
          {..._.omit(this.props, 'label', 'note', 'className')}
          value={this.state.value}
          type='file'
          ref='fileInput'
          multiple={this.props.multiple}
          onChange={this.onDrop}
          accept={this.props.accept}
          style={{display: 'none'}}
        />
      </div>
    );
  }
});
