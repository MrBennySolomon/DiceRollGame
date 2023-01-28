'use strict';

class Controller {

};

let winner;
let player1;
let player2;
let roll1;
let roll2;
let activeUser = 'player1';
let target = 100;
let isGameOver;
let player1Wins = 0;
let player2Wins = 0;

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

function rollDiceNow() {
  const result = [];
  const dice = [...document.querySelectorAll(".die-list")];
  dice.forEach((die, i) => {
    view.toggleClasses(die);
    die.dataset.roll = getRandomNumber(1, 6);
    result[i] = die.dataset.roll;
  });
  return result;
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const checkWinner = () => {
  if (Number(player1UpperTotalScore.innerText) + Number(player1LowerCurrentScore.innerText) > target) {
    isGameOver = true;
    winner = 'player2';
    updateLocalStorage(winner);
    alert('player2 is the winner');
    startNewGame();
  }else if (Number(player2UpperTotalScore.innerText) + Number(player2LowerCurrentScore.innerText) > target) {
    isGameOver = true;
    winner = 'player1';
    updateLocalStorage(winner);
    alert('player1 is the winner');
    startNewGame();
  }else{
    if(activeUser === 'player1') {
      if (Number(player1UpperTotalScore.innerText) + Number(player1LowerCurrentScore.innerText) === target) {
        isGameOver = true;
        winner = 'player1';
        updateLocalStorage(winner);
        alert('player1 is the winner');
        startNewGame();
      }
    }else{
      if (Number(player2UpperTotalScore.innerText) + Number(player2LowerCurrentScore.innerText) === target) {
        isGameOver = true;
        winner = 'player2';
        updateLocalStorage(winner);
        alert('player2 is the winner');
        startNewGame();
      }
    }
  }
}

const playGame = () => {
  const model = new Model();
  const view = new View();
  const controller = new Controller();

  controller.play();

  updateCurrentUser('init');
  setLocalStorageScore();
  activeUser = 'player1';
  isGameOver = false;
  player1 = new Player(0, 0, true);
  player2 = new Player(0, 0, false);
  player1UpperTotalScore.innerText = '0';
  player1LowerCurrentScore.innerText = '0';
  player2UpperTotalScore.innerText = '0';
  player2LowerCurrentScore.innerText = '0';
}

const rollDice = () => {
  return Math.ceil(Math.random() * 6);
}

const double = () => {
  if(activeUser === 'player1') {
    setScoreToZeroAfterDouble('player1');
  }else{
    setScoreToZeroAfterDouble('player2');
  }
  roll1 = 0;
  roll2 = 0;
  updateCurrentUser();
}

const checkSix = () => {
  if (roll1 === 6 && roll2 === 6) {
    audioLostTurn.play();
    double();
    return;
  }else{
    view.updateScore(activeUser, roll1, roll2);
    checkWinner();
  }
}