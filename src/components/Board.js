import React, {Component} from 'react';
import Square from '../components/Square';
import Settings from './Settings';
import {minimax, calculateWinner} from '../utils/miniMax';

class Board extends React.Component {
    constructor(props){
      super(props);
      this.computerMove = this.computerMove.bind(this)
      this.state = {
        squares: [null, null, null, null, null, null, null, null, null],
        xIsNext: true,
        isPvp: true,
      }
    }
  
    renderSquare(i) {
      return <Square 
      value={this.state.squares[i]}
      onClick={()=>this.registerPlayerMove(i, this.computerMove)}
      />;
    }
  
    renderSettings() {
      return <Settings 
       onClickPvp={()=>this.handleRadio("pvp")}
       onClickPvc={()=>this.handleRadio("pvc")}
       onClickReset={()=>this.handleReset()}
      
       />;
      
    }
  
  
  
  computerMove() {
  
     if (!this.state.isPvp){
        let stateUpdate = {...this.state};

        stateUpdate.squares[minimax(stateUpdate)] = stateUpdate.xIsNext ? 'X' : 'O';
         stateUpdate.xIsNext = !stateUpdate.xIsNext;
  
      return this.setState(prevState => stateUpdate);
  
    };
  }
  
    registerPlayerMove(i, startComputerMove) {
    if (calculateWinner(this.state.squares) || this.state.squares[i]) {
        return;
      }else{
        const moveUpdate = [...this.state.squares]
        moveUpdate[i] = this.state.xIsNext ? 'X' : 'O';

        const stateUpdate = {...this.state, squares: moveUpdate, xIsNext: !this.state.xIsNext}
  
            return this.setState(prevState => stateUpdate, ()=>startComputerMove())
      }
     
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
  
  
  export default Board;