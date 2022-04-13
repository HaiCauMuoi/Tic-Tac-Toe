const game = (function () {
  'use strict';

  let gameActive = true;
  let currentPlayer = 'x';
  let gameBoard = ['', '', '', '', '', '', '', '', ''];

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function handleClick(event) {
    let clickedSquare = event.target;
    let clickSquareNumber = parseInt(clickedSquare.id);
    console.log(clickSquareNumber);

    if (gameBoard[clickSquareNumber] !== '' || !gameActive) {
      return;
    }

    handlePlay(clickedSquare, clickSquareNumber);
    handleResult();
  }

  function handlePlay(clickElement, squareIndex) {
    gameBoard[squareIndex] = currentPlayer;
    if (currentPlayer === 'x') {
      clickElement.classList.add('x');
      console.log('x clicked');
    } else {
      clickElement.classList.add('o');
      console.log('o clicked');
    }
  }
  // private function to check if game is finished and transition player turns
  function handleResult() {
    let gameWon = false;
    const player1_score = document.querySelector('.p1-score');
    const tie_score = document.querySelector('.tie-score');
    const player2_score = document.querySelector('.p2-score');
    let score_p1 = 0;
    let score_tie = 0;
    let score_p2 = 0;

    for (let i = 0; i <= 7; i++) {
      let a = gameBoard[winningCombos[i][0]];
      let b = gameBoard[winningCombos[i][1]];
      let c = gameBoard[winningCombos[i][2]];

      if (!a || !b || !c) {
        continue;
      }
      if (a === b && b === c) {
        gameWon = true;
        break;
      }
    }
    if (gameWon) {
      if (currentPlayer === 'x') {
        score_p1++;
        player1_score.textContent = score_p1;
      } else {
        score_p2++;
        player2_score.textContent = score_p2;
      }
      gameActive = false;
      return;
    }
    let tieGame = !gameBoard.includes('');
    if (tieGame) {
      score_tie++;
      tie_score.textContent = score_tie;
      gameActive = false;
      return;
    }
    changePlayer();
  }
  // change to next player's turn after move
  function changePlayer() {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
  }

  function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    document
      .querySelectorAll('.square')
      .forEach(square => square.classList.remove('x', 'o'));
    gameActive = true;
    currentPlayer = 'x';
  }

  // list public functions and variables
  return { handleClick, restartGame };
})();

//
document
  .querySelectorAll('.square')
  .forEach(square => square.addEventListener('click', game.handleClick));
document
  .querySelector('.switch-player')
  .addEventListener('click', game.restartGame);
