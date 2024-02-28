class TicTacToeGame{
  constructor(){

    this.addPlayer = function(playerName, playerSymbol){
      const player = new Player(playerName, playerSymbol);
      this.assignPlayer(player);

      if (playersArray.length == 0){
        this.playersArray[0] = player;
      }
      if (playersArray.length == 1){
        this.playersArray[1] = player;
      }
      else {console.warn("Two players already exist")}
    }

    this.addWin = function(winningPlayer){
      if (winningPlayer === 0){
        p1Wins++;
      }
      else {p2Wins++};
    }

    this.setRound = function(rounds){
      roundsToWin = rounds;
    }

    const playersArray = [];
    const p1Wins = 0;
    const p2Wins = 0;
    const roundsToWin = 0;
    const winningPlayer = null;
  }

  // newPlayer(playerName, playerSymbol){
  //   const player = new Player(playerName, playerSymbol);
  //   this.assignPlayer(player);
  // }

  // assignPlayer(player){
  //   if (this.playersArray)
  //   this.playersArray[0] = player;
  // }


  startGame(numOfRounds){
    for (let i=0;i<numOfRounds;i++){
      this.startRound();
    }
  }

  startRound(){}

  roundResult(){}

  replay(){
    console.log(p1Wins);
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