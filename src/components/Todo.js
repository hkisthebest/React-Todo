import React from "react";
// import TodoForm from "./TodoForm";

class Todo extends React.Component {
  state = {
    text: ""
  };

  handleChange = event => {
    //handling input changes
    this.setState({
      text: event.target.value
    });
  };

  handleSubmit = event => {
    //set this.state.text to the input
    event.preventDefault();
    this.props.onChangeEditedText({
      text: this.state.text
    });
  };

  render() {
    if (this.props.editBool === false) {
      return (
        <div>
          <a
            style={{
              textDecoration: this.props.todo.complete ? "line-through" : ""
            }}
            onClick={this.props.onComplete}
            href="#"
          >
            {this.props.todo.text}
          </a>
          <button onClick={this.props.handleDelete}>delete</button>
          <button onClick={this.props.onEdit}>edit</button>
        </div>
      );
    } else if (this.props.editBool !== false) {
      return (
        <div>
          <form onSubmit={this.props.onChangeEditedText}>
            <input
              name="text"
              placeholder="EDIT!!!"
              value={this.state.text}
              onChange={this.handleChange}
            />
            <button
              type="button"
              onClick={() => {
                this.props.onEdit(this.state.text);
              }} //switch to false and edit text
              onSubmit={this.handleSubmit}
            >
              done
            </button>
          </form>
        </div>
      );
    }
  }
}
export default Todo;
