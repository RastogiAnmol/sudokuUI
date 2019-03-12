var SudokuGenerator = require("../utils/sudokuGenerator");
var SudokuService = require("../utils/sudokuService");
var clone = require("lodash.clonedeep");

const Reducer = function(isAdmin) {
  return function boardReducer(state, action) {
    if (!state) {
      state = {};
    } else {
      state = clone(state);
    }
    switch (action.type) {
      case "NEW_GAME":
        state.game = SudokuService.createGameFromARandomBoard(
          SudokuGenerator.randomBoard()
        );
        break;
      case "CHANGE_VALUE":
        state.game.cells[action.i][action.j].value = action.value;
        break;
      case "GIVE_SOLUTION":
        state.game.cells.forEach(function(element, i) {
          element.forEach(function(ele, j) {
            ele.value = action.result[i][j];
          });
        });
        break;
    }
    if (state.game) {
      SudokuService.isSudokuValid(state.game.cells);
      localStorage.currentGame = JSON.stringify(state.game);
    }
    return state;
  };
};

module.exports = Reducer;
