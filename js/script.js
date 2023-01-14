// Global variables
let player1 = 'X';
let player2 = 'O';
let gameBoard = document.querySelector('#board');
let cells = document.querySelectorAll('[data-cell]');
let nextMove = document.querySelector('#current-player');
let winner = document.querySelector('[data-text]');
let resetBtn = document.querySelector('#reset-button');
let playerO = false;
let currentPlayer = player1;
let winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell =>{
    cell.addEventListener('click', e => {
        cell.innerHTML = currentPlayer;
        cell.classList.add(currentPlayer);
        if (checkWin(currentPlayer)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
            setBoardHoverClass();
        }
    }, {once: true});
});
// function to check win
function checkWin(currentClass) {
    for (let i = 0; i < winningCombinations.length; i++) {
        let combination = winningCombinations[i];
        if (cells[combination[0]].classList.contains(currentClass) &&
        cells[combination[1]].classList.contains(currentClass) &&
        cells[combination[2]].classList.contains(currentClass)) {
            return true;
        }
    }
    return false;
}
// Implement a reset button that resets the game board and all the variables when clicked.
resetBtn.addEventListener('click', startGame)
function startGame() {
    playerO = false;
    currentPlayer = player1;
    nextMove.textContent = currentPlayer;
    cells.forEach(cell => {
        cell.classList.remove(player1)
        cell.classList.remove(player2)
        cell.innerHTML = "";
        // cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    winner.classList.remove('show');
}
// Use a variable to keep track of the current player's turn and update it each time a move is made.
function setBoardHoverClass(){
    gameBoard.classList.remove(player1)
    gameBoard.classList.remove(player2)
    if (playerO) {
        gameBoard.classList.add(player2)
    } else {
        gameBoard.classList.add(player1)
    }
}
function handleClick(e) {
    let cell = e.target;
    let currentClass = playerO ? player2 : player1;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame (false);
    } else if (isDraw()) {
        endGame (true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }   
}
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}
function isDraw () {
    return [...cells].every(cell => {
        return cell.classList.contains(player1) || 
        cell.classList.contains(player2)
    });
}
function swapTurns() {
    playerO = !playerO;
    nextMove.textContent = playerO ? player2 : player1;
}
function endGame(draw) {
    if (draw) {
        winner.innerHTML = 'Draw!'
    } else {
        winner.innerHTML = `${playerO ? "O's" : "X's"} Wins!`;
    }
    winner.classList.add('show')
}