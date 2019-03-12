var React = require("react");
var Store = require("../store/store");

class ShowLoader extends React.Component {
  shouldComponentUpdate(newProps, newState) {
    return false;
  }

  constructor(props) {
    super(props);
    this.state = Store.getState();

    this.loadGame = this.loadGame.bind(this);
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
    var me = this;
    return (
      <div className="container">
        <img src="../../images/loader.svg" />
        <span className="dontDisplay">
          {setTimeout(function() {
            me.loadGame();
          }, 2000)}
        </span>
      </div>
    );
  }
  loadGame() {
    Store.dispatch({ type: "NEW_GAME" });
    location.hash = "play";
  }
}
module.exports = ShowLoader;
