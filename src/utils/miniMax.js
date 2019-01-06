import {
  cloneObj,
  makeMove,
  returnBestMove, 
  returnBestScore, 
  noNull,
  score,
  isGameWon,
  returnIndexOfAvailableMoves } 
  from "../utils/miniMaxHelperFunctions";

var _ = require('lodash');

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
  
  }


  export default minimax;