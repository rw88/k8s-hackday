import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Fib from './Fib';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Fibonnaci Calculator</h1>
          </header>
          <div>
            <Route exact path="/" component={Fib} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
