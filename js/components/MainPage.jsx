var React = require("react");
import { Link } from "react-router";

class MainPage extends React.Component {
  render() {
    return (
      <div className="index">
        <h2>Shall we play Sudoku</h2>
        <Link className="buttonShowSol" to="new-game">
          Let's start a new game
        </Link>
      </div>
    );
  }
}
module.exports = MainPage;
