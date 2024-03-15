function createHomeUI() {
  const obj = {
    dialogWindow: document.querySelector("#assignPlayer"),
    startBtn: document.querySelectore("#startBtn"),
    okBtn: document.querySelector("#okBtn"),
    cancelBtn: document.querySelector("#cancelBtn"),
    player1name: document.querySelector("#player1name"),
    player2name: document.querySelector("#player2name"),
    player1symbol: document.querySelector("#player1symbol"),
    player2symbol: document.querySelector("#player2symbol"),

    attachEventListeners(){
      _characterSelectEL(startBtn, dialogWindow);
      _closeDialogEL(cancelBtn, dialogWindow);
      _submitPlayersEL(okBtn);
    },

    _characterSelectEL(btn, dialog){
      btn.addEventListener("click", ()=>{
        dialog.showModal();
      })
    },

    _closeDialogEL(btn, dialog){
      btn.addEventListener("click", ()=>{
        dialog.close();
      })
    },

    _submitPlayersEL(btn){
      btn.addEventListener("click", ()=>{
        if(this.player1name.value === "" || this.player2name.value === "" ){
          alert("Player names cannot be blank");
          return;
        }
        if(this.player1symbol.value === this.player2symbol.value){
          alert("Players cannot have the same symbol");
          return;
        }
  
        //create players
        const playerData = []
        playerData[0] = {
          playerName: this.player1name.value,
          playerSymbol: this.player1symbol.value,
          wins: 0
        };
        playerData[1] = {
          playerName: this.player2name.value,
          playerSymbol: this.player2symbol.value,
          wins: 0
        } 
  
        //store data locally
        localStorage.setItem('playerData', JSON.stringify(playerData));
  
        //navigate to game.html
        window.location.href = "./pages/game.html";
      })
    }

  }
  return obj;
}

(function() {
  console.log("IIFE has begun");

  const homeUI = createHomeUI();
  homeUI.attachEventListeners();
})();