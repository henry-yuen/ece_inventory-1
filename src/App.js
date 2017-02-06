import React, { Component } from 'react';
import { Route, Router, browserHistory } from 'react-router';
import routes from './config/routes';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <Router history = {browserHistory}>{routes}</Router>
    );
  }
}
export default App;
