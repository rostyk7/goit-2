import { Component } from 'react';
import Alert from 'react-bootstrap/Alert';

export default class ErrorBoundary extends Component {
  state = {
    error: false
  };

  static getDerivedStateFromError() {
    return {
      error: true
    }
  }

  componentDidCatch(err) {
    console.log('Error occurred');
    console.log(err);
  }

  render() {
    if (this.state.error) {
      return (
        <Alert variant='danger'>
          Something went wrong. Please try again later
        </Alert>
      );
    }
    return this.props.children;
  }
}


