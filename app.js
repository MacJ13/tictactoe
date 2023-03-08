const gameBoard = (function () {
  // array with 9 empty elements
  let board = new Array(9).fill("");

  displayBoard();

  // return the array board
  function getBoard() {
    return board;
  }

  // function to display board in console
  function displayBoard() {
    let str = "";
    for (let i = 0; i < board.length; i += 3) {
      for (let j = 0; j < board.length / 3; j++) {
        str += board[i + j] ? `[${board[i + j]}]` : "[ ]";
      }
      str += "\n";
    }
    console.log(str);
  }

  // function return boolean value if array doesn't have any of falsy value
  function isBoardFilled() {
    return !board.some((cell) => cell === "");
  }

  function addMarkToBoard(index, mark) {
    // we check if index has falsy value and index is bigger than array length
    if (index > board.length - 1 || board[index]) return;

    // add mark to index
    board[index] = mark;

    displayBoard();
  }

  function clearBoard() {
    board = new Array(9).fill("");
  }

  function isElementBoardEmpty(index) {
    return board[index] === "";
  }

  // check possible correct lines
  function checkLineupBoard(mark) {
    const correctLineups = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const lineup of correctLineups) {
      // const [a, b, c] = lineup;
      // console.log(lineup, [board[a], board[b], board[c]]);
      if (lineup.every((index) => board[index] === mark)) {
        return true;
      }
    }

    return false;
  }

  return {
    getBoard,
    addMarkToBoard,
    isBoardFilled,
    clearBoard,
    isElementBoardEmpty,
    checkLineupBoard,
  };
})();

// 'Player' Factory function
const Player = (playerName, playerMark) => {
  // private variables
  const name = playerName;
  const mark = playerMark;

  // public functions
  const getName = () => name;
  const getMark = () => mark;

  const turn = () => `now, it's ${name}'s turn`;
  const win = () => `${name} win the game!`;

  return { getName, getMark, win, turn };
};

// 'DISPLAY CONTROL' MODULE PATTERN'
const displayControl = (function (board) {
  // DOM Elements
  const firstInput = document.getElementById("first");
  const secondInput = document.getElementById("second");

  const startBtn = document.querySelector(".start-btn");
  const resetBtn = document.querySelector(".reset-btn");

  const gameBoardEl = document.querySelector(".game-board");

  const gameCurrentEl = document.querySelector(".game-current");

  // functions return input values
  const getFirstInputValue = () => {
    return firstInput.value || "Player1";
  };

  const getSecondInputValue = () => {
    return secondInput.value || "Player 2";
  };
  // function open 'game content' element and close 'form player' element
  const showGameContent = () => {
    const gameContentEl = document.querySelector(".game-content");
    const playerFormEl = document.querySelector(".player-form");

    gameContentEl.classList.remove("hidden");
    playerFormEl.classList.add("hidden");
    console.log("Hello");
  };

  const setCurrentPlayer = (txt) => {
    gameCurrentEl.textContent = txt;
  };

  function getCell(e) {
    const target = e.target;

    // if (target.className !== "cell") return;

    const { cell } = target.dataset;
    return cell;
  }

  function showMarkToCellBoard(cellNumber, mark) {
    const cellEL = document.querySelector(`button[data-cell="${cellNumber}"]`);

    cellEL.textContent = mark;
  }

  // function add new 'cell' elements into 'gameboard' grid element
  const renderGameBoard = () => {
    gameBoardEl.innerHTML = "";
    board.forEach((_, i) => {
      const cellEl = document.createElement("button");
      cellEl.className = "cell";
      cellEl.dataset.cell = i;

      gameBoardEl.appendChild(cellEl);
    });
  };

  // function with event listener of button 'start' element
  function onClickBtnStart(fn) {
    startBtn.addEventListener("click", () => {
      fn();
      renderGameBoard();
      showGameContent();
    });
  }

  function onClickGameBoard(fn) {
    gameBoardEl.addEventListener("click", (e) => {
      const cellNumber = getCell(e);
      if (!cellNumber) return;
      fn(cellNumber);
    });
  }

  function onClickResetBtn(fn) {
    resetBtn.addEventListener("click", () => {
      fn();
      renderGameBoard();
    });
  }

  return {
    getFirstInputValue,
    getSecondInputValue,
    onClickBtnStart,
    setCurrentPlayer,
    onClickGameBoard,
    showMarkToCellBoard,
    onClickResetBtn,
  };
})(gameBoard.getBoard());

// THE 'GAME' MODULE PATTERN
const game = (function () {
  let firstPlayer;
  let secondPlayer;

  let currentPlayer;
  let stopPlaying = false;

  function createPlayers() {
    const firstName = displayControl.getFirstInputValue();
    const secondName = displayControl.getSecondInputValue();

    firstPlayer = Player(firstName, "x");
    secondPlayer = Player(secondName, "o");

    currentPlayer = firstPlayer;
    displayControl.setCurrentPlayer(currentPlayer.turn());
  }

  function play(cellNumber) {
    if (stopPlaying || !gameBoard.isElementBoardEmpty(cellNumber)) return;

    let playerInfo = "";

    gameBoard.addMarkToBoard(cellNumber, currentPlayer.getMark());
    displayControl.showMarkToCellBoard(cellNumber, currentPlayer.getMark());

    if (gameBoard.checkLineupBoard(currentPlayer.getMark())) {
      playerInfo = currentPlayer.win();
      stopPlaying = true;
    } else if (gameBoard.isBoardFilled()) {
      playerInfo = "It's a tie!!";
      stopPlaying = true;
    } else {
      currentPlayer =
        currentPlayer === firstPlayer ? secondPlayer : firstPlayer;
      playerInfo = currentPlayer.turn();
    }

    displayControl.setCurrentPlayer(playerInfo);
  }

  displayControl.onClickBtnStart(createPlayers);

  displayControl.onClickGameBoard(play);
})();
