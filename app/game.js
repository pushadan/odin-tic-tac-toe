class TicTacToeGame{
  constructor(){
    // this.p1Wins = 0;
    // this.p2Wins = 0;
    this.playersArray = [];
    this.playerTurn;
    // this.winningPlayer;
    this.board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    //new players obj
    this.players = new Player;
    //new game UI obj
    this.UI = new GameUI;
    //board cells for event listeners (I count this as functionality not UI)
    this.boardCell = document.querySelectorAll(".board");
  }

  beginGame(){
    //get player data, assigns player obj to players array
    this._initPlayers();
    //set turn to player 1
    this.playerTurn = 0;
    //add event listeners to board cells
    this._initAddGameEventListeners();
    //set initial screen UI
    this._initUI();
  }

  _playerMove(boardSection){
    //add to board
    const row = boardSection.className.slice(7,8);
    const column = boardSection.className.slice(10,11);
    this.board[row][column] = this.playersArray[this.playerTurn].playerSymbol;
    
    //add to UI board
    boardSection.textContent = this.playersArray[this.playerTurn].playerSymbol;

    //set turn to other player
    if (this.playerTurn === 0){
      this.playerTurn = 1;
    } else {
      this.playerTurn = 0;
    }

    //set turn to other player in UI
    this.UI.setTurn(this.playerTurn);
  }

  _initAddGameEventListeners(){    
    for (let i=0; i < this.boardCell.length; i++){
      this.boardCell[i].addEventListener("click", ()=>{
        this._playerMove(this.boardCell[i])
      });
    }
  }
  
  _initPlayers(){
    //gets player data from fields on home screen
    this.players.capturePlayerData();
    //assign players to the game object
    this.playersArray = this.players.playerData;
  }

  _initUI(){
    this.UI.populatePlayerNames(this.playersArray[0].playerName, this.playersArray[1].playerName);
    this.UI.setTurn(this.playerTurn);
    this.UI.clearBoard();
  }

  //checks for win
  _checkWin(){
    const checkWin = new CheckWin;
    checkWin.checkAll();
  }

  _addWin(){}
}

class Player{
  constructor(){
    this.playerData;
  }
  //retrieve player data from localStorage (captured in homepage)
  //assign to Player class array
  capturePlayerData(){
    const playerDataString = localStorage.getItem('playerData');
    this.playerData = JSON.parse(playerDataString);
  }
}

class GameUI{
  constructor(){
    this.player1name = document.querySelector("#player1name");
    this.player1turn = document.querySelector("#player1turn");
    this.player2name = document.querySelector("#player2name");
    this.player2turn = document.querySelector("#player2turn");
    this.replayBtn = document.querySelector("#replayBtn");
    this.board = document.querySelectorAll(".board");
  }

  populatePlayerNames(p1name, p2name){
    this.player1name.textContent = `${p1name}:`;
    this.player2name.textContent = `${p2name}:`;
  }

  setTurn(playerTurn){ 
    if(playerTurn === 0){
      this.player1turn.textContent = ">";
      this.player2turn.textContent = "";
      return;
    }
    if(playerTurn === 1){
      this.player1turn.textContent = "";
      this.player2turn.textContent = ">";
      return;
    }
    console.error("Check setTurn()");
  }

  clearBoard(){
    for(let i=0; i < this.board.length; i++){
      this.board[i].textContent = ""
    }
  }


  updateScore(){
  }
  
}


class CheckWin{
  constructor(){
    this.xCount = 0;
    this.oCount = 0;
    this.winningPlayer;
  }

  checkAll(){
    this._checkColumnAndRows();
    this._checkCross();
    this._checkReverseCross();
  }

  _checkColumnAndRows(){
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
            this.xCount++;
          }
          if (direction === "O"){
            this.oCount++;
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
    this.xCount = 0;
    this.oCount = 0;
    //check cross
    for(let i=0; i<3; i++){
      if (this.board[i][i] === "X"){
        this.xCount++;
      }
      if (this.board[i][i] === "O"){
        this.oCount++;
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
    this.xCount = 0;
    this.oCount = 0;
  }

  _checkReverseCross(){
    this.xCount = 0;
    this.oCount = 0;
    //check reverse cross
    let j = 2;
    for(let i=0; i<3; i++){
      if (this.board[i][j] === "X"){
        this.xCount++;
      }
      if (this.board[i][j] === "O"){
        this.oCount++;
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
    this.xCount = 0;
    this.oCount = 0;
  }
}



//On start (IIFE - Immediate Invoked Function Expression)
(function() {
  console.log("IIFE has begun");

  const newGame = new TicTacToeGame;
  console.log({newGame});
  
  newGame.beginGame();

  console.log(newGame.playersArray);



})();
