import React, { Component } from "react";
import "./styles/App.css";

class App extends Component {
  state = {
    list: [],
    item: "",
    show: false,
    style: { visibility: "hidden" }
  };

  /**
   * @function handleInputChange
   * Handle The value being inserted by the user and sets the state to that value
   */

  handleInputChange = e => {
    this.setState({
      item: e.target.value
    });
  };

  /**
   * @function handleNewItems
   * Handle The List of todo items by creating an object with key-value pairs and pushed into the concated list array
   * @var newID
   * This variable is used to set a specific id to each item using numbers and characters
   */

  handleNewItems = e => {
    e.preventDefault();
    const { list, item } = this.state;

    if (!item) {
      return null;
    }
    let char = "abcde";
    let newID =
      char[Math.floor(Math.random() * char.length)] +
      Math.floor(Math.random() * 100).toString();

    let newItem = {
      id: newID,
      data: item,
      completed: false
    };

    this.setState({
      list: [...list, newItem],
      item: ""
    });
  };

  /**
   * @function handleItemCompletion
   * Handle The completion of each item the user selected by changing the state of the completion key.
   */

  handleItemCompletion = e => {
    const { list } = this.state;

    let itemCompleted = e.target.id;
    let completed = e.target.value;

    list.forEach(item => {
      if (item.id === itemCompleted) {
        item.completed = Boolean(completed);
      }
    });

    this.setState({
      list: [...list]
    });
  };

  /**
   * @function handleRemoveItem
   * Handle The Removal of the item the user selects
   */

  handleRemoveItem = e => {
    const { list } = this.state;

    let itemRemoved = e.target.id;
    let newList;
    // eslint-disable-next-line
    newList = list.filter(item => {
      if (item.id !== itemRemoved) {
        return item;
      }
    });

    this.setState({
      list: newList
    });
  };

  render() {
    const { list, item, style } = this.state;

    return (
      <div className="todo-app">
        <div id="wrapper">
          <div className="todo-header-container">
            <h2 id="todo-header">TO-DO</h2>
          </div>

          <div className="todo-addnew-container">
            <form onSubmit={this.handleNewItems}>
              <input
                type="text"
                id="todo-addnew-item"
                placeholder="Add A New Todo Item"
                value={item}
                onChange={this.handleInputChange}
                autoFocus
              />
              <button id="todo-addnew-btn" type="submit">
                <strong>+</strong>
              </button>
            </form>
          </div>

          <div className="counter">
            <strong>
              {list.length === 1 ? "1 Item Left" : `${list.length} Items Left`}
            </strong>
          </div>

          {list.length ? (
            <div className="todo-list-container">
              {list.map(item => (
                <div
                  className="individual-item"
                  id={item.id}
                  onMouseOver={() =>
                    this.setState({ style: { visibility: null } })
                  }
                  onMouseOut={() =>
                    this.setState({ style: { visibility: "hidden" } })
                  }
                >
                  <input
                    type="checkbox"
                    className="checkbox"
                    id={item.id}
                    onClick={this.handleItemCompletion}
                    value={!item.completed}
                  />
                  <span className="item-data">{item.data}</span>

                  <button
                    className="item-completed-btn"
                    id={item.id}
                    onClick={this.handleRemoveItem}
                    style={style}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default App;
