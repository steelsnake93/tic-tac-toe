// Global variables
let player1 = 'X';
let player2 = 'O';
let gameBoard = document.querySelector('#board');
let cells = document.querySelectorAll('[data-cell]');
let nextMove = document.querySelector('#current-player');
let winner = document.querySelector('[data-text]');
let startReset = document.querySelector('reset-button');
let playerO = false;
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
// function to check win
function checkWin() {
    for (let i = 0; i < winningCombinations.length; i++) {
        let combination = winningCombinations[i];
        if (gameBoard[combination[0]] !== "" &&
        gameBoard[combination[0] === gameBoard[combination[1]]] &&
        gameBoard[combination[1] === gameBoard[combination[2]]]) {
            return true;
        }
    }
    return false;
}
// create function to play game and reset game on click button
cells.forEach(function(cell, index) {
    cell.addEventListener('click', function() {
        if(checkWin()) {
            console.log("Game is won!");
        } else {
            console.log("");
        }
    });
});
