import React, {Component} from 'react';
import Square from '../components/Square';
import Settings from './Settings';
import {minimax, calculateWinner} from '../utils/miniMax';

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
  
  
  
  computerMove(stateCopy, that) {
      console.log("statecopy")
        console.log(stateCopy);
     if (!stateCopy.isPvp){
        stateCopy.squares[minimax(stateCopy)] = stateCopy.xIsNext ? 'X' : 'O';
         stateCopy.xIsNext = !stateCopy.xIsNext;
     console.log("statecopy2")
        console.log(stateCopy);
      return that.setState(prevState => stateCopy);
  
    };
  }
  
    handleClick(cb, i) {
  console.log('i')
  console.log(i)
      const stateCopy = JSON.parse(JSON.stringify(this.state)); 
  
    if (calculateWinner(stateCopy.squares) || stateCopy.squares[i]) {
        console.log(" turn passed");
        return;
      }else{
  
         stateCopy.squares[i] = stateCopy.xIsNext ? 'X' : 'O';
             stateCopy.xIsNext = !stateCopy.xIsNext;
  
             const that = this;
  
            return this.setState(prevState => stateCopy, ()=>cb(stateCopy, that))
      }
     
    };
  
  //  makeMove(state, move){
  //    state.squares[move] = this.state.xIsNext ? 'X' : 'O';
  //            state.xIsNext = !this.state.xIsNext;
         
  //           return this.setState(prevState => state);
  //  }
  
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
  
  
  export default Board;