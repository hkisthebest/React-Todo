import React, { Component } from "react";
import TodoForm from "./TodoForm.js";
import Todo from "./Todo.js";
import shortid from "shortid";

//

class TodoList extends Component {
  state = {
    todos: [],
    toShow: "all"
  };

  addTodo = todo => {
    const temp = [todo, ...this.state.todos];
    this.setState({
      todos: temp
    });
  };

  onComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          //to update
          return {
            id: todo.id,
            text: todo.text,
            complete: !todo.complete,
            edit: todo.edit
          };
        } else {
          //no update
          return todo;
        }
      })
    });
  };

  changeComplete = toShow => {
    this.setState({ toShow: toShow });
  };

  handleDeleteTodo = id => {
    //if the id matches, delete it
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  };

  handleEdit = (id, text) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          //to update
          return {
            id: todo.id,
            text: text,
            complete: todo.complete,
            edit: !todo.edit
          };
        } else {
          //no update
          return todo;
        }
      })
    });
  };

  render() {
    let todos = []; //this will be the todos that will be rendering in return

    if (this.state.toShow === "all") {
      todos = this.state.todos;
    } else if (this.state.toShow === "todos") {
      todos = this.state.todos.filter(element => !element.complete); //filter out the completed ones
    } else if (this.state.toShow === "completed") {
      todos = this.state.todos.filter(element => element.complete); //filter out the incompleted ones
    }

    return (
      <div>
        Just Do It!! (Click to cross off)
        <TodoForm onSubmit={this.addTodo} />
        <ul>
          {todos.map(todo => (
            <li key={shortid.generate()}>
              <Todo
                key={todo.id}
                todo={todo}
                handleDelete={() => {
                  this.handleDeleteTodo(todo.id);
                }}
                onComplete={() => {
                  this.onComplete(todo.id);
                }}
                onEdit={text => {
                  this.handleEdit(todo.id, text); ///turn edit Bool to false or true
                }}
                editBool={todo.edit} /// pass true or false into child for child to show edit mode or showing mode
              />
            </li>
          ))}
        </ul>
        <div>
          <button onClick={() => this.changeComplete("all")}>All</button>
          <button onClick={() => this.changeComplete("todos")}>Todos</button>
          <button onClick={() => this.changeComplete("completed")}>
            Completed
          </button>
        </div>
      </div>
    );
  }
}

export default TodoList;
