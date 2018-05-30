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
      points: null,
      piles: 0,
    }

    this.renderSquare = this.renderSquare.bind(this)
  }

  renderSquare(i) {
    return <Square 
    value={this.state.squares[i]}
    onClick={()=>this.handleClick(this.computerMove, i)}
    />;
  }

  renderSettings() {
    return <Settings 
     onClickPvp={()=>this.handleRadio("pvp")}
     onClickPvc={()=>this.handleRadio("pvc")}
     onClickReset={()=>this.handleReset()}
    
     />;
    
  }


objectFactory(){
  const obj = Object.assign({},{board: undefined, 
               xGo: this.state.xIsNext,
               playervp: this.state.isPvp,
               piles: 0,
               points: undefined,
               move: undefined  
                     })
obj.board = this.state.squares.slice(0);

return obj

}


computerMove(stateCopy, that) {
  console.log('component state after human player move but before computer move', that.state.squares)
if (!stateCopy.playervp){
      stateCopy.board[minimax(stateCopy)] = stateCopy.xGo ? 'X' : 'O';
       stateCopy.xGo = !stateCopy.xGo;
    

        const update = {squares:stateCopy.board, 
                                        xIsNext:stateCopy.xGo}

        that.setState(prevState => update);
        console.log('state after computermove', that.state.squares)
    }
    
  };


  handleClick(cb, i) {
console.log('this state before human player moves', this.state.squares)
    const stateCopy = this.objectFactory();

     

    if (calculateWinner(stateCopy.board) || stateCopy.board[i]) {
      console.log("passed");
      return;
    }

      stateCopy.board[i] = stateCopy.xGo ? 'X' : 'O';
           stateCopy.xGo = !stateCopy.xGo;
           // console.log('player stateCopy2', stateCopy.board)
           const that = this;

           const update = {squares:stateCopy.board, 
                                        xIsNext:stateCopy.xGo}
   
   return this.setState((prevState => update), () => cb(stateCopy, that));
  };

 makeMove(state, move){
   state.squares[move] = this.state.xIsNext ? 'X' : 'O';
           state.xIsNext = !this.state.xIsNext;
       
          return this.setState(prevState => state);
 }

// // makeMove(state, move, cb){
// //    state.squares[move] = this.state.xIsNext ? 'X' : 'O';
// //            state.xIsNext = !this.state.xIsNext;
// //           return this.setState(prevState1 => state, () => cb(stateCopy))
// //  }



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
      this.state.isPvp ? status = "Next player is: " + (this.state.xIsNext ? 'X': 'O') : this.state.xIsNext ? status = "Your turn" : status = "Computer is having a ponder...";
    }



    return (
      <div className='board-container'>
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



// ========================================

ReactDOM.render(
  <Board />,
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
  state.xGo = !state.xGo;
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
 return i===0? '0': i
  }


function makeMove(state, index) {
  state.move = index;
  // console.log("make move: state");
  // console.log(state);
  state.board[index] = state.xGo ? 'X' : 'O' ;
  //console.log(state.board)
     if (isGameWon(state) || draw(state)){
    return score(state); 
  }else{

    togglePlayer(state)
  
    pilePlusOne(state);
    return state;
 }
}

function returnIndexOfAvailableMoves(state){
 // debugger
  // console.log("returnIndexOfAvailableMoves: state")
  // console.log(state)
  if (state.board){
 //   console.log("returnIndexOfAvailableMoves: state.board")
  // console.log(state.board)
    var arr = state.board.map((element, index) => {
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
    if (state.board[a] && state.board[a] === state.board[b] && state.board[a] === state.board[c]) {
      return true;
    }
  }
  return false;
}

function score(state) {
  if (state.board && isGameWon(state)) {
    if(state.xGo){
      state.points = 10000 - state.piles;
      return state;
    }else{
      state.points = -10000 + state.piles;
      return state;
    }
    
  } else if (state.board && isGameWon(state) === false){
    state.points = 0;
    return state;
  }
}

function draw(state) {
  let board =state.board;

 let noNullValues = board.filter(getRidOfNullValues);

  // console.log("noNullValies")
  // console.log(noNullValues)

  if(noNullValues.length === 0){
    return true;
  }else{return false}
}

function getRidOfNullValues(i){
 return i === null;
}


function returnBestScore(state, scores){
  if (state.xGo) {
    var bestScore;
  let indexMax = scores.map(i => i.points).reduce((accum, x, currentIndex, arr) => x > arr[accum] ? currentIndex : accum, 0); 
  bestScore = scores[indexMax];
  } else{
  let indexMin = scores.map(i => i.points).reduce((accum, x, currentIndex, arr) => x < arr[accum] ? currentIndex : accum, 0);
        bestScore = scores[indexMin];
  }
return bestScore;
}

function returnBestMove(state, scores, moves){
  if (state.xGo) {
    var bestMove;
  let indexMax = scores.map(i => i.points).reduce((accum, x, currentIndex, arr) => x > arr[accum] ? currentIndex : accum, 0); 
  bestMove = moves[indexMax];
  } else{
  let indexMin = scores.map(i => i.points).reduce((accum, x, currentIndex, arr) => x < arr[accum] ? currentIndex : accum, 0);
        bestMove = moves[indexMin];
  }
return bestMove;
}


function minimax(state, counter){


state.isRootNode = counter ? false : true;


  if (isGameWon(state) || draw(state)){
    return score(state); 
  }

let moves = returnIndexOfAvailableMoves(state).map(i => Number(i));

  var scores = moves.map(index => {
  let move = makeMove(cloneObj(state), index);
    return minimax(move, 'not root node')
  })


let flattenScore = _.flatten(scores);

// console.log("flattenscore")
// console.log(flattenScore)


let bestScore = returnBestScore(state, flattenScore);


if (state.isRootNode){
  return returnBestMove(state, flattenScore, moves);
} else{return bestScore}


}








