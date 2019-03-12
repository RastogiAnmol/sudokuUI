var React = require("react");
var Store = require("../store/store");
import BoardCell from "./BoardCell";
import SolutionButton from "./SolutionButton";


class SudokuHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = Store.getState();
  }

  componentDidMount() {
    var self = this;
    this.unsubscribe = Store.subscribe(function() {
      self.setState(Store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (typeof localStorage.currentGame === "undefined") {
      location.hash = "/";
      return <div />;
    }

    return (
      <div>
        <table className="sudoku-grid">
          <tbody>
            {this.state.game.cells.map(function(line, i) {
              return (
                <tr key={i}>
                  {line.map(function(cell) {
                    return <BoardCell cell={cell} key={cell.j} />;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <SolutionButton />
      </div>
    );
  }
}

function App(props) {
  return <div>{props.children}</div>;
}

module.exports = { App, SudokuHome };
