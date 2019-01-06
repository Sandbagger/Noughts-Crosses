This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Noughts and Crosses App
- Noughts and Crosses (Tic-tac-toe) app with a player verses computer mode. 
- Player verses computer mode implemented with a minimax function.
- Minimax function is a recursive algorithm that traverses all the nodes of a game tree, assigning a value to a node based on opponent playing optimally and minimizing their chances to win. 
- I have introduced a temporal discount to the calculation of the winning state, in order to give greater weight to a path that leads to a non-losing state, sooner rather than later.

### Issues
-	React batch renders player/computer moves.
-	Slow performance of minimax function. 

### Solutions
-	Currently, the computer move is initiated via a callback function in a click event handler. Perhaps refactor through use of life cycle methods?
-	Improve minimax function by implementing alpha/beta pruning.  
Visit app here: https://sandbagger.github.io/Noughts-Crosses/
