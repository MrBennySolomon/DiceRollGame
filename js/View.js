'use strict';
modal.style.display = "block";

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

const updateScore = (player, roll1, roll2) => {
  activeUser === player ?
  player1LowerCurrentScore.innerText = Number(player1LowerCurrentScore.innerText) + (roll1 + roll2) :
  player2LowerCurrentScore.innerText = Number(player2LowerCurrentScore.innerText) + (roll1 + roll2) ;
};

const setScoreToZeroAfterDouble = player => {
  player === 'player1' ?
  player1LowerCurrentScore.innerText = '0' :
  player2LowerCurrentScore.innerText = '0' ;
}

function toggleClasses(die) {
  die.classList.toggle("odd-roll");
  die.classList.toggle("even-roll");
}