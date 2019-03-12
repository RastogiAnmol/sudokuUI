var chunk = require("lodash.chunk");

function LoadANewGame(cells, time) {
  return {
    cells,
    time: time || new Date(0, 0, 0, 0, 0, 0, 0)
  };
}

function createNewSudokuCell(i, j, value, editable) {
  return {
    value,
    editable,
    hasConflict: false,
    i,
    j
  };
}

function uncheckConflictFlag(cells) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      cells[i][j].hasConflict = false;
    }
  }
}

function checkThreeByThreeSudokuBox(array) {
  var nums = {};
  for (var i = 0; i < 9; i++) {
    if (array[i].value !== null && nums.hasOwnProperty(array[i].value)) {
      array[i].hasConflict = true;
      array[nums[array[i].value]].hasConflict = true;
    }
    nums[array[i].value] = i;
  }
}

function isSudokuValid(cells) {
  uncheckConflictFlag(cells);

  // check rows
  for (var i = 0; i < 9; i++) {
    var arr = [];
    for (var j = 0; j < 9; j++) {
      arr.push(cells[i][j]);
    }
    checkThreeByThreeSudokuBox(arr);
  }

  // check columns
  for (var j = 0; j < 9; j++) {
    var arr = [];
    for (var i = 0; i < 9; i++) {
      arr.push(cells[i][j]);
    }
    checkThreeByThreeSudokuBox(arr);
  }

  // check three by three box
  var gridCells = cells;
  checkThreeByThreeSudokuBox([
    gridCells[0][0],
    gridCells[0][1],
    gridCells[0][2],
    gridCells[1][0],
    gridCells[1][1],
    gridCells[1][2],
    gridCells[2][0],
    gridCells[2][1],
    gridCells[2][2]
  ]);
  checkThreeByThreeSudokuBox([
    gridCells[3][0],
    gridCells[3][1],
    gridCells[3][2],
    gridCells[4][0],
    gridCells[4][1],
    gridCells[4][2],
    gridCells[5][0],
    gridCells[5][1],
    gridCells[5][2]
  ]);
  checkThreeByThreeSudokuBox([
    gridCells[6][0],
    gridCells[6][1],
    gridCells[6][2],
    gridCells[7][0],
    gridCells[7][1],
    gridCells[7][2],
    gridCells[8][0],
    gridCells[8][1],
    gridCells[8][2]
  ]);

  checkThreeByThreeSudokuBox([
    gridCells[0][3],
    gridCells[0][4],
    gridCells[0][5],
    gridCells[1][3],
    gridCells[1][4],
    gridCells[1][5],
    gridCells[2][3],
    gridCells[2][4],
    gridCells[2][5]
  ]);
  checkThreeByThreeSudokuBox([
    gridCells[3][3],
    gridCells[3][4],
    gridCells[3][5],
    gridCells[4][3],
    gridCells[4][4],
    gridCells[4][5],
    gridCells[5][3],
    gridCells[5][4],
    gridCells[5][5]
  ]);
  checkThreeByThreeSudokuBox([
    gridCells[6][3],
    gridCells[6][4],
    gridCells[6][5],
    gridCells[7][3],
    gridCells[7][4],
    gridCells[7][5],
    gridCells[8][3],
    gridCells[8][4],
    gridCells[8][5]
  ]);

  checkThreeByThreeSudokuBox([
    gridCells[0][6],
    gridCells[0][7],
    gridCells[0][8],
    gridCells[1][6],
    gridCells[1][7],
    gridCells[1][8],
    gridCells[2][6],
    gridCells[2][7],
    gridCells[2][8]
  ]);
  checkThreeByThreeSudokuBox([
    gridCells[3][6],
    gridCells[3][7],
    gridCells[3][8],
    gridCells[4][6],
    gridCells[4][7],
    gridCells[4][8],
    gridCells[5][6],
    gridCells[5][7],
    gridCells[5][8]
  ]);
  checkThreeByThreeSudokuBox([
    gridCells[6][6],
    gridCells[6][7],
    gridCells[6][8],
    gridCells[7][6],
    gridCells[7][7],
    gridCells[7][8],
    gridCells[8][6],
    gridCells[8][7],
    gridCells[8][8]
  ]);
}

// isSudokuValid must run first
function isComplete(cells) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var cell = cells[i][j];
      if (cell.hasConflict || cell.value === null) {
        return false;
      }
    }
  }
  return true;
}

function createGameFromARandomBoard(board) {
  var array = [];
  for (var i = 0; i < 81; i++) {
    if (board[i] === "0") {
      array.push(null);
    } else {
      array.push(parseInt(board[i]));
    }
  }
  array = chunk(array, 9);

  var game = [];
  for (var i = 0; i < 9; i++) {
    var line = [];
    for (var j = 0; j < 9; j++) {
      line.push(createNewSudokuCell(i, j, array[i][j], array[i][j] === null));
    }
    game.push(line);
  }
  return LoadANewGame(game, null);
}

var SudokuService = {
  LoadANewGame,
  createNewSudokuCell,
  isSudokuValid,
  isComplete,
  createGameFromARandomBoard
};

module.exports = SudokuService;
