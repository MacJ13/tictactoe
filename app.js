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

  function addMarkToBoard(index, mark) {
    // we check if index has falsy value and index is bigger than array length
    console.log();
    if (index > board.length - 1 || board[index] || isBoardFilled()) {
      console.log("you already add mark in that cell");
      return;
    }
    board[index] = mark;

    displayBoard();
  }

  return { getBoard, addMarkToBoard };
})();
