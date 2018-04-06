import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var _ = require('lodash');

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

function Settings(props){
  return (
    <fieldset>
      <legend>Game settings</legend>
      <div>
        <input type="radio" id="PvP" name="setting" onChange={props.onClickPvp} defaultChecked></input>
        <label>P vs P</label>
     </div>
     <div>
       <input type="radio" id="PvC" name="setting" onChange={props.onClickPvc} ></input>
       <label>P vs C</label>
     </div>
     <button onClick={props.onClickReset}>Reset game</button>
</fieldset>
    );
}


class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: [null, null, null, null, null, null, null, null, null],
      xIsNext: true,
      isPvp: true,
      points: 0,
    }
  }

  renderSquare(i) {
    return <Square 
    value={this.state.squares[i]}
    onClick={()=>this.handleClick(i)}
    />;
  }

  renderSettings() {
    return <Settings 
     onClickPvp={()=>this.handleRadio("pvp")}
     onClickPvc={()=>this.handleRadio("pvc")}
     onClickReset={()=>this.handleReset()}
    
     />;
    
  }

  handleClick(i) {
    console.log("click!");
    const stateCopy = JSON.parse(JSON.stringify(this.state)); 
    console.log("Thisssssssssssssssssssssssssssssssssssss " + stateCopy[0])
   

  if (calculateWinner(stateCopy.squares) || stateCopy.squares[i]) {
      console.log("passed");
      return;
    }

//Is it X's turn?
 if (this.state.xIsNext) {
    //X's turn, make move
       stateCopy.squares[i] = this.state.xIsNext ? 'X' : 'O';
       //
      if (this.state.isPvp){
        //X makes move and turn moves to O
        stateCopy.xIsNext = !this.state.xIsNext;
      } else{
        //playing against computer, computer makes move
        stateCopy.squares[oBestMove(stateCopy)] = 'O';
      }

}else {
  // Its O's turn
    if (!this.state.isPvp) {
       //playing against computer
       stateCopy.squares[oBestMove(stateCopy)] = 'O';
        stateCopy.xIsNext = !this.state.xIsNext;
     } else {
      //O's turn against player
      stateCopy.squares[i] = this.state.xIsNext ? 'X' : 'O';
       stateCopy.xIsNext = !this.state.xIsNext;
     }
   }  

   this.setState(stateCopy);

  }



  handleRadio(radio) {
   
    if (radio === "pvp") {
     
   
      this.setState({
        isPvp: true,
      })
      console.log("pvp " + this.state.isPvp);
    } 

    if (radio ==="pvc") {
        this.setState({
        isPvp: false,
      })
      console.log("pvc " + this.state.isPvp);
    }
  }


  handleReset(){
    this.setState({
      squares: [null, null, null, null, null, null, null, null, null],
      xIsNext: true,
    }); 
  }

  render() {
    const winner = calculateWinner(this.state.squares);

    let status;

    if(winner){
      status = "The winner is: " + winner;
    }
    else{
      status = "Next player is: " + (this.state.xIsNext ? 'X': 'O')
    }



    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        {this.renderSettings()}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
       
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


function oBestMove(state){
  const sim = miniMax(state);
  const result = moveWithLowestScore(sim);
  console.log(result)
  return result.MoveIndex;
}

function miniMax(state, x) {
  const stateCopy = JSON.parse(JSON.stringify(state));

const step1 = identifyPossibleMoves(stateCopy)
        .map((i) => simulateEachMove(i, JSON.parse(JSON.stringify(stateCopy))));
       // console.log('simulate each move ' + step1 + ' ' + x);
       const step2 = step1.map((j) => returnNetPointsForEachMove(j));
      // console.log('netpoints ' + step2 + ' ' + x);

      return step2;
}



function identifyPossibleMoves(state) {
  return state.squares.map(function (e, i){
   if (e === null){
    return i;}})

  .filter(x => x != null)
}


function simulateEachMove(possibleMoveIndex, state) {
   state.MoveIndex = possibleMoveIndex;
   state.squares[possibleMoveIndex] = state.xIsNext ? 'X' : 'O';

  
const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (state.squares[a] && state.squares[a] === state.squares[b] && state.squares[a] === state.squares[c]) {
      state.points = state.xIsNext ? 10 : -10;
         state.xIsNext =  !state.xIsNext;
      return state;
    }
  }
 state.xIsNext =  !state.xIsNext;
 state.pile = state.pile + 1;
  return _.flattenDeep([state].concat(miniMax(state, 'recursive')));

} 


function returnNetPointsForEachMove (i) {

// console.log('before conditional ' + i )
 if (Array.isArray(i)) {
      i[0].points = i.map(j => j.points).reduce((accum, curr) => accum + curr);
       return i[0];
  } else{
    return i;
  }

}


function moveWithLowestScore (state) {
  return state.reduce((accum, curr) => accum.points > curr.points ? accum : curr, 0)
}




