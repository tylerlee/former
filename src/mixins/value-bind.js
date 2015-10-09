import _ from 'underscore';

export default {
  componentDidMount: function () {
    var deltas = {};
    if (_.has(this.props, 'value')) deltas.value = {$set: this.props.value};
    if (_.has(this.props, 'error')) deltas.error = {$set: this.props.error};
    this.update(deltas);
  },

  handleValueChange: function (ev) {
    this.update({value: {$set: ev.target.value}});
  },

  handleCheckedChange: function (ev) {
    this.update({value: {$set: ev.target.checked}});
  }
};
