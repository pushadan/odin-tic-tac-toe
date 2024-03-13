class TicTacToeGame{
  constructor(){
    this.playersArray = [];
    this.playerTurn = 0;
    this.winnerFlag = false;
    this.numberOfMoves = 0;
    this.board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    //new players obj
    this.players = new Player;
    //new game UI obj
    this.UI = new GameUI;
    //new checkWin obj
    this.checkWin = new CheckWin;
    //board cells for event listeners (I count this as functionality not UI)
    this.boardCell = document.querySelectorAll(".board");
    //replay button for event listners
    this.replayBtn = document.querySelector("#replayBtn");
  }

  newGame(){
    //get player data, assigns player obj to players array
    this._initPlayers();
    //add event listeners to board cells
    this._initAddGameEventListeners();
    //set initial screen UI
    this._initUI();
  }

  _gameLoop(boardSection){
    //add to board
    const row = boardSection.className.slice(7,8);
    const column = boardSection.className.slice(10,11);
    //catch if player already placed symbol in cell
    if (this.board[row][column] !== 0){
      alert("Stop trying to cheat!"); 
      return; 
    }    
    this.board[row][column] = this.playersArray[this.playerTurn].playerSymbol;  

    //add to UI board
    boardSection.textContent = this.playersArray[this.playerTurn].playerSymbol;

    //add to count number of moves
    this.numberOfMoves++;
    //check for draw
    if (this.numberOfMoves >= 9){
      this._draw();
      this.numberOfMoves = 0;
      return;
    }

    //check winner, add win if there's a winner
    this._checkWin();

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
        this._gameLoop(this.boardCell[i])
      });
    }

    this.replayBtn.addEventListener("click", ()=>{
      this._replay();
      this.UI.closeReplayDialog();
    });
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
    this.checkWin.checkAll(this.board);
    this.winnerFlag = this.checkWin.win;

    if (this.winnerFlag === true){
      this._addWin();
    }
  }

  _addWin(){
    //add win to winning player
    this.playersArray[this.playerTurn].wins++;
    //reset number of moves
    this.numberOfMoves = 0;
    //update UI 
    this.UI.updateScore(this.playerTurn,this.playersArray[this.playerTurn].wins);
    //open replay dialog, show winner
    this.UI.openReplayDialog(this.playersArray[this.playerTurn]);
  }

  _draw(){
    //open replay dialog, show draw
    this.UI.openReplayDialog();
  }

  _replay(){
    //clear board
    this.board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    //set no winner
    this.winnerFlag = false;
    this.checkWin.win = false;
    //set turn to player 1
    this.playerTurn = 0;
    //clear and set UI
    this._initUI();
  }

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
    this.player1score = document.querySelector("#player1score");
    this.player2name = document.querySelector("#player2name");
    this.player2turn = document.querySelector("#player2turn");
    this.player2score = document.querySelector("#player2score");
    this.board = document.querySelectorAll(".board");

    this.replayDialog = document.querySelector("#replayDialog");
    this.winnerText = document.querySelector("#winnerText");
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

  updateScore(player, score){
    if (player === 0){
      this.player1score.textContent = score;
    }
    if (player === 1){
      this.player2score.textContent = score;
    }
  }

  openReplayDialog(player){
    if(player === undefined){
      this.winnerText.textContent = `DRAW!`;
    } else{
      this.winnerText.textContent = `${player.playerName} WINS!`;
    }
    this.replayDialog.showModal();
  }

  closeReplayDialog(){
    this.replayDialog.close();
  }
  
}

class CheckWin{
  constructor(){
    this.xCount = 0;
    this.oCount = 0;
    this.win = false;
  }

  checkAll(board){
    this._checkColumnAndRows(board);
    this._checkCross(board);
    this._checkReverseCross(board);
  }

  _checkColumnAndRows(board){
    //start by checking columns
    let checkColumnsFlag = true;
    //check columns then rows, loops twice
    for(let i=0; i<2; i++){
      //check each column, loop 3 times
      for(let x=0; x<3; x++){
        //count up Xs and Os in current column
        for(let y=0; y<3; y++){
          //if checkColumnsFlag = true, check columns, else check rows
          const direction = checkColumnsFlag ? board[y][x] : board[x][y]; 
          //count up Xs or Os if they exist in current column
          if (direction === "X"){
            this.xCount++;
          }
          if (direction === "O"){
            this.oCount++;
          }
        }
        //if current column has 3 Xs, Player X wins!
        if(this.xCount === 3){ 
          this.win = true; 
          return;
        }
        //if current column has 3 Os, Player O wins!
        if(this.oCount === 3){ 
          this.win = true; 
          return;
        }
        //zero out count for next column
        this.xCount = 0;
        this.oCount = 0;
      }
      //switch to rows, loop through again
      checkColumnsFlag = false; 
      //zero out count for rows
      this.xCount = 0;
      this.oCount = 0;
    }
  }

  _checkCross(board){
    this.xCount = 0;
    this.oCount = 0;
    //check cross
    for(let i=0; i<3; i++){
      if (board[i][i] === "X"){
        this.xCount++;
      }
      if (board[i][i] === "O"){
        this.oCount++;
      }
    }
    //if current column has 3 Xs, Player X wins!
    if(this.xCount === 3){ 
      this.win = true; 
      return; 
    }
    //if current column has 3 Os, Player O wins!
    if(this.oCount === 3){ 
      this.win = true; 
      return;
    }
    //reset for next column
    this.xCount = 0;
    this.oCount = 0;
  }

  _checkReverseCross(board){
    this.xCount = 0;
    this.oCount = 0;
    //check reverse cross
    let j = 2;
    for(let i=0; i<3; i++){
      if (board[i][j] === "X"){
        this.xCount++;
      }
      if (board[i][j] === "O"){
        this.oCount++;
      }
      j--;
    }
    //if current column has 3 Xs, Player X wins!
    if(this.xCount === 3){ 
      this.win = true; 
      return; 
    }
    //if current column has 3 Os, Player O wins!
    if(this.oCount === 3){ 
      this.win = true; 
      return;
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
  
  newGame.newGame();

  console.log(newGame.playersArray);



})();
