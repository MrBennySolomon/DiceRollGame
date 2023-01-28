'use strict';

class View {
  constructor() {
    this.dice                     = document.getElementById('.dice');
    this.flex                     = document.getElementById('.flex');
    this.modal                    = document.getElementById("myModal");
    this.btnHold                  = document.querySelector('.btn-hold');
    this.btnNewGame               = document.querySelector('.btn-new-game');
    this.btnRollDice              = document.querySelector('.btn-roll-dice');
    this.userInputModal           = document.querySelector('input#quantity');
    this.player1Container         = document.querySelector('.player1');
    this.player2Container         = document.querySelector('.player2');
    this.player1WinsScore         = document.getElementById('player1-wins');
    this.player2WinsScore         = document.getElementById('player2-wins');
    this.player1UpperTotalScore   = document.querySelector('.player1-upper-total-score');
    this.player2UpperTotalScore   = document.querySelector('.player2-upper-total-score');
    this.player1LowerCurrentScore = document.querySelector('.player1-lower-current-score');
    this.player2LowerCurrentScore = document.querySelector('.player2-lower-current-score');
    
  }

  setMessage(msg) {
    alert(msg);
  }
  //@PARAM: 'block' or 'hidden'
  setModal(block) {
    this.modal.style.display = block;
  }

  changeOpacity = (player1Container, player2Container) => {
    this.player1Container.style.opacity = '0.6';
    this.player2Container.style.opacity = '0.2';
  }

  getPlayer1TotalScore() {
    return Number(this.player1UpperTotalScore.innerText);
  }

  getPlayer2TotalScore() {
    return Number(this.player2UpperTotalScore.innerText);
  }

  getPlayer1CurrentScore() {
    return Number(this.player1LowerCurrentScore.innerText);
  }

  getPlayer2CurrentScore() {
    return Number(this.player2LowerCurrentScore.innerText);
  }

  setOpacity(player) {
    switch (player) {
      case 'player1':
        this.player1Container.style.opacity = '0.6';
        this.player2Container.style.opacity = '0.2';
        break;
      case 'player2':
        this.player2Container.style.opacity = '0.6';
        this.player1Container.style.opacity = '0.2';
        break;
      default:
        throw new Error('player name error');
    }
  }

  setTotalScore(player, score='0') {
    switch(player) {
      case 'player1':
        this.player1UpperTotalScore.innerText   = score;
        break;
      case 'player2':
        this.player2UpperTotalScore.innerText   = score;
        break;
      default:
        throw new Error('wrong input');
    }
  }

  setCurrentScore(player, score='0') {
    switch(player) {
      case 'player1':
        this.player1LowerCurrentScore.innerText = Number(this.player1LowerCurrentScore.innerText) + score;
        break;
      case 'player2':
        this.player2LowerCurrentScore.innerText = Number(this.player2LowerCurrentScore.innerText) + score;
        break;
      default:
        throw new Error('wrong input');
    }
  }

  toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
  }

  setPlayersScore(player1Wins, player2Wins) {
    this.player1WinsScore.innerText = player1Wins;
    this.player2WinsScore.innerText = player2Wins;
  }
}