import {
    togglePlayer,
    tickIncrement,
    getRidOfNullValues
} from "./utilityFunctions";

function clone(state){
    let squaresCopy = state.squares.slice();
    let copy = {...state, squares: squaresCopy};
    return copy;
  }

  function simulateMove(state, index) {
    state.move = index;
   
    state.squares[index] = state.xIsNext ? 'X' : 'O';
   
       if (isGameWon(state) || isDraw(state)){
      return score(state); 
    }else{
  
      togglePlayer(state)
    
      tickIncrement(state);
      return state;
   }
  }
  
  function returnIndexOfAvailableMoves(state){
    try{
      if (state.squares){
      return state.squares.map((element, index) => {
      if (element===null) {
        return index
      }
    }).filter(i => i===0 ? '0': i);
    } else{
      throw Error('Function argument is not a state object') 
    } 
  } catch(e){
    console.log(e);
      throw e;
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
        state.points = 10000 - state.tick;
        return state;
      }else{
        state.points = -10000 + state.tick;
        return state;
      }
      
    } else if (state.squares && isGameWon(state) === false){
      state.points = 0;
      return state;
    }
  }

  function isDraw(state) {
    let squares = state.squares;
  
   let isDrawValues = squares.filter(getRidOfNullValues);
  
    if(isDrawValues.length === 0){
      return true;
    }else{return false}
  }

  function returnBestScore(state, scores){
    if (state.xIsNext) {
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
    if (state.xIsNext) {
      var bestMove;
    let indexMax = scores.map(i => i.points).reduce((accum, x, currentIndex, arr) => x > arr[accum] ? currentIndex : accum, 0); 
    bestMove = moves[indexMax];
    } else{
    let indexMin = scores.map(i => i.points).reduce((accum, x, currentIndex, arr) => x < arr[accum] ? currentIndex : accum, 0);
          bestMove = moves[indexMin];
    }
  return bestMove;
  }

 export {
    clone,
    simulateMove,
    returnBestMove, 
    returnBestScore, 
    isDraw,
    score,
    isGameWon,
    returnIndexOfAvailableMoves }