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
    //check if 2 players already exist
    if (this.playersArray.length > 1){
      return console.log("Two players already exist");
    }
    //create player
    const player = new Player(playerName, playerSymbol);
    console.log(`player made: ${playerName}, ${playerSymbol}`);
    this.assignPlayer(player);
  }

  assignPlayer(player){
    switch (this.playersArray.length){
      //no players created yet
      case 0: {
        this.playersArray[0] = player;
        console.log(`${this.playersArray[0].playerName} is P1!`);
        break;
      }
      //1 player created
      case 1: {
        this.playersArray[1] = player;
        console.log(`${this.playersArray[1].playerName} is P2!`);
        break;
      }
      default: {
        console.warn("Error, check assignPlayer() method");
        break;
      }
    }

    console.table(this.playersArray);
  }

  startGame(){
    
  }

  checkWin(){
    let xCount = 0;
    let oCount = 0;

    //***algo for checking columns and rows***
    //start by checking columns
    let checkColumnsFlag = true;
    //check columns then rows, loop twice
    for(let i=0; i<2; i++){
      //check each column loop 3 times
      for(let x=0; x<3; x++){
        //count up Xs and Os in current column
        for(let y=0; y<3; y++){
          //if checkColumnsFlag = true, check columns, else check rows
          const direction = checkColumnsFlag ? this.board[y][x] : this.board[x][y]; 
          //count up Xs or Os if they exist in current column
          if (direction === "X"){
            xCount++;
          }
          if (direction === "O"){
            oCount++;
          }
        }
        //if current column has 3 Xs, Player X wins!
        if(xCount === 3){ return console.log("X WIN"); }
        //if current column has 3 Os, Player O wins!
        if(oCount === 3){ return console.log("O WIN"); }

        //reset for next column
        xCount = 0;
        oCount = 0;
      }
      //switch to rows, loop through again
      checkColumnsFlag = false; 
    }

    //check cross
    this.board[0][0]
    this.board[1][1]
    this.board[2][2]
    
    this.board[0][2]
    this.board[1][1]
    this.board[2][0]





  
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


const newGame = new TicTacToeGame();

console.log({newGame});

newGame.makePlayer("Danny Tanabe", "X");
newGame.makePlayer("Sam Stember", "O");

newGame.makePlayer("Bean", "I");
console.table(newGame.playersArray);
