# Tic Tac Toe
**Rules:**
1. First player to win 3 rounds wins the game
2. If there are 5 draws then the game ends in a draw
   
(Revision of my first [Javascript project from 2022](https://github.com/anasolomon/tiptaptoe), replaced old bad practices with my new better good practice knowledge from 2023.
)

## Tic Tac Toe V2
After stumbling upon my old code my eyes were already bleeding so I had to redo the whole thing while trying to keep the same UI. You can see the old code [here](https://github.com/anasolomon/tiptaptoe)   


<hr>

Removed the individual blocks' unique ids from the html and replace it with event listeners `onclick="clicked(index)` to make the code more dynamic.   

```html
<table id="board">
        <tr>
            <td class="notop noleft neonText" onclick="clicked(0)"></td>
            <td class="notop neonText" onclick="clicked(1)"></td>
            <td class="notop noright neonText" onclick="clicked(2)"></td>
        </tr>

        <tr>
            <td class="noleft neonText" onclick="clicked(3)"></td>
            <td class="neonText" onclick="clicked(4)"></td>
            <td class="noright neonText" onclick="clicked(5)"></td>
        </tr>

        <tr>
            <td class="noleft nobot neonText" onclick="clicked(6)"></td>
            <td class="nobot neonText" onclick="clicked(7)"></td>
            <td class="noright nobot neonText" onclick="clicked(8)"></td>
        </tr>
    </table>
```

Made a multidimensional array that stores the blocks clicked on the board.   
Also initialized variables:   
`playerXWins` to keep track of X's wins and `playerOWins` to keep track of O's wins.  
`round` to display current round they players are on, initialized to 1.  
`draw` to keep track of how many draws happen throughout the game.  
Default names for `player1` is 'Player X' and for `player2` is 'Player O'.  
`player` will keep track of the current player making a move and `currentPlayer` displays if it's X or O (initially initialized to X). This is done in case a player decides to replace 'Player X'/'Player O' with their name/nickname by clicking on them.   

```js
let playerXWins = 0;
let playerOWins = 0;
let round = 1;
let draw = 0;
let player1 = "Player X";
let player2 = "Player O";
const winner_rounds = 3;
const drawsAllowed = 5;
let player = player1;
let currentPlayer = 'X';

const board = ['', '', '', '', '', '', '', '', ''];
```

The function `handleOnClick` is called when a player clicks a cell. The `cellIndex` parameter indicates which cell is clicked. Inside this function:
- We check if the `board` (cell clicked) is empty, if yes then we proceed
- We update the `board` array with the `currentPlayer`'s symbol ('X' or 'O') at the clicked cell index
- We update corrisponding cell on the board to display `currentPlayer`'s symbol
- When the player makes a move the error message "block already occupied" also gets errased
- We check if the round has been won with `checkWin` function, if a win condition is met then we write in `endround` `Player` has won round `round`
- Ternary Operator checks if `currentPlayer` equals to 'X' if yes then incrementation for `playerXWins` happens if not then incrementation for `playerOWins` happens, this to keep track of player X/player O's wins
- displayRounds() executes to update the round number and each player's score. (I think I will use setState with React in the future for this one among the other functions that get called just to update variables)
- checkWinner() gets executed and checks if either Player X or Player O has reached 3 wins
- maxDraws() gets executed and checks if the limit allowed for draws (5) was reached
- resetRound() gets executed to reset the round
- `round` variable is incremented
- else if (the checkWin function returned a false) we check if the every cell isnt empty, if this conditon is met then we call for a draw, writting "There are no winners" in `endround` and delete that message after 1 second, `maxDraws()` gets called to check if the 5 draws were met, displayRound() updates player scores/round, round gets reset with resetRound() and draw/round get incremented by 1
- else (checkWin returned a false and every cell wasnt full) we updated currentPlayer/player with the opposite player and write whose's turn is 

Else (if the cell clicked at cellIndex wasn't empty) we write in `error` "Block already occupied" and reset the error message in 1 second (`error` also gets reset if a player clicks an empty cell in case the players are moving fast with their game this makes the UI much smoother)  

```js
function handleOnClick(cellIndex) {


    if (board[cellIndex] === '') { // IF CELL CLICKED IS EMPTY
        board[cellIndex] = currentPlayer; // STORE X/O INSIDE THE ARRAY 
        document.getElementsByClassName('cell')[cellIndex].innerText = currentPlayer; // STORE X/O IN THE <td> 
        document.querySelector(".error").innerText = "";


        if (checkWin()) { // checkWin RETURNS TRUE IF CONDITION IS MET
            document.querySelector(".endround").innerText = `${player} has won round ${round - 1}!`;
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
```
This function checks if the current player has won the round. `winConditions` defines all possible winning conditions. Then I used the `Array.prototype.some()` method to look through the defined conditions and check if any of them have been met with the currentPlayer's symbol. If a condition is met it returns `true`.  

```js
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
```

This function checks if a player has achieved 3 wins, writes they have won in `big-text` and `endGame()` resets the whole game

```js
function checkWinner() {
    if (playerXWins == winner_rounds) {
        document.querySelector(".big-text").innerText = `${player1} won the game!`;
        endGame();
    } else if (playerOWins == winner_rounds) {
        document.querySelector(".big-text").innerText = `${player2} won the game!`;
        endGame();
    }
}
```

This function resets the round by filling the `board` array with empty strings, emptying all of the cells, setting `currentPlayer` back to X and `player` back to `player1`

```js
function resetRound() {
    board.fill(''); // FILLS board ARRAY WITH EMPTY STRINGS
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = ''); // SELECTS ALL cells AND PUTS AN EMPTY STRING IN EACH OF THEM
    currentPlayer = 'X';
    player = player1;
}
```

This function ends the game by resetting the rounds back to 1, draws back to 0, players's wins to 0 and empties the `endround` text

```js
function endGame() {
    round = 1;
    draw = 0;
    playerXWins = 0;
    playerOWins = 0;
    document.querySelector(".endround").innerText = "";
}
```

This function displays "It's {current player name}'s turn ({current player symbol}) 

```js
function currentTurnDisplay() {
    turn.innerHTML = `It's ${player}'s turn (${currentPlayer})`;
}
```

This function gets called to update the current round displayed together with the players' wins displayed below their names

```js
function displayRounds() {
    document.querySelector(".round").innerText = `Round: ${round}`;
    document.querySelector(".scoreone").innerText = playerXWins;
    document.querySelector(".scoretwo").innerText = playerOWins;
}
```

If either Player X or Player O get clicked the user gets to replace them with whatever custom nickname they want and it will be displayed and updated in both above their scores and at the botton left in "Current player's turn"

```js
check1 = function () {
    player1 = prompt("Enter player one's name: ");
    if (player1 !== '') {
        document.querySelector(".playerone").innerHTML = `${player1} (X)`;
    }
}
check2 = function () {
    player2 = prompt("Enter player two's name: ");
    if (player2 !== '') {
        document.querySelector(".playertwo").innerHTML = `${player2} (O)`;
    }
}
```