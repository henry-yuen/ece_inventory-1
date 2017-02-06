import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';
import routes from './config/routes';

class App extends Component {
  render() {
    console.log("test App");
    return (
      <Router history={browserHistory}>{routes}</Router>
    );
  }
}
export default App;
