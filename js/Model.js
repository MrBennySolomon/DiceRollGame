'use strict';

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
const modal = document.getElementById("myModal");

const updateLocalStorage = (winner) => {
  const win = winner + 'Wins';
  const score = Number(localStorage.getItem(win)) + 1;
  localStorage.setItem(win, score);
  setLocalStorageScore();
}

const setLocalStorageScore = () => {
  player1Wins = localStorage.getItem('player1Wins');
  player2Wins = localStorage.getItem('player2Wins');
  player1WinsScore. innerText = player1Wins;
  player2WinsScore.innerText = player2Wins;
}