export default {
  componentDidMount: function () {
    this.update({value: {$set: this.props.value}});
  },

  onValueChange: function (ev) {
    this.update({value: {$set: ev.target.value}});
  }
};
