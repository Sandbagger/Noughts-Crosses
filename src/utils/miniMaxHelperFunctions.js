import {
    togglePlayer,
    tickIncrement,
    getRidOfNullValues
} from "./utilityFunctions";

function cloneObj(state){
    let squaresCopy = state.squares.slice();
    let copy = {...state, squares: squaresCopy};
    return copy;
  }

  function makeMove(state, index) {
    state.move = index;
   
    state.squares[index] = state.xIsNext ? 'X' : 'O' ;
   
       if (isGameWon(state) || noNull(state)){
      return score(state); 
    }else{
  
      togglePlayer(state)
    
      tickIncrement(state);
      return state;
   }
  }
  
  function returnIndexOfAvailableMoves(state){
 
    if (state.squares){
   
      var arr = state.squares.map((element, index) => {
      if (!element) {
        return  index}
      })
  
         let freeMoves = arr.filter(i => i===0 ? '0': i);
       
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

  function noNull(state) {
    let squares = state.squares;
  
   let noNullValues = squares.filter(getRidOfNullValues);
  
    if(noNullValues.length === 0){
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
    cloneObj,
    makeMove,
    returnBestMove, 
    returnBestScore, 
    noNull,
    score,
    isGameWon,
    returnIndexOfAvailableMoves }