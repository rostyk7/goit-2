import { Component } from 'react';

export default class Dummy extends Component {
  state = {
    counter: 0
  };

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState(prevState => ({
        counter: prevState.counter + 1
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  render() {
    return <div>
      <h1>dummy</h1>
      <div>{this.state.counter}</div>
      </div>
  };
}