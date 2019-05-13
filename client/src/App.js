import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FibonnaciPage from './Pages/FibonnaciPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Fibonnaci Calculator</h1>
          </header>
          <div>
            <Route exact path="/" component={FibonnaciPage} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
