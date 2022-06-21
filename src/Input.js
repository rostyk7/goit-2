import { Component } from "react";

export default class Input extends Component {
  state = {
    value: ''
  }

  static getDerivedStateFromProps(props) {
    return {
      value: props.value || ''
    }
  }

  onChange = (event) => {
    this.setState({
      value: event.target.value
    });
    if (this.props.onChange) {
      this.props.onChange(event.target.value)
    }
  };

  render() {
    return <input type='text' value={this.state.value} onChange={this.onChange} />
  }
}