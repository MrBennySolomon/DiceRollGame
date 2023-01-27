'use strict';

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

const player1Container = document.querySelector('.player1');
const player2Container = document.querySelector('.player2');
const player1UpperTotalScore = document.querySelector('.player1-upper-total-score');
const player1LowerCurrentScore = document.querySelector('.player1-lower-current-score');
const player2UpperTotalScore = document.querySelector('.player2-upper-total-score');
const player2LowerCurrentScore = document.querySelector('.player2-lower-current-score');
const btnNewGame = document.querySelector('.btn-new-game');
const btnRollDice = document.querySelector('.btn-roll-dice');
const btnHold = document.querySelector('.btn-hold');
const diceUpper = document.querySelector('.dice-upper');
const diceLower = document.querySelector('.dice-lower');
const userInputModal = document.querySelector('input#quantity');
const btnStartGameModal = document.querySelector('button#btn-start');
const player1WinsScore = document.getElementById('player1-wins');
const player2WinsScore = document.getElementById('player2-wins');
const dice = document.getElementById('.dice');
const flex = document.getElementById('.flex');
const audioDice = new Audio('../mp3/dice-sound.mp3');
const audioLostTurn = new Audio('../mp3/lost-turn-sound.mp3');

class Player {
  constructor(total, current) {
    this.total = total,
    this.current = current
  }
}

const rollDice = () => {
  return Math.ceil(Math.random() * 6);
}

const setLocalStorageScore = () => {
  player1Wins = localStorage.getItem('player1Wins');
  player2Wins = localStorage.getItem('player2Wins');
  player1WinsScore. innerText = player1Wins;
  player2WinsScore.innerText = player2Wins;
}

const startNewGame = () => {
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

const updateScore = () => {
  if(activeUser === 'player1') {
    player1LowerCurrentScore.innerText = Number(player1LowerCurrentScore.innerText) + (roll1 + roll2);
  }else{
    player2LowerCurrentScore.innerText = Number(player2LowerCurrentScore.innerText) + (roll1 + roll2);
  }
};

const updateLocalStorage = (winner) => {

  const win = winner + 'Wins';
  const score = Number(localStorage.getItem(win)) + 1;
  localStorage.setItem(win, score);
  setLocalStorageScore();
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

const updateCurrentUser = (init) => {
  if (init === 'init') {
    activeUser = 'player1';
    player1Container.style.opacity = '0.6';
    player2Container.style.opacity = '0.2';
  }else if (activeUser === 'player1') {
    activeUser = 'player2';
    player2Container.style.opacity = '0.6';
    player1Container.style.opacity = '0.2';
  }else{
    activeUser = 'player1';
    player1Container.style.opacity = '0.6';
    player2Container.style.opacity = '0.2';
  }
};

const double = () => {
  if(activeUser === 'player1') {
    player1LowerCurrentScore.innerText = '0';
  }else{
    player2LowerCurrentScore.innerText = '0';
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
    updateScore();
    checkWinner();
  }
}

btnRollDice.addEventListener('click', function() {
  audioDice.play();
  const result = rollDiceNow();
  roll1 = Number(result[0]);
  roll2 = Number(result[1]);
  checkSix();
});

btnHold.addEventListener('click', function() {
  checkWinner();
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
  modal.style.display = "block";
});

btnStartGameModal.addEventListener('click', function() {
  target = Number(userInputModal.value);
  modal.style.display = "none";
  startNewGame();
});

// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

modal.style.display = "block";

function rollDiceNow() {
  const result = [];
  const dice = [...document.querySelectorAll(".die-list")];
  dice.forEach((die, i) => {
    toggleClasses(die);
    die.dataset.roll = getRandomNumber(1, 6);
    result[i] = die.dataset.roll;
  });
  return result;
}

function toggleClasses(die) {
  die.classList.toggle("odd-roll");
  die.classList.toggle("even-roll");
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
