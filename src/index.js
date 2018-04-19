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

computerMove(stateCopy) {
    if (!stateCopy.isPvp){
      stateCopy.squares[bestMove(bestOb(identifyPossibleMoves(stateCopy)))] = stateCopy.xIsNext ? 'X' : 'O';
       stateCopy.xIsNext = !stateCopy.xIsNext;
    }
    this.setState(prevState => stateCopy);
  };


  handleClick(i) {
    console.log("click!");
    const stateCopy = JSON.parse(JSON.stringify(this.state)); 
    console.log("Thisssssssssssssssssssssssssssssssssssss " + stateCopy)
   

  if (calculateWinner(stateCopy.squares) || stateCopy.squares[i]) {
      console.log("passed");
      return;
    }

      stateCopy.squares[i] = this.state.xIsNext ? 'X' : 'O';
           stateCopy.xIsNext = !this.state.xIsNext;

   
   this.setState(prevState => stateCopy);
   return this.computerMove(stateCopy);
  };

 

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


let cloneObj = state => JSON.parse(JSON.stringify(state));

let togglePlayer = state => !state.xIsNext;

let pilePlusOne = state => state.piles += 1; 

let score = state => state.xIsNext ? 10 : -10;

let reduceScore = i => i.map(j => j.points).reduce((accum, curr) => accum + curr);

let returnIndexOfAvailableMove = (element, index) => {
  if (!element) {
    return {possibleMove: index}}
  };


let isPotentialMove = i => i != null;


let cloneProperty = state =>
  key => {
    let obj = {};
    obj[key] = state[key];
    return cloneObj(obj);
    }

let updateProperty = state =>
  key =>
    value => {
      state[key] = value;
      return cloneObj(state)
    };


let addPropertyTo = state =>
  property => { return {...(cloneObj(state)), ...property}};

let makeMove = state => {
  state.squares[state.possibleMove] = this.xIsNext ? 'X' : 'O';
  return cloneObj(state);
}


let isGameWon = state => {

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
      
      let points = updateProperty(state)('points')(score(state));


      return  points;
      
    }
  }

  return _.flatten([state].concat(identifyPossibleMoves(state)));

} 


let returnNetPointsForEachMove = i => {
 if (Array.isArray(i)) {
      let reducingScore = updateProperty(i[0])('points')(reduceScore(i)) 
       return reducingScore;
  } else{
    return i;
  }

}




let identifyPossibleMoves = state => state.squares.map(returnIndexOfAvailableMove)
  .filter(isPotentialMove)
  .map(moveIndex => addPropertyTo(state)(moveIndex))
  .map(makeMove)
  .map(i => updateProperty(i)('piles')(pilePlusOne(i)))
  .map(i => updateProperty(i)('xIsNext')(togglePlayer(i)))
  .map(isGameWon)
  .map(returnNetPointsForEachMove);
//  .reduce((accum, curr) => accum.points > curr.points ? accum : curr);



function bestOb (arr) {

  return arr.reduce((accum, curr) => accum.points > curr.points ? accum : curr)
}


function bestMove (state) {
  return state.possibleMove;
} 



function bestOb (arr) {

  return arr.reduce((accum, curr) => accum.points > curr.points ? accum : curr)
}


function bestMove (state) {
  return state.possibleMove;
} 
