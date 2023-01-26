'use strict';

let player1;
let player2;
let upper;
let lower;

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
  constructor(total, current, isCurrentPlayer = false) {
    this.total = total,
    this.current = current,
    this.isCurrentPlayer = isCurrentPlayer;
  }
  currentPlayer(isCurrentPlayer) {
    this.isCurrentPlayer = isCurrentPlayer;
  }
}

class Dice {
  constructor() {
    this.one = 1,
    this.two = 2,
    this.three = 3,
    this.four = 4,
    this.five = 5,
    this.six = 6
  }
}

const rollDice = () => {
  return Math.floor(Math.random() * 6);
}

const startGame = () => {
  player1 = new Player(0, 0, true);
  player2 = new Player(0, 0, false);

  upper = new Dice();
  lower = new Dice();
}

const print2Dice = (num1, num2) => {
  diceUpper.style.background = `url('/img/dice-${num1}.png')`;
  diceLower.style.background = `url('/img/dice-${num2}.png')`;
}

btnRollDice.addEventListener('click', function() {
  print2Dice(upper.rollDice(), lower.rollDice());
});

