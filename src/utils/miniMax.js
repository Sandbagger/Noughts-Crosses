import {
  clone,
  simulateMove,
  returnBestMove, 
  returnBestScore, 
  isDraw,
  score,
  isGameWon,
  returnIndexOfAvailableMoves } 
  from "../utils/miniMaxHelperFunctions";

function minimax(state){
    state.tick = state.tick || 0;
    state.points = state.points || 0;
  
    if (isGameWon(state) || isDraw(state)){ 
      return score(state); 
    }
  
  let moves = returnIndexOfAvailableMoves(state);
  
    var scores = moves.map(index => {
    let move = simulateMove(clone(state), index);
      return minimax(move)
    })

  let flattenScore = [].concat(...scores);
  
  let bestScore = returnBestScore(state, flattenScore);
  
  
  if (state.tick === 0){
    return returnBestMove(state, flattenScore, moves);
  } else{return bestScore}
  
  }


  export default minimax;