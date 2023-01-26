'use strict';

let winner;
let player1;
let player2;
let roll1;
let roll2;
let activeUser = 'player1';
let target;
let isGameOver;

const player1UpperTotalScore = document.querySelector('.player1-upper-total-score');
const player1LowerCurrentScore = document.querySelector('.player1-lower-current-score');
const player2UpperTotalScore = document.querySelector('.player2-upper-total-score');
const player2LowerCurrentScore = document.querySelector('.player2-lower-current-score');
const btnNewGame = document.querySelector('.btn-new-game');
const btnRollDice = document.querySelector('.btn-roll-dice');
const btnHold = document.querySelector('.btn-hold');
const diceUpper = document.querySelector('.dice-upper');
const diceLower = document.querySelector('.dice-lower');

class Player {
  constructor(total, current) {
    this.total = total,
    this.current = current,
    this.isCurrentPlayer = isCurrentPlayer;
  }
}

const rollDice = () => {
  return Math.ceil(Math.random() * 6);
}

const startNewGame = () => {
  activeUser = 'player1';
  isGameOver = false;
  target = 100;
  player1 = new Player(0, 0, true);
  player2 = new Player(0, 0, false);
  player1UpperTotalScore.innerText = '0';
  player1LowerCurrentScore.innerText = '0';
  player2UpperTotalScore.innerText = '0';
  player2LowerCurrentScore.innerText = '0';
}

const print2Dice = (num1, num2) => {
  diceUpper.style.background = 'url(../img/dice-' + `${num1}.png` + ') no-repeat center center/cover';
  diceLower.style.background = 'url(../img/dice-' + `${num2}.png` + ') no-repeat center center/cover';
  return [num1, ]
}

const updateScore = () => {
  if(activeUser === 'player1') {
    player1LowerCurrentScore.innerText = Number(player1LowerCurrentScore.innerText) + (roll1 + roll2);
  }else{
    player2LowerCurrentScore.innerText = Number(player2LowerCurrentScore.innerText) + (roll1 + roll2);
  }
    
};

const checkWinner = () => {
  if (Number(player1UpperTotalScore.innerText) + Number(player1LowerCurrentScore.innerText) > target) {
    isGameOver = true;
    winner = 'player2';
    alert('player2 is the winner');
    startNewGame();
  }else if (Number(player2UpperTotalScore.innerText) + Number(player2LowerCurrentScore.innerText) > target) {
    isGameOver = true;
    winner = 'player1';
    alert('player1 is the winner');
    startNewGame();
  }else{
    if(activeUser === 'player1') {
      if (Number(player1UpperTotalScore.innerText) + Number(player1LowerCurrentScore.innerText) === target) {
        isGameOver = true;
        winner = 'player1';
        alert('player1 is the winner');
        startNewGame();
      }
    }else{
      if (Number(player2UpperTotalScore.innerText) + Number(player2LowerCurrentScore.innerText) === target) {
        isGameOver = true;
        winner = 'player2';
        alert('player2 is the winner');
        startNewGame();
      }
    }
  }
}

const updateCurrentUser = () => {
  activeUser = activeUser === 'player1' ? 'player2': 'player1';
};

const double = () => {
  if(activeUser === 'player1') {
    player1LowerCurrentScore.innerText = '0';
  }else{
    player2LowerCurrentScore.innerText = '0';
  }
  roll1 = 0;
  roll2 = 0;
}

btnRollDice.addEventListener('click', function() {
  roll1 = rollDice();
  roll2 = rollDice();
  if (roll1 === 6 && roll2 ===6) {
    alert('Sorry ... 6 6 reset your current score and you lost your turn');
    double();
    return;
  }
  print2Dice(roll1, roll2);

  updateCurrentUser();
  updateScore();
  checkWinner();
});

btnHold.addEventListener('click', function() {
  if (activeUser === 'player1') {
    player1UpperTotalScore.innerText = Number(player1UpperTotalScore.innerText) + Number(player1LowerCurrentScore.innerText);
    player1LowerCurrentScore.innerText = '0';
  }else{
    player2UpperTotalScore.innerText = Number(player2UpperTotalScore.innerText) + Number(player2LowerCurrentScore.innerText);
    player2LowerCurrentScore.innerText = '0';
  }
  updateCurrentUser();
});

btnNewGame.addEventListener('click', function() {
  startNewGame();
});