var React = require("react");
var Store = require("../store/store");
var Sudoku = require("../utils/sudokuService");
import { Link } from "react-router";
import actions from "../actions/actions";

class Controls extends React.Component {
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
    var time = this.state.game.time;
    function f(num) {
      if (num < 10) {
        return "0" + num;
      } else {
        return "" + num;
      }
    }
    return (
      <div className="controls">
        {Sudoku.isComplete(this.state.game.cells) ? (
          <div><h2 className="hurray">Hurray!</h2></div>
        ) : (
          <p>
            {f(time.getHours()) +
              ":" +
              f(time.getMinutes()) +
              ":" +
              f(time.getSeconds())}
          </p>
        )}
        <button onClick={this.giveMeSolution}>Give me solution</button>
      </div>
    );
  }
}

module.exports = Controls;
