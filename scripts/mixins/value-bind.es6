export default {
  componentDidMount: function () {
    this.update({
      value: {$set: this.props.value},
      error: {$set: this.props.error}
    });
  },

  handleValueChange: function (ev) {
    this.update({value: {$set: ev.target.value}});
  },

  handleCheckedChange: function (ev) {
    this.update({value: {$set: ev.target.checked}});
  }
};
