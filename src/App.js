// Dependancies
import React, { Component } from 'react';
import './App.css';

// Imports
import Nav from './component/Nav/Nav'
import Route from './route'
import { HashRouter } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Nav />
          {Route}
        </div>
      </HashRouter>
    );
  }
}

export default App;
