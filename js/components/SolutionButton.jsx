var React = require("react");
var Store = require("../store/store");
var Sudoku = require("../utils/sudokuService");
import actions from "../actions/actions";

class SolutionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = Store.getState();
    this.giveMeSolution = this.giveMeSolution.bind(this);
  }

  componentDidMount() {
    var self = this;
    self.unsubscribe = Store.subscribe(function() {
      self.setState(Store.getState());
    });
  }
  giveMeSolution() {
    Store.dispatch(actions.returnSudokuSolution(this.state.game.cells));
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div className="controls">
        {Sudoku.isComplete(this.state.game.cells) ? (
          <div>
            <h2 className="hurray">Hurray! You have completed</h2>
          </div>
        ) : (
          <span />
        )}
        <button className="buttonShowSol" onClick={this.giveMeSolution}>
          Give me solution
        </button>
      </div>
    );
  }
}

module.exports = SolutionButton;
