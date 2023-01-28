'use strict';

const startNewGame = () => {
  const model = new Model();
  const view = new View();
  const controller = new Controller();

  controller.playGame();
}