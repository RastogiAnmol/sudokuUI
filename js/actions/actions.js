// Action Creators =====================================
const actions = {
  api: {
    // change the url of the api after hostig swagger
    GET_SUDOKU_SOLUTION: "https://localhost:44371/api/SudokuSolver/solve"
  },
  //---------------------------------
  returnSudokuSolution: function(currentState) {
    var arrayOfArrays = [];
    var array = [];
    return function(dispatch) {
      currentState.forEach(function(element) {
        array = [];
        element.forEach(function(ele) {
          if (!ele.value) {
            ele.value = 0;
          }
          array.push(ele.value);
        });
        arrayOfArrays.push(array);
      });
      $.ajax({
        url: actions.api.GET_SUDOKU_SOLUTION,
        type: "POST",
          data: JSON.stringify(arrayOfArrays),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
          dispatch({
            type: "GIVE_SOLUTION",
            result: result
          });
        },
        error: function(error) {
          alert(JSON.stringify(error));
        }
      });
      // use this for test
      //     result = arrayOfArrays;
      //   dispatch({ type: "GIVE_SOLUTION", result: result });
    };
  }
};

module.exports = actions;
