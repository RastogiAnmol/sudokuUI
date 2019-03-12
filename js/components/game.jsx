var React = require("react");
var Store = require("../store/store");
var Sudoku = require("../utils/sudokuService");
import { Link } from "react-router";
import actions from "../actions/actions";
import BoardCell from './BoardCell';
import Controls from './Controls';


class DifficultyDialog extends React.Component {
  shouldComponentUpdate(newProps, newState) {
    return false;
  }

  constructor(props) {
    super(props);
    this.state = Store.getState();

    this.difficultyClick = this.difficultyClick.bind(this);
  }

  componentDidMount() {
    var self = this;
    self.unsubscribe = Store.subscribe(function() {
      self.setState(Store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div className="dialog">
        <Link to="/" className="dialog-close">
          &#x2715;
        </Link>
        <p>Please, choose the difficulty:</p>
        <button data-difficulty="easy" onClick={this.difficultyClick}>
          Easy
        </button>
        <button data-difficulty="medium" onClick={this.difficultyClick}>
          Medium
        </button>
        <button data-difficulty="hard" onClick={this.difficultyClick}>
          Hard
        </button>
      </div>
    );
  }

  difficultyClick(event) {
    event.preventDefault();
    var difficulty = event.target.getAttribute("data-difficulty");
    Store.dispatch({ type: "NEW_GAME", difficulty });
    location.hash = "play";
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = Store.getState();
  }

  componentDidMount() {
    var self = this;
    this.unsubscribe = Store.subscribe(function() {
      self.setState(Store.getState());
    });

    this.addSecond = setInterval(function() {
      Store.dispatch({ type: "ADD_SECOND" });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.addSecond);
    this.unsubscribe();
  }

  render() {
    if (typeof localStorage.currentGame === "undefined") {
      location.hash = "/";
      return <div />;
    }

    return (
      <div>
        <table className="sudoku-table">
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

        <Controls />
      </div>
    );
  }
}

class Index extends React.Component {
  render() {
    return (
      <div className="index">
        <h1>Sudoku</h1>
        <p>
          <Link to="new-game">Start a new game</Link>
        </p>
        {this.hasExistingGame() ? (
          <p>
            or <Link to="play">resume the existing one</Link>
          </p>
        ) : null}
      </div>
    );
  }

  hasExistingGame() {
    return typeof localStorage.currentGame !== "undefined";
  }
}

function App(props) {
  return <div>{props.children}</div>;
}

module.exports = { App, DifficultyDialog, Game, Index };
