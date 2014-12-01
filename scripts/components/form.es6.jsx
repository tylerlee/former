import _ from 'underscore';
import Cursors from 'cursors';
import React from 'react';

var cloneWithProps = React.addons.cloneWithProps;

var getPathFromName = function (name) {
  return _.compact(name.split(/\[|]\[|]/));
};

export default React.createClass({
  mixins: [Cursors],

  getInitialState: function () {
    return {
      value: {},
      error: {}
    };
  },

  ensurePath: function (key, path) {
    var cursors = this.props.cursors || {};
    var state = cursors[key] ? cursors[key].root.state : this.state;
    path = [key].concat(path);
    while (path.length > 1) {
      key = path.shift();
      state = state[key] || (state[key] = {});
    }
  },

  renderChild: function (component) {
    var props = component && component.props;
    if (!props) return component;
    var cursors = props.cursors;
    if (_.has(props, 'name')) {
      var path = getPathFromName(props.name);
      this.ensurePath('value', path);
      this.ensurePath('error', path);
      cursors = _.extend({}, cursors, {
        value: this.getCursor('value', path),
        error: this.getCursor('error', path)
      });
    }
    return cloneWithProps(component, {
      children: this.renderChildren(component),
      cursors: cursors,
      key: component.key || void 0,
      ref: component.ref || void 0
    });
  },

  renderChildren: function (component) {
    if (!component.props) return component;
    return React.Children.map(component.props.children, this.renderChild);
  },

  render: function () {
    return (
      <form {...this.props}>
        {this.renderChildren(this)}
      </form>
    );
  }
});
