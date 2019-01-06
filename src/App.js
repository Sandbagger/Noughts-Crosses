import React, { Component } from 'react';
import Board from './components/Board.js';
import Paper from '@material-ui/core/Paper';

class App extends Component {
    render() {
      return (
        <div className="game">
        <Paper>
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
       
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
        </Paper>
      </div>
      );
    }
  }
  
  export default App;