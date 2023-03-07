const gameBoard = (function () {
  // array with 9 empty elements
  let board = new Array(9).fill("");

  displayBoard();

  // return the array board
  function getBoard() {
    return board;
  }
})();
