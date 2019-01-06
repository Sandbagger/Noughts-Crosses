var _ = require('lodash');

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
  
  function tickIncrement(state){ 
    state.tick = state.tick += 1 || 1;
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
    state.squares[index] = state.xIsNext ? 'X' : 'O' ;
    //console.log(state.squares)
       if (isGameWon(state) || noNull(state)){
      return score(state); 
    }else{
  
      togglePlayer(state)
    
      tickIncrement(state);
      return state;
   }
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
    let squares =state.squares;
  
   let noNullValues = squares.filter(getRidOfNullValues);
  
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
  
  
  function minimax(state){
    state.tick = state.tick || 0;
    state.points = state.points || 0;
  
    if (isGameWon(state) || noNull(state)){
      return score(state); 
    }
  
  let moves = returnIndexOfAvailableMoves(state).map(i => Number(i));
  
    var scores = moves.map(index => {
    let move = makeMove(cloneObj(state), index);
      return minimax(move, 'not root node')
    })

  let flattenScore = _.flatten(scores);
  
  
  let bestScore = returnBestScore(state, flattenScore);
  
  
  if (state.tick === 0){
    return returnBestMove(state, flattenScore, moves);
  } else{return bestScore}
  
  
  };

  export {minimax, calculateWinner}