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

  return { getBoard, addMarkToBoard, isBoardFilled, clearBoard };
})();

// 'Player' Factory function
const Player = (playerName, playerMark) => {
  // private variables
  const name = playerName;
  const mark = playerMark;

  // public functions
  const getName = () => name;
  const getMark = () => mark;
  const win = () => `${name} win the game!`;

  return { getName, getMark, win };
};

const displayControl = (function () {
  // DOM Elements
  const firstInput = document.getElementById("first");
  const secondInput = document.getElementById("second");

  const startBtn = document.querySelector(".start-btn");
  const resetBtn = document.querySelector(".reset-btn");

  const gameBoardEl = document.querySelector(".game-board");

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

  // function add new 'cell' elements into 'gameboard' grid element
  const renderGameBoard = (board) => {
    board.forEach((_, i) => {
      const cellEl = document.createElement("button");
      cellEl.className = "cell";
      cellEl.dataset.cell = i;

      gameBoardEl.appendChild(cellEl);
    });
  };

  return { getFirstInputValue, getSecondInputValue };
})();
