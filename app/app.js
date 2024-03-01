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
    const player = this._playerCreator(playerName, playerSymbol);
    console.log(`player made: ${playerName}, ${playerSymbol}`);
    this._assignPlayer(player);
  }

  //factory function to create player objects
  //stops devs from calling the player class in global scope
  _playerCreator(playerName, playerSymbol){
    return {
      playerName: playerName,
      playerSymbol: playerSymbol
    }
  }

  _assignPlayer(player){
    //1 player created
    if (this.playersArray.length === 1){
      this.playersArray[1] = player;
      console.log(`${this.playersArray[1].playerName} is P2!`);
      return;
    }
    //no players created yet
    if (this.playersArray.length === 0){
      this.playersArray[0] = player;
      console.log(`${this.playersArray[0].playerName} is P1!`);
      return;
    }
    console.warn("Error, check _assignPlayer() method");
    console.table(this.playersArray);
  }

  startGame(){}

  addSymbol(){}

  checkWin(){
    let xCount = 0;
    let oCount = 0;

    //***algo for checking columns and rows***
    //start by checking columns
    let checkColumnsFlag = true;
    //check columns then rows, loops twice
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
    // this.board[0][0]
    // this.board[1][1]
    // this.board[2][2]

    for(let i=0; i<3; i++){
      if (this.board[i][i] === "X"){
        xCount++;
      }
      if (this.board[i][i] === "O"){
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

    //check reverse cross
    // this.board[0][2]
    // this.board[1][1]
    // this.board[2][0]

    let j = 2;
    for(let i=0; i<3; i++){
      if (this.board[i][j] === "X"){
        xCount++;
      }
      if (this.board[i][j] === "O"){
        oCount++;
      }
      j--;
    }
    //if current column has 3 Xs, Player X wins!
    if(xCount === 3){ return console.log("X WIN"); }
    //if current column has 3 Os, Player O wins!
    if(oCount === 3){ return console.log("O WIN"); }
    //reset for next column
    xCount = 0;
    oCount = 0;
  }

  _checkColumnAndRows(){

  }

  _checkCrosses(){

  }

  gameResult(){}

  addWin(winningPlayer){
    if (winningPlayer === 0){
      p1Wins++;
      return;
    }
    else {p2Wins++};
  }

  //
  replay(){
  }

}


//testing
const newGame = new TicTacToeGame();

console.log({newGame});

newGame.makePlayer("Danny Tanabe", "X");
newGame.makePlayer("Sam Stember", "O");

newGame.makePlayer("Bean", "I");
console.table(newGame.playersArray);
