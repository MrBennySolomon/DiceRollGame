'use strict';

class Controller {
  constructor(view, model) {
    this.view          = view;
    this.dice          = new Dice();
    this.model         = model;
    this.winner        = '';
    this.target        = 100;
    this.player1       = new Player('player1');
    this.player2       = new Player('player2');
    this.audioDice     = new Audio('../mp3/dice-sound.mp3');
    this.activeUser    = this.player1.getName();
    this.audioLostTurn = new Audio('../mp3/lost-turn-sound.mp3');
    this.winSound      = new Audio('../mp3/win-sound.mp3');
    this.btnRollDice   = document.querySelector('.btn-roll-dice');
    this.btnHold       = document.querySelector('.btn-hold');
  }

  startGameModal() {
    this.target = this.view.getUserInputModal();
    this.view.setModal('none');
    this.view.setPyroOff();
    this.startNewGame();
  }

  newGame() {
    this.startNewGame();
    this.view.setModal('block');
    this.view.setPyroOff();
    this.btnRollDice.disabled = false;
    this.btnHold.disabled = false;
  }

  hold() {
    this.checkWinner();
    this.view.setTotalScore(this.activeUser, Number(this.dice.getRoll1()) + Number(this.dice.getRoll2()));
    this.view.setCurrentScore(this.activeUser);
    this.changeCurrentUser(this.activeUser);
    this.view.setOpacity(this.activeUser);
  }

  rollDice() {
    this.audioDice.play();
    this.dice.rollDiceNow();
    this.checkSix();
  }

  startNewGame() {
    this.activeUser = this.player1.getName();
    this.view.setOpacity(this.activeUser);
    this.view.initScores();
    this.view.setPlayersWins(this.model.getPlayer1Wins(), this.model.getPlayer2Wins());
  }

  double() {
    this.dice.setRoll1(0);
    this.dice.setRoll2(0);
    this.view.setCurrentScore(this.activeUser);
    this.changeCurrentUser(this.activeUser);
  }

  checkSix() {
    if (Number(this.dice.getRoll1()) === 6 && Number(this.dice.getRoll2()) === 6) {
      this.audioLostTurn.play();
      this.view.setCurrentScore('init');
      this.changeCurrentUser(this.activeUser);
      return;
    }else{
      this.view.setCurrentScore(this.activeUser, Number(this.dice.getRoll1()) + Number(this.dice.getRoll2()));
      this.checkWinner();
    }
  }

  setCurrentUser(player = 'player1') {
    this.activeUser = player;
    this.view.setOpacity(this.activeUser);
  }

  changeCurrentUser(player) {
    this.activeUser = this.activeUser === 'player1' ? 'player2' : 'player1';
    this.view.setOpacity(this.activeUser);
  }

  checkWinner() {
    const total1 = this.view.getPlayer1TotalScore() + this.view.getPlayer1CurrentScore();
    const total2 = this.view.getPlayer2TotalScore() + this.view.getPlayer2CurrentScore();
    
    if(this.target > total1 && this.target > total2) {
      return;
    }else if (total1 >= this.target) {
      if (total1 > this.target) {
        this.winner = 'player2';
      }else{
        this.winner = 'player1';
      }
    }else if (total2 >= this.target) {
        this.winner = 'player1';
      }else{
        this.winner = 'player2';
    }

    this.view.setPyroOn();
    this.winSound.play();
    this.model.updateLocalStorage(this.winner);
    this.view.setMessage(this.winner);
    this.startNewGame();
  }
};