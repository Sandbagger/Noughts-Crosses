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
      stateCopy.squares[bestMove(minimax(stateCopy))] = stateCopy.xIsNext ? 'X' : 'O';
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



function togglePlayer(state) {
  //console.log(state)
  state.xIsNext = !state.xIsNext;
  //console.log(state)
return state;
}

function pilePlusOne(state){ 
  state.piles += 1;
  return state;
  } 

function cloneObj(state){

  return JSON.parse(JSON.stringify(state));
}

function getRidOfUndefinedValues(i){ 
  if (i !== undefined){
    return i;
  }
}

function makeMove(state, index) {
  state.move = index;
  // console.log("make move: state");
  // console.log(state);
  state.squares[index] = state.xIsNext ? 'X' : 'O' ;
  //console.log(state.squares)
    togglePlayer(state);
    pilePlusOne(state);
    return state;
 }

function returnIndexOfAvailableMoves(state){
 // debugger
  // console.log("returnIndexOfAvailableMoves: state")
  // console.log(state)
  if (state.squares){
 //   console.log("returnIndexOfAvailableMoves: state.squares")
  // console.log(state.squares)
    var arr = state.squares.map((element, index) => {
    if (!element) {
      return  index}
    })

 //    console.log("returnIndexOfAvailableMoves: arr")
  // console.log(arr)
       let freeMoves = arr.filter(getRidOfUndefinedValues);
      // console.log("returnIndexOfAvailableMoves: freemoves")
  // console.log(freeMoves)
  return freeMoves
  } else{
 return [];
}
}

function isGameWon(state) {

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
      return true;
    }
  }
  return false;
}

function score(state) {
  if (state.squares && isGameWon(state)) {
    if(state.xIsNext){
      state.points = 10000 - state.piles;
      return state;
    }else{
      state.points = -10000 + state.piles;
      return state;
    }
    
  } else if (state.squares && isGameWon(state) === false){
    state.points = 0;
    return state;
  }
}

function noNull(state) {
  let squares =state.squares;

 let noNullValues = squares.filter(getRidOfNullValues);


  if(noNullValues.length === 0){
    return true;
  }else{return false}
}

function getRidOfNullValues(i){
 return i === null;
}

function returnMoveScore(index, state) {
 
  var move = makeMove(state, index);

   return minimax(move);
}


function bestMove(obj){
  console.log('best object')
  console.log(obj)
  return obj.move;
}

function minimax(state){
  //debugger
// console.log("stateSqaurws")
// console.log(state)
// console.log(state.squares)


  if (isGameWon(state) || noNull(state)){
    return score(state); 
  }

let moves = returnIndexOfAvailableMoves(state);

  var scores = moves.map(index => {
  let move = makeMove(cloneObj(state), index);
    return minimax(move)
  })
// console.log("moves")
// console.log(moves)

// console.log("scores")
// console.log(scores)



let flattenScore = _.flatten(scores);

let bestMove;

  //debugger
if (state.xIsNext) {

  let indexMax = flattenScore.map(i => i.points).reduce((accum, x, currentIndex, arr) => x > arr[accum] ? currentIndex : accum, 0); 
  bestMove = flattenScore[indexMax];
  } else{
  let indexMin = flattenScore.map(i => i.points).reduce((accum, x, currentIndex, arr) => x < arr[accum] ? currentIndex : accum, 0);
        bestMove = flattenScore[indexMin];
  }
return bestMove;
}






