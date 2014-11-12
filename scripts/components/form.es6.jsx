import _ from 'underscore';
import Cursors from 'cursors';
import React from 'react';

var cloneWithProps = React.addons.cloneWithProps;

export default React.createClass({
  mixins: [Cursors],

  getDefaultProps: function () {
    return {
      value: {}
    };
  },

  getInitialState: function () {
    return {
      value: this.props.value
    };
  },

  componentDidUpdate: function () {
    console.log(JSON.stringify(this.state, null, 2));
  },

  renderChild: function (component) {
    if (!component.props) return component;
    var cursors = {};
    if (_.has(component.props, 'name')) {
      cursors = component.props.cursors || {};
      cursors.value = this.getCursor('value', component.props.name);
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
      <form action={this.props.action}
        method={this.props.method}
        onSubmit={this.props.onSubmit}>
        {this.renderChildren(this)}
      </form>
    );
  }
});

// <former.Form>

// </former.Form>
