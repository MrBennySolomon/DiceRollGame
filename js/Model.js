'use strict';
class Model {
  constructor() {
    this.player1Wins = localStorage.getItem('player1Wins');
    this.player2Wins = localStorage.getItem('player2Wins');
  }

  getPlayer1Wins() {
    return this.player1Wins ? this.player1Wins : 0;
  }

  getPlayer2Wins() {
    return this.player2Wins ? this.player2Wins : 0;
  }

  updateLocalStorage(winner) {
    const win = winner + 'Wins';
    const score = Number(localStorage.getItem(win)) + 1;
    localStorage.setItem(win, score);
    this.getLocalStorageScore();
  }

  getLocalStorageScore() {
    this.player1Wins = localStorage.getItem('player1Wins');
    this.player2Wins = localStorage.getItem('player2Wins');
    return [this.player1Wins, this.player2Wins];
  }
}