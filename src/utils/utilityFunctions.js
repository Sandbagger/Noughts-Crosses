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
    state.xIsNext = !state.xIsNext;
  return state;
  }
  
  function tickIncrement(state){ 
    state.tick = state.tick += 1 || 1;
    return state;
    } 
  
  function getRidOfUndefinedValues(i){ 
   return i===0? '0': i
    }
  
  function getRidOfNullValues(i){
   return i === null;
  }
  
  
 
  export {calculateWinner,
            togglePlayer,
            tickIncrement,
            getRidOfUndefinedValues,
           getRidOfNullValues,
            }