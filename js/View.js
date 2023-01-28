'use strict';

class View {
  constructor() {
    this.winnerText               = document.querySelector('.btn-winner');
    this.btnRollDice              = document.querySelector('.btn-roll-dice');
    this.btnHold                  = document.querySelector('.btn-hold');
    this.pyro                     = document.getElementById('pyro');
    this.dice                     = document.getElementById('.dice');
    this.flex                     = document.getElementById('.flex');
    this.modal                    = document.getElementById("myModal");
    this.userInputModal           = document.querySelector('input#quantity');
    this.player1Container         = document.querySelector('.player1');
    this.player2Container         = document.querySelector('.player2');
    this.player1WinsScore         = document.getElementById('player1-wins');
    this.player2WinsScore         = document.getElementById('player2-wins');
    this.player1UpperTotalScore   = document.querySelector('.player1-upper-total-score');
    this.player2UpperTotalScore   = document.querySelector('.player2-upper-total-score');
    this.player1LowerCurrentScore = document.querySelector('.player1-lower-current-score');
    this.player2LowerCurrentScore = document.querySelector('.player2-lower-current-score');
    this.pyro.classList.add('pyro');

  }

  setPlayersWins(score1, score2) {
    this.player1WinsScore.innerText = score1;
    this.player2WinsScore.innerText = score2;
  }

  getUserInputModal() {
    return Number(this.userInputModal.value);
  }
  
  setPyroOff() {
    this.winnerText.innerText = 'WINNER:';
    this.pyro.classList.add('none');
  }

  setPyroOn() {
    this.pyro.classList.remove('none');
  }

  setMessage(msg) {

    this.btnRollDice.disabled = true;
    this.btnHold.disabled = true;
    this.winnerText.innerText = 'WINNER: ' + msg.toUpperCase();
  }
  //@PARAM: 'block' or 'hidden'
  setModal(block) {
    this.modal.style.display = block;
    this.pyro.setAttribute('class', 'pyro none');
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

  initScores() {
    this.setTotalScore('init');
    this.setCurrentScore('init');
  }

  setTotalScore(player) {
    switch(player) {
      case 'player1':
        this.player1UpperTotalScore.innerText = Number(this.player1UpperTotalScore.innerText) + Number(this.player1LowerCurrentScore.innerText);
        break;
      case 'player2':
        this.player2UpperTotalScore.innerText = Number(this.player2UpperTotalScore.innerText) + Number(this.player2LowerCurrentScore.innerText);
        break;
      case 'init':
        this.player1UpperTotalScore.innerText   = '0';
        this.player2UpperTotalScore.innerText   = '0';
        break;
      default:
        throw new Error('wrong input');
    }
  }

  setCurrentScore(player, score = 0) {
    switch(player) {
      case 'player1':
        this.player1LowerCurrentScore.innerText = Number(this.player1LowerCurrentScore.innerText) + Number(score);
        break;
      case 'player2':
        this.player2LowerCurrentScore.innerText = Number(this.player2LowerCurrentScore.innerText) + Number(score);
        break;
      case 'init':
        this.player1LowerCurrentScore.innerText = '0';
        this.player2LowerCurrentScore.innerText = '0';
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