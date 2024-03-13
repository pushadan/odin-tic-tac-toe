class HomeUI{
  constructor(){
    //popup dialog
    this.dialogWindow = document.querySelector("#assignPlayer");

    //buttons
    this.startBtn = document.querySelector("#startBtn");
    this.okBtn = document.querySelector("#okBtn");
    this.cancelBtn = document.querySelector("#cancelBtn");

    //fields and symbol dropdowns
    this.player1name = document.querySelector("#player1name");
    this.player2name = document.querySelector("#player2name");
    this.player1symbol = document.querySelector("#player1symbol");
    this.player2symbol = document.querySelector("#player2symbol");
  }
  
  attachEventListeners(){
    this._characterSelectEL(this.startBtn, this.dialogWindow);
    this._closeDialogEL(this.cancelBtn, this.dialogWindow);
    this._submitPlayersEL(this.okBtn);
  }

  _characterSelectEL(btn, dialog){
    btn.addEventListener("click", ()=>{
      dialog.showModal();
    })
  }
  _closeDialogEL(btn, dialog){
    btn.addEventListener("click", ()=>{
      dialog.close();
    })
  }
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
        playerSymbol: this.player1symbol.value
      };
      playerData[1] = {
        playerName: this.player2name.value,
        playerSymbol: this.player2symbol.value
      } 

      //store data locally
      localStorage.setItem('playerData', JSON.stringify(playerData));

      //navigate to game.html
      window.location.href = "game.html";
    })
  }
}


//On start (IIFE - Immediate Invoked Function Expression)
(function() {
  console.log("IIFE has begun");

  const homeUI = new HomeUI;
  homeUI.attachEventListeners();
})();
