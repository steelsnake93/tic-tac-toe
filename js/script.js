const board = document.getElementById("board");
const cells = document.querySelectorAll("[data-cell]");
const X = "X";
const O = "O";
let turn = X; //keep track of the current player's turn

//event listener for clicking on the cells
board.addEventListener("click", function (e) {
  if (e.target.innerHTML === "") {
    e.target.innerHTML = turn;
    turn = turn === X ? O : X; //switch turn after each move
  }
});
console.log(checkWin()); // check for the winner
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

  for (let i = 0; i < waysToWin.length; i++) {
    const [a, b, c] = waysToWin[i];
    if (
      cells[a].innerHTML &&
      cells[a].innerHTML === cells[b].innerHTML &&
      cells[a].innerHTML === cells[c].innerHTML
    ) {
      return cells[a].innerHTML;
    }
  }
  return null;
}

const resetBtn = document.getElementById("reset-button");
resetBtn.addEventListener("click", function () {
  cells.forEach((cell) => {
    cell.innerHTML = "";
    turn = X;
  });
});
