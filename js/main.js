'use strict';

this.btnHold                  = document.querySelector('.btn-hold');
this.btnNewGame               = document.querySelector('.btn-new-game');
this.btnRollDice              = document.querySelector('.btn-roll-dice');
this.btnStartGameModal        = document.querySelector('button#btn-start');

const model = new Model();
const view = new View();
const controller = new Controller(view, model);
controller.startNewGame();

btnRollDice.addEventListener('click', function() {
  controller.rollDice();
});

btnHold.addEventListener('click', function() {
  controller.hold();
});

btnNewGame.addEventListener('click', function() {
  controller.newGame();
});

btnStartGameModal.addEventListener('click', function() {
  controller.startGameModal();
});