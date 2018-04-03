import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
        stateCopy.squares[maxMin(ply3)] = 'O';
      }

}else {
  // Its O's turn
    if (!this.state.isPvp) {
       //playing against computer
       stateCopy.squares[maxMin(stateCopy)] = 'O';
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


function maxMin(state) {
  const stateCopy = JSON.parse(JSON.stringify(state));

  console.log("stateCopy "+ stateCopy)

const possibleStateArr = possibleMoves(stateCopy)
                        .map((i) => simulateMakeMove(i, JSON.parse(JSON.stringify(stateCopy))))
                        .map((i) => simulateFurtherMoves(i));

console.log("possibleStateArr " + possibleStateArr)
const flat = flatten(possibleStateArr);

console.log("flat " + flat)
return returnMoveLowestScore(flat);
//const rateEachPossibleMove =

}


function possibleMoves(state) {

return state.squares.map(function (e, i){
  if (e === null){
    return i;}})

.filter(x => x != null)
}


function simulateMakeMove(possibleMoveIndex, state) {
   state.MoveIndex = possibleMoveIndex;
   state.squares[possibleMoveIndex] = state.xIsNext ? 'X' : 'O';
  // console.log("inside makeMOve " + state.squares);
   state.xIsNext =  !state.xIsNext;
   return state;
} 

function simulateFurtherMoves(state) {

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
      return state;
    }
  }
  return [state, maxMin(state)];
}


function returnMoveLowestScore (arr) {
  const movesWithScore = sortMove(arr).map(i => reduceArr(i, i[0]))
  
console.log("movesWithScore " + movesWithScore)
  const result = movesWithScore[0].MoveIndex;
  return result;
}



function sortMove(arr){
  const sort = [];
  [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (i){
    if (arr.filter(j => j.MoveIndex === i).length > 0 ){
     sort.push([].concat(arr.filter(j => j.MoveIndex === i)));
  } else {
    return;
  }
            })
  console.log("sortMove " + sort)
return sort;
}


function reduceArr (arr, obj) {
  const score = arr.map(i => i.points)
  .reduce((accum, j) => accum + j)
obj.points = score;
console.log("reduceArr " + obj)
return obj;

}


function flatten(arr) {
  const flat = [].concat(...arr);
  return flat.some(Array.isArray) ? flatten(flat) : flat;
}







function calculateNextMove(squares) {

let moves = squares.map(function (e, i){
  if (e === null){
    return i;}})

.filter(x => x != null)

return moves[0]

}





var ply3 = {
  squares: [null, 'O', 'O', null, 'X', 'X', 'X', null, null],
  xIsNext: false,
  isPvp: false,
  points: 0,
                }