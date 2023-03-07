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

  return { getBoard, addMarkToBoard, isBoardFilled };
})();
