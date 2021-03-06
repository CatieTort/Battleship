import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import './stylesheets/App.css';
import Board from './components/gameboard';
import ScoreBoard from './components/scoreboard';
import Header from './components/header';


class App extends Component {
  render() {
    return (
      <div>
      <Header />
        <Board boardSize={10} shipCount={5} maxShots={50} />
      </div>
    );
  }
}

export default App;
