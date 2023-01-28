'use strict';
class Model {
  constructor() {
    this.player1Wins = localStorage.getItem('player1Wins');
    this.player2Wins = localStorage.getItem('player2Wins');
  }

  updateLocalStorage(winner) {
    const win = winner + 'Wins';
    const score = Number(localStorage.getItem(win)) + 1;
    localStorage.setItem(win, score);
    this.setLocalStorageScore();
  }

  setLocalStorageScore() {
    this.player1Wins = localStorage.getItem('player1Wins');
    this.player2Wins = localStorage.getItem('player2Wins');
    return [player1Wins, player2Wins];
  }
}