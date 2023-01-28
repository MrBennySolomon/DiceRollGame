'use strict';

class Dice{
  constructor() {
    this.roll1 = 0;
    this.roll2 = 0;
  }

  getRoll1() {
    return this.roll1;
  }

  getRoll2() {
    return this.roll2;
  }

  setRoll1(num) {
    this.roll1 = num;
  }

  setRoll2(num) {
    this.roll2 = num;
  }

  rollDiceNow() {
    const result = [];
    const dice = [...document.querySelectorAll(".die-list")];
    dice.forEach((die, i) => {
      view.toggleClasses(die);
      die.dataset.roll = this.getRandomNumber(1, 6);
      result[i] = die.dataset.roll;
    });
    this.roll1 = result[0];
    this.roll2 = result[1];
  }

  getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  rollDice() {
    return Math.ceil(Math.random() * 6);
  }
}