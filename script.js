
// FIRST TO WIN 3 ROUNDS WINS THE GAME
// IF THERE ARE 5 DRAWS THEN THE GAME ENDS IN A DRAW

let playerXWins = 0;
let playerOWins = 0;
let round = 1;
let draw = 0;
let player1 = "Player X";
let player2 = "Player O";
let player = player1;
let currentPlayer = 'X';
const winner_rounds = 3;
const drawsAllowed = 5;
const board = ['', '', '', '', '', '', '', '', ''];
const currentYear = new Date().getFullYear();

document.querySelector(".year").innerText = currentYear; // DISPLAYS CURRENT YEAR DYNAMICALLY
let turn = document.querySelector(".turn"); // WILL USE TO DISPLAY TURNS
displayRounds();
currentTurnDisplay();

// onclick FUNCTION WITH PARAMETER OF INDEX BETWEEN 0-8
function handleOnClick(cellIndex) {


    if (board[cellIndex] === '') { // IF CELL CLICKED IS EMPTY
        board[cellIndex] = currentPlayer; // STORE X/O INSIDE THE ARRAY 
        document.getElementsByClassName('cell')[cellIndex].innerText = currentPlayer; // STORE X/O IN THE <td> 
        document.querySelector(".error").innerText = "";


        if (checkWin()) { // checkWin RETURNS TRUE IF CONDITION IS MET
            document.querySelector(".endround").innerText = `${player} has won round ${round}!`;
            currentPlayer === 'X' ? playerXWins++ : playerOWins++; // IF CURRENT PLAYER IS X THEN INCREMENT playerXWins ELSE INCREMENT playerOWins
            checkWinner();
            maxDraws();
            resetRound();
            round++;
            displayRounds();
        } else if (board.every(cell => cell !== '')) { // ELSE IF EVERY CELL IS OCCUPIED 
            document.querySelector(".nowinners").innerText = "There are no winners";
            setTimeout(() => {
                document.querySelector(".nowinners").innerText = ""; // RESET THE ERROR AFTER 1 SECOND
            }, 1000);
            maxDraws();
            resetRound();
            draw++;
            round++;
            displayRounds();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // IF CURRENT PLAYER IS EQUAL TO X THEN SWITCH TO OPPOSITE 
            player = player === player1 ? player2 : player1;
            currentTurnDisplay();
        }
    } else {
        document.querySelector(".error").innerText = "Block already occupied!"; // IF USER CLICKS ON NOT EMPTY BLOCK (OCCUPIED BLOCK)
        setTimeout(() => {
            document.querySelector(".error").innerText = ""; // RESET THE ERROR AFTER 1 SECOND
        }, 1000);
    }
}

// Function to check for a win
function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    return winConditions.some(condition =>
        condition.every(index => board[index] === currentPlayer)
    );
}

// CHECKS WHICH PLAYER HAS WON THE GAME AND ENDS THE GAME(TO WIN THE GAME YOU HAVE TO WIN 3 ROUNDS)
function checkWinner() {
    if (playerXWins == winner_rounds) {
        document.querySelector(".big-text").innerText = `${player1} won the game!`;
        endGame();
    } else if (playerOWins == winner_rounds) {
        document.querySelector(".big-text").innerText = `${player2} won the game!`;
        endGame();
    }
}

// CHECK IF MAX DRAWS LIMIT WAS REACHED AND END GAME
function maxDraws() {
    if (draw == drawsAllowed) {
        document.querySelector(".big-text").innerText = "It's a draw!";
        endGame();
    }
}

// Function to reset the game
function resetRound() {
    board.fill(''); // FILLS board ARRAY WITH EMPTY STRINGS
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = ''); // SELECTS ALL cells AND PUTS AN EMPTY STRING IN EACH OF THEM
    currentPlayer = 'X';
    player = player1;
    currentTurnDisplay();
}

function endGame() {
    round = 1;
    draw = 0;
    playerXWins = 0;
    playerOWins = 0;
    document.querySelector(".endround").innerText = "";
}

//DISPLAYS WHOSE TURN IT IS
function currentTurnDisplay() {
    turn.innerText = `It's ${player}'s turn (${currentPlayer})`;
}

function displayRounds() {
    document.querySelector(".round").innerText = `Round: ${round}`;
    document.querySelector(".scoreone").innerText = playerXWins;
    document.querySelector(".scoretwo").innerText = playerOWins;
}

check1 = function () {
    player1 = prompt("Enter player one's name: ");
    if (player1 !== '') {
        document.querySelector(".playerone").innerText = `${player1} (X)`;
    }
}
check2 = function () {
    player2 = prompt("Enter player two's name: ");
    if (player2 !== '') {
        document.querySelector(".playertwo").innerText = `${player2} (O)`;
    }
}


// Made with love by Ana-Maria Tanasciuc ♥
