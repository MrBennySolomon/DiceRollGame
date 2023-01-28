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
  }

  startNewGame() {
    this.activeUser = player1;
    this.view.setScore(this.activeUser, 1, 1);
    this.model.setLocalStorageScore();
    this.view.setTotalScore(this.player1.getName());
    this.view.setCurrentScore(this.player2.getName());
  }

  double() {
    this.dice.setRoll1(0);
    this.dice.setRoll2(0);
    this.view.setScore(this.activeUser,
                       this.dice.getRoll1(),
                       this.dice.getRoll2());
    this.view.setOpacity(this.activeUser);
  }

  checkSix() {
    if (this.dice.getRoll1() === 6 && this.dice.getRoll2() === 6) {
      this.audioLostTurn.play();
      this.double();
      return;
    }else{
      this.view.setScore(this.activeUser,
                         this.dice.getRoll1(),
                         this.dice.getRoll2());
      this.checkWinner();
    }
  }

  setCurrentUser(player = 'player1') {
    this.activeUser = player;
    this.view.setOpacity(this.activeUser);
  }

  checkWinner() {
    const total1 = this.view.getPlayer1TotalScore() + this.view.getPlayer1CurrentScore();
    const total2 = this.view.getPlayer2TotalScore() + this.view.getPlayer2CurrentScore();
    
    if (total1 >= this.target) {
      if (total1 > this.target) {
        this.winner = 'player2';
      }else{
        this.winner = 'player1';
      }
    }else{
      if (total2 > this.target) {
        this.winner = 'player1';
      }else{
        this.winner = 'player2';
      }
    }
  
    this.model.updateLocalStorage(winner);
    this.view.setMessage(`${this.winner} is the winner`);
    this.startNewGame();
  }
};

btnRollDice.addEventListener('click', function() {
  audioDice.play();
  const result = rollDiceNow();
  roll1 = Number(result[0]);
  roll2 = Number(result[1]);
  checkSix();
});

btnHold.addEventListener('click', function() {
  checkWinner();
  model.updateScore(player, roll1, roll2);
  updateCurrentUser();
});

btnNewGame.addEventListener('click', function() {
  startNewGame();
  modal.style.display = "block";
});

btnStartGameModal.addEventListener('click', function() {
  target = Number(userInputModal.value);
  modal.style.display = "none";
  startNewGame();
});