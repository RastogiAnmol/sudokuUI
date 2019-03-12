var React = require("react");
import { render } from "react-dom";
var Store = require("./store/store");
var Home = require("./components/sudokuHome");
var MainPage = require("./components/MainPage");
var ShowLoader = require("./components/showLoader");
import { Router, Route, IndexRoute, hashHistory } from "react-router";

if (localStorage.currentGame) {
  Store.dispatch({ type: "RESUME_GAME" });
}

render(
  <Router history={hashHistory}>
    <Route path="/" component={Home.App}>
      <IndexRoute component={MainPage} />
      <Route path="play" component={Home.SudokuHome} />
      <Route path="new-game" component={ShowLoader} />
    </Route>
  </Router>,
  document.getElementById("sudokuroot")
);
