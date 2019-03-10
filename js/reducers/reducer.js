var Boards = require("../components/boards");
var Sudoku = require("../components/sudoku");
var cloneDeep = require("lodash.clonedeep");

const Reducer = function(isAdmin) {
  return function boardReducer(state, action) {
    if (!state) {
      state = {};
    } else {
      state = cloneDeep(state);
    }
    switch (action.type) {
      case "RESUME_GAME":
        state.game = JSON.parse(localStorage.currentGame);
        state.game.time = new Date(state.game.time);
        break;
      case "NEW_GAME":
        state.game = Sudoku.boardToGame(Boards.randomBoard(action.difficulty));
        break;
      case "CHANGE_VALUE":
        state.game.cells[action.i][action.j].value = action.value;
        break;
      case "GIVE_SOLUTION":
        state.game.cells.forEach(function(element,i){
          element.forEach(function(ele,j){
            ele.value = action.result[i][j];
          });
        });
        break;
      case "ADD_SECOND":
        if (state.game) {
          state.game.time.setSeconds(state.game.time.getSeconds() + 1);
        }
        break;
    }
    if (state.game) {
      Sudoku.checkConflicts(state.game.cells);
      localStorage.currentGame = JSON.stringify(state.game);
    }
    return state;
  };
};

module.exports = Reducer;
