var React = require("react");
var Store = require("../store/store");
class BoardCell extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  shouldComponentUpdate(newProps, newState) {
    var oldCell = this.props.cell;
    var newCell = newProps.cell;
    return (
      oldCell.value !== newCell.value ||
      oldCell.editable !== newCell.editable ||
      oldCell.hasConflict !== newCell.hasConflict
    );
  }

  render() {
    var cell = this.props.cell;

    var cellClasses = [];
    cellClasses.push("i" + cell.i);
    cellClasses.push("j" + cell.j);
    cellClasses.push(cell.editable ? "editable" : "not-editable");
    cellClasses.push(cell.hasConflict ? "has-conflict" : "no-conflict");

    return (
      <td className={cellClasses.join(" ")}>
        <input
          type="text"
          value={cell.value}
          onClick={this.onClick}
          onChange={this.onChange}
        />
      </td>
    );
  }

  onClick(event) {
    event.preventDefault();
    if (this.props.cell.editable) {
      event.target.select();
    } else {
      event.target.blur();
    }
  }

  onChange(event) {
    event.preventDefault();
    var cell = this.props.cell;
    if (!cell.editable) {
      return;
    }
    var newValue = event.target.value;
    if (newValue !== "" && !/^[1-9]$/.test(newValue)) {
      event.target.value = cell.value;
      return;
    }
    Store.dispatch({
      type: "CHANGE_VALUE",
      i: cell.i,
      j: cell.j,
      value: newValue === "" ? null : parseInt(newValue)
    });
  }
}
module.exports = BoardCell;
