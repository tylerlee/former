import _ from 'underscore';
import Cursors from 'cursors';
import React from 'react';

var cloneWithProps = React.addons.cloneWithProps;

export default React.createClass({
  mixins: [Cursors],

  getInitialState: function () {
    return {
      value: {},
      error: {}
    };
  },

  renderChild: function (component) {
    var props = component.props;
    if (!props) return component;
    var cursors = props.cursors;
    if (_.has(props, 'name')) {
      cursors = _.extend({}, cursors, {
        value: this.getCursor('value', props.name),
        error: this.getCursor('error', props.name)
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
