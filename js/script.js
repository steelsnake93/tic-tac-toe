const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const message = document.querySelector('[data-text]');
const X = 'X';
const O = 'O';
let turn = X; //keep track of the current player's turn
//event listener for clicking on the cells
board.addEventListener('click', function (e) {
  // check if cell is empty
  if (e.target.innerHTML === '') {
    e.target.innerHTML = turn;
    e.target.setAttribute('data-cell', turn);
    turn = turn === X ? O : X; //switch turn after each move
    checkForTie();
    let winner = checkWin();
    if(winner) {
      message.innerHTML = `${winner} wins!`;
    }
  }
});
// function to check if someone wins
function checkWin() {
  const waysToWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  // loop through possible winning combinations
  for (let i = 0; i < waysToWin.length; i++) {
    const [a, b, c] = waysToWin[i];
    if (
      cells[a].innerHTML &&
      cells[a].innerHTML === cells[b].innerHTML &&
      cells[a].innerHTML === cells[c].innerHTML
    ) {
      // return the winner
      return cells[a].innerHTML;
    }
  }
  return null;
}
// function to check for a tie
function checkForTie() {
  // Count the number of empty cells
  let emptyCells = 0;
  for (let cell of cells) {
      if (cell.getAttribute('data-cell') === '') {
          emptyCells++;
      }
  }
  // If there are no empty cells, the game is a tie
  if (emptyCells === 0) {
      // Display a message to indicate a tie
      document.querySelector('[data-text]').textContent = 'Tie game!';
  }
}
const resetBtn = document.getElementById('reset-button');
resetBtn.addEventListener('click', function () {
  cells.forEach((cell) => {
    message.innerHTML = '';
    cell.innerHTML = null;
    cell.setAttribute('data-cell', '');
    turn = X;
  });
  checkForTie();
});