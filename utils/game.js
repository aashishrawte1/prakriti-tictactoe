const readline = require('readline')

'use strict';

class TicTacToe {
  constructor(){
    this.ticTacToe = [];
    this.ticTacToe[8] = undefined;
    this.ticTacToeLayout = '';
    this.currentPlayer = false;
    this.gameEnded = false;
    this.moveRegister = [];
    
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

  }

  updateLayout(){
    this.ticTacToeLayout = `${this.displayItem(this.ticTacToe[0])} | ${this.displayItem(this.ticTacToe[1])} | ${this.displayItem(this.ticTacToe[2])}
---------
${this.displayItem(this.ticTacToe[3])} | ${this.displayItem(this.ticTacToe[4])} | ${this.displayItem(this.ticTacToe[5])}
---------
${this.displayItem(this.ticTacToe[6])} | ${this.displayItem(this.ticTacToe[7])} | ${this.displayItem(this.ticTacToe[8])}`;
}

  startGame(){
    this.displayLayout();

    this.rl.on("line", (input) => {

      if(this.ticTacToe.length <= 9){
        this.readMove(parseInt(input))
      } else {
        console.log("Game Ended!");
        this.processGame();
      }
    })

    process.stdin.on('keypress', (str, key) => {
      if(key.sequence === '\b'){
        this.deleteLastMove()
      }
    })
  }

  endGame(){
    this.rl.close();
    this.gameEnded = true;
    console.log("Moves history --- ")
    console.log(this.moveRegister)
    process.exit();
    return false; 
  }

  continuePlay(){
    this.displayLayout();
    this.processGame();
    if(!this.gameEnded){
      this.currentPlayer = arguments[0] ? this.currentPlayer : !this.currentPlayer;
      console.log(`Player ${this.displayPlayer(this.currentPlayer)}, Your move! (position[1-9]): `)
    }
  }

  processGame(){
    if(this.moveRegister.length >= 5){
      var checkSet = new Set()
      if(this.ticTacToe[0] && this.ticTacToe[3] && this.ticTacToe[6] && (Array.from(checkSet.add(this.ticTacToe[0]).add(this.ticTacToe[3]).add(this.ticTacToe[6])).length === 1)){
        console.log(`Player ${this.getPlayerFromChar(this.ticTacToe[0])} Wins!!`);
        this.endGame();
      }
      checkSet.clear();
      if(this.ticTacToe[1] && this.ticTacToe[4] && this.ticTacToe[7] && (Array.from(checkSet.add(this.ticTacToe[1]).add(this.ticTacToe[4]).add(this.ticTacToe[7])).length === 1)){
        console.log(`Player ${this.getPlayerFromChar(this.ticTacToe[1])} Wins!!`);
        this.endGame();
      }
      checkSet.clear();
      if(this.ticTacToe[2] && this.ticTacToe[5] && this.ticTacToe[8] && (Array.from(checkSet.add(this.ticTacToe[2]).add(this.ticTacToe[5]).add(this.ticTacToe[8])).length === 1)){
        console.log(`Player ${this.getPlayerFromChar(this.ticTacToe[2])} Wins!!`);
        this.endGame();
      }
      checkSet.clear();
      if(this.ticTacToe[0] && this.ticTacToe[1] && this.ticTacToe[2] && (Array.from(checkSet.add(this.ticTacToe[0]).add(this.ticTacToe[1]).add(this.ticTacToe[2])).length === 1)){
        console.log(`Player ${this.getPlayerFromChar(this.ticTacToe[0])} Wins!!`);
        this.endGame();
      }
      checkSet.clear();
      if(this.ticTacToe[3] && this.ticTacToe[4] && this.ticTacToe[5] && (Array.from(checkSet.add(this.ticTacToe[3]).add(this.ticTacToe[4]).add(this.ticTacToe[5])).length === 1)){
        console.log(`Player ${this.getPlayerFromChar(this.ticTacToe[3])} Wins!!`);
        this.endGame();
      }
      checkSet.clear();
      if(this.ticTacToe[6] && this.ticTacToe[7] && this.ticTacToe[8] && (Array.from(checkSet.add(this.ticTacToe[6]).add(this.ticTacToe[7]).add(this.ticTacToe[8])).length === 1)){
        console.log(`Player ${this.getPlayerFromChar(this.ticTacToe[6])} Wins!!`);
        this.endGame();
      }
      checkSet.clear();
      if((this.ticTacToe[0] && this.ticTacToe[4] && this.ticTacToe[8] && (Array.from(checkSet.add(this.ticTacToe[0]).add(this.ticTacToe[4]).add(this.ticTacToe[8])).length === 1)) || (this.ticTacToe[2] && this.ticTacToe[4] && this.ticTacToe[6] && (Array.from(checkSet.add(this.ticTacToe[2]).add(this.ticTacToe[4]).add(this.ticTacToe[6])).length === 1))){
        console.log(`Player ${this.getPlayerFromChar(this.ticTacToe[4])} Wins!!`);
        this.endGame();
      }
      checkSet.clear();
    }
  }

  displayItem(item){
    return item === undefined ? ' ' : item
  }

  displayPlayer(plyr){
    return plyr ? 1 : 2
  }

  getPlayerFromChar(char){
    return this.displayPlayer(char === 'X')
  }

  getCharacter(plyr){
    return plyr ? 'X' : 'O'
  }
  
  displayLayout(){
    this.updateLayout()
    console.log(this.ticTacToeLayout);
  }


  readMove(position){
    var self = this
    if((position > 9) || position < 1){
      self.moveError("Wrong position!!! ");
    }
    if(self.ticTacToe[(position - 1)] !== undefined){
      console.log(self.ticTacToe[(position - 1)])
      self.moveError("Position Occupied!!! ");
    } else {
      self.ticTacToe[(position - 1)] = self.getCharacter(self.currentPlayer);
      self.recordMove((position - 1), self.currentPlayer);
      self.continuePlay();
    }
  }

  moveError(message){
    console.log(`${arguments[0] ? arguments[0]:''}Player ${this.displayPlayer(this.currentPlayer)}, Your move! (position[1-9]): `)
  }

  recordMove(position, player){
    this.moveRegister.push({
      position: position,
      char: this.getCharacter(this.currentPlayer),
      player: this.displayPlayer(this.currentPlayer)
    });
  }

  deleteLastMove(){
    if(this.moveRegister.length > 1){
      var pos = this.moveRegister[(this.moveRegister.length - 1)].position
      this.ticTacToe[pos] = ' '
      this.moveRegister.pop();
      this.continuePlay()
    } else {
      console.log("Can't delete any more moves!!");
      this.continuePlay(true);
    }
  }

  processInput(moveContents){
    var mc = new Set(moveContents);
    this.recordMove(mc[0], mc[1], currentPlayer);
  }

}

const game = new TicTacToe();
game.startGame();