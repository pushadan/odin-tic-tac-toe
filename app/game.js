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

  startGame(){
    //create players from user input, assigns player obj to players array
    this._createNewPlayers();
    
    //game loop until there is an overall winner, best out of 3
    while(this.p1Wins < 3 || this.p2Wins < 3){
      //display board in console
      console.log(this.board);

      //allow player 1 to enter positon
      this.getInputAndSetBoard(this.playersArray[0].playerName, this.playersArray[0].playerSymbol)

      //check for winner
      this._checkWin();

      //allow player 2 to enter postion
      this.getInputAndSetBoard(this.playersArray[1].playerName, this.playersArray[1].playerSymbol)

      //check for winner
      this._checkWin();

    }
    
    //prompt for replay
  }
  
  getInputAndSetBoard(name, symbol){
    const column = prompt(`${name}'s turn: what column?`);
    const row = prompt(`${name}'s turn: what row?`);

    this.board[row][column] = symbol;
  }

  //
  replay(){
  }

  _createNewPlayers(){
    this._promptUserForPlayers();
  }
  
  //prompts user for player creation, captures name and symbol.
  //calls _createPlayerObj()
  _promptUserForPlayers(){
    //get players via prompt()
    const player1name = prompt("Player one name:");
    const player1symbol = prompt("Player one symbol:");
    this._createPlayerObj(player1name, player1symbol);

    const player2name = prompt("Player two name:");
    const player2symbol = prompt("Player two symbol:");
    this._createPlayerObj(player2name, player2symbol);    
  }

  //creates a player obj using _playerObjCreator() factory 
  //calls _assignPlayer();
  _createPlayerObj(playerName, playerSymbol){
    //check if 2 players already exist
    if (this.playersArray.length > 1){
      return console.error("Two players already exist");
    }
    //factory function to create player objects
    const _playerObjCreator = (playerName, playerSymbol) => {
      return {
        playerName: playerName,
        playerSymbol: playerSymbol
      }
    }
    //create player obj
    const player = _playerObjCreator(playerName, playerSymbol);
    console.log(`player made: ${playerName}, ${playerSymbol}`);
    this._assignPlayer(player);
  }

  //assign player to players array
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
    console.error("Error, check _assignPlayer() method");
    console.table(this.playersArray);
  }

  //checks columns, rows, cross and reverse cross
  _checkWin(){
    this._checkColumnAndRows();
    this._checkCross();
    this._checkReverseCross();
  }

  _checkColumnAndRows(){
    let xCount = 0;
    let oCount = 0;
    //start by checking columns
    let checkColumnsFlag = true;
    //check columns then rows, loops twice
    for(let i=0; i<2; i++){
      //check each column, loop 3 times
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
        if(xCount === 3){ 
          return console.log("X WIN"); 
        }
        //if current column has 3 Os, Player O wins!
        if(oCount === 3){ 
          return console.log("O WIN"); 
        }
        //zero out count for next column
        xCount = 0;
        oCount = 0;
      }
      //switch to rows, loop through again
      checkColumnsFlag = false; 
      //zero out count for rows
      xCount = 0;
      oCount = 0;
    }
  }

  _checkCross(){
    let xCount = 0;
    let oCount = 0;
    //check cross
    for(let i=0; i<3; i++){
      if (this.board[i][i] === "X"){
        xCount++;
      }
      if (this.board[i][i] === "O"){
        oCount++;
      }
    }
    //if current column has 3 Xs, Player X wins!
    if(xCount === 3){ 
      return console.log("X WIN"); 
    }
    //if current column has 3 Os, Player O wins!
    if(oCount === 3){ 
      return console.log("O WIN"); 
    }
    //reset for next column
    xCount = 0;
    oCount = 0;
  }

  _checkReverseCross(){
    let xCount = 0;
    let oCount = 0;
    //check reverse cross
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
    if(xCount === 3){ 
      return console.log("X WIN"); 
    }
    //if current column has 3 Os, Player O wins!
    if(oCount === 3){ 
      return console.log("O WIN"); 
    }
    //reset for next column
    xCount = 0;
    oCount = 0;
  }

  _addWin(winningPlayer){
    if (winningPlayer === 0){
      p1Wins++;
      return;
    }
    else {p2Wins++};
  }
}


//On start (IIFE - Immediate Invoked Function Expression)
(function() {
  console.log("IIFE has begun");

  const newGame = new TicTacToeGame;
  console.log({newGame});
  
  // newGame.startGame();



})();
