const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const restartBtn = document.querySelector('.restart');
const popup = document.querySelector('.popup');
const popupMessage = document.querySelector('.popup-message');
const restartGameBtn = document.querySelector('.restart-game');
const scoreBoard = document.querySelector('.score-board');
const xPieceInput = document.querySelector('#x-piece');
const oPieceInput = document.querySelector('#o-piece');
const boardColorInput = document.querySelector('#board-color');
const applySettingsBtn = document.querySelector('.apply-settings');

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
let xWins = 0;
let oWins = 0;
let draws = 0;

const startGame = () => {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);
    restartGameBtn.addEventListener('click', restartGame);
    applySettingsBtn.addEventListener('click', applySettings);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
    updateScoreBoard();
    applySettings();
};

const cellClicked = (e) => {
    const index = e.target.getAttribute('data-index');

    if (options[index] !== "" || !running) return;

    updateCell(e.target, index);
    checkWinner();
};

const updateCell = (cell, index) => {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer === "X" ? xPieceInput.value : oPieceInput.value;
    cell.classList.add(currentPlayer === "X" ? 'x-player' : 'o-player');
};

const changePlayer = () => {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
};

const checkWinner = () => {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (options[a] && options[a] === options[b] && options[a] === options[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        updateScore(currentPlayer);
        showPopup(`${currentPlayer} wins!`);
        running = false;
    } else if (!options.includes("")) {
        draws++;
        updateScore();
        showPopup(`Draw!`);
        running = false;
    } else {
        changePlayer();
    }
};

const updateScore = (winner) => {
    if (winner === "X") {
        xWins++;
    } else if (winner === "O") {
        oWins++;
    }
    updateScoreBoard();
};

const updateScoreBoard = () => {
    scoreBoard.textContent = `X Wins: ${xWins} | O Wins: ${oWins} | Draws: ${draws}`;
};

const showPopup = (message) => {
    popupMessage.textContent = message;
    popup.classList.add('visible');
};

const restartGame = () => {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('x-player', 'o-player');
    });
    running = true;
    popup.classList.remove('visible');
};

const applySettings = () => {
    // Apply custom pieces and board color
    cells.forEach(cell => {
        if (options[cell.getAttribute('data-index')] === "X") {
            cell.textContent = xPieceInput.value;
        } else if (options[cell.getAttribute('data-index')] === "O") {
            cell.textContent = oPieceInput.value;
        }
    });
    document.querySelector('.board').style.backgroundColor = boardColorInput.value;
};

startGame();
