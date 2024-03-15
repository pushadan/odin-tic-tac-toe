function createGame(){
  const game = {
    playerTurn: 0,
    winnerFlag: false,
    numberOfMoves: 0,
    board: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ],

    newGame(){
      //get player data, assigns player obj to players array
      getPlayerData();
      //add event listeners to board cells
      game.UIaddGameEventListeners();
      //set initial screen UI
      game.initializeUI();
    },

    _gameLoop(boardSection){
      //add to board
      const row = boardSection.className.slice(7,8);
      const column = boardSection.className.slice(10,11);
      //catch if player already placed symbol in cell
      if (game.board[row][column] !== 0){
        alert("Stop trying to cheat!"); 
        return; 
      }    
      game.board[row][column] = game.playerData[game.playerTurn].playerSymbol;  
  
      //add to UI board
      boardSection.textContent = game.playerData[game.playerTurn].playerSymbol;
  
      //add to count number of moves
      game.numberOfMoves++;
      //check for draw
      if (game.numberOfMoves >= 9){
        _draw();
        game.numberOfMoves = 0;
        return;
      }

      //check winner, add win if there's a winner
      game.checkWin();

      //set turn to other player
      if (game.playerTurn === 0){
        game.playerTurn = 1;
      } else {
        game.playerTurn = 0;
      }

      //set turn to other player in UI
      game.UIsetTurn(game.playerTurn);
    },

    _addWin(){
      //add win to winning player
      game.playerData[game.playerTurn].wins++;
      //reset number of moves
      game.numberOfMoves = 0;
      //update UI 
      game.UIupdateScore(game.playerTurn, game.playerData[game.playerTurn].wins);
      //open replay dialog, show winner
      game.UIopenReplayDialog(game.playerData[game.playerTurn]);
    },

    _draw(){
      //open replay dialog, show draw
      game.UIopenReplayDialog();
    },

    _replay(){
      //clear board
      game.board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ];
      //set no winner
      game.winnerFlag = false;
      //set turn to player 1
      game.playerTurn = 0;
      //clear and set UI
      game.initializeUI();
    }

  }
  return Object.assign(
    game,
    getPlayerData(),
    gameUIcontroller(game),
    checkWinConditions(game),
  );
}

//This is way better.
//I can get player data and add it to the game object in one method
//This uses less code.
function getPlayerData(){
  data = {
    playerData: undefined
  }
  function capturePlayerData(){
    const playerDataString = localStorage.getItem('playerData');
    data.playerData = JSON.parse(playerDataString);  
  }
  capturePlayerData();
  return data;
}

//since I'll be calling these methods from the game object,
//they all start with UI so I don't get confused
function gameUIcontroller(game){
  player1name = document.querySelector("#player1name");
  player1turn = document.querySelector("#player1turn");
  player1score = document.querySelector("#player1score");
  player2name = document.querySelector("#player2name");
  player2turn = document.querySelector("#player2turn");
  player2score = document.querySelector("#player2score");
  board = document.querySelectorAll(".board");
  replayBtn = document.querySelector("#replayBtn");
  replayDialog = document.querySelector("#replayDialog");
  winnerText = document.querySelector("#winnerText");

  const UI = {
    initializeUI(){
      UI.UIpopulatePlayerNames(game.playerData[0].playerName, game.playerData[1].playerName);
      UI.UIsetTurn(game.playerTurn);
      UI.UIclearBoard();
    },
    UIaddGameEventListeners(){
      for (let i=0; i < board.length; i++){
        board[i].addEventListener("click", ()=>{
          game._gameLoop(board[i])
        });
      }
      replayBtn.addEventListener("click", ()=>{
        game._replay();
        game.UIcloseReplayDialog();
      });
    },
    UIpopulatePlayerNames(p1name, p2name){
      player1name.textContent = `${p1name}:`;
      player2name.textContent = `${p2name}:`;
    },
    UIsetTurn(playerTurn){ 
      if(playerTurn === 0){
        player1turn.textContent = ">";
        player2turn.textContent = "";
        return;
      }
      if(playerTurn === 1){
        player1turn.textContent = "";
        player2turn.textContent = ">";
        return;
      }
      console.error("Check setTurn()");
    },
    UIclearBoard(){
      for(let i=0; i < board.length; i++){
        board[i].textContent = ""
      }
    },
    UIupdateScore(player, score){
      if (player === 0){
        player1score.textContent = score;
      }
      if (player === 1){
        player2score.textContent = score;
      }
    },
    UIopenReplayDialog(winningPlayer){
      if(winningPlayer === undefined){
        winnerText.textContent = `DRAW!`;
      } else{
        winnerText.textContent = `${winningPlayer.playerName} WINS!`;
      }
      replayDialog.showModal();
    },
    UIcloseReplayDialog(){
      replayDialog.close();
    }
  }
  return UI;
}

function checkWinConditions(game){
  //private variables/methods
  xCount = 0;
  oCount = 0;
  const zeroOutCount = ()=>{
    xCount = 0;
    oCount = 0;
  }
  function _checkColumnAndRows(){
    //start by checking columns
    let checkColumnsFlag = true;
    //check columns then rows, loops twice
    for(let i=0; i<2; i++){
      //check each column, loop 3 times
      for(let x=0; x<3; x++){
        //count up Xs and Os in current column
        for(let y=0; y<3; y++){
          //if checkColumnsFlag = true, check columns, else check rows
          const direction = checkColumnsFlag ? game.board[y][x] : game.board[x][y]; 
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
          game.winnerFlag = true;
          return; 
        }
        //if current column has 3 Os, Player O wins!
        if(oCount === 3){ 
          game.winnerFlag = true;
          return;
        }
        //zero out count for next column
        zeroOutCount();
      }
      //switch to rows, loop through again
      checkColumnsFlag = false; 
      //zero out count for rows
      zeroOutCount();
    }
  }
  function _checkCross(){
    zeroOutCount();
    //check cross
    for(let i=0; i<3; i++){
      if (game.board[i][i] === "X"){
        xCount++;
      }
      if (game.board[i][i] === "O"){
        oCount++;
      }
    }
    //if current column has 3 Xs, Player X wins!
    if(xCount === 3){  
      game.winnerFlag = true;
      return;
    }
    //if current column has 3 Os, Player O wins!
    if(oCount === 3){ 
      game.winnerFlag = true;
      return;
    }
    //reset for next column
    zeroOutCount();
  }
  function _checkReverseCross(){
    zeroOutCount();
    //check reverse cross
    let j = 2;
    for(let i=0; i<3; i++){
      if (game.board[i][j] === "X"){
        xCount++;
      }
      if (game.board[i][j] === "O"){
        oCount++;
      }
      j--;
    }
    //if current column has 3 Xs, Player X wins!
    if(xCount === 3){  
      game.winnerFlag = true;
      return; 
    }
    //if current column has 3 Os, Player O wins!
    if(oCount === 3){ 
      game.winnerFlag = true;
      return;
    }
    //reset for next column
    zeroOutCount();
  }

  //what we're passing back
  const verifyWin = {
    checkWin(){
      _checkColumnAndRows();
      _checkCross();
      _checkReverseCross();
      if (game.winnerFlag === true){
        game._addWin();
      }
    }  
  }
  return verifyWin
} 

//IIFE
(function() {
  console.log("IIFE has begun");
  const newGame = createGame();

  console.log(newGame);
  newGame.newGame();





})();