import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import './stylesheets/App.css';
import Board from './components/gameboard';


class App extends Component {
  render() {
    return (
      <div>
        <Board />
      </div>
    );
  }
}

export default App;
