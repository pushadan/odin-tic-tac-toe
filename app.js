class TicTacToeGame{
  constructor(){
    this.p1Wins = 0;
    this.p2Wins = 0;
    this.playersArray = [];
    this.winningPlayer = null;
    this.board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];

  }

  makePlayer(playerName, playerSymbol){
    const player = new Player(playerName, playerSymbol);
    this.assignPlayer(player);
  }

  assignPlayer(player){
    if (this.playersArray.length == 0){
      this.playersArray[0] = player;
      console.log(`${player} is P1!`)
    }
    if (this.playersArray.length == 1){
      this.playersArray[1] = player;
      console.log(`${player} is P2!`)
    }
    else {alert("Two players already exist")}
  }


  startGame(){
    
  }

  checkWin(){
    //check for winner
    for (let i=0;i<9;i++){
      this.startRound();
    }
  }

  gameResult(){}

  addWin(winningPlayer){
    if (winningPlayer === 0){
      p1Wins++;
    }
    else {p2Wins++};
  }

  //
  replay(){
    this.test++
    console.log(this.test);
  }

}

class Player{
  constructor(playerName, playerSymbol){
    this.playerName = playerName;
    this.playerSymbol = playerSymbol;
  }
}


const newGame = new TicTacToeGame(["Danny","Sam"],);

console.log({newGame});