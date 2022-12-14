import "./App.css";
import Header from "./MyComponents/Header/Header";
import { Todos } from "./MyComponents/Todos/Todos";
import { Footer } from "./MyComponents/Footer/Footer";
import { AddTodo } from "./MyComponents/Todos/Todo/AddTodo";
import { About } from "./MyComponents/About/About";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./MyComponents/Signup/SignUp";
import Login from "./MyComponents/Login/Login";
import { HEADERS, TODO_URL } from "./Constants/Constants";
import Alert from "./MyComponents/Alert/Alert";
import TodoContext from "./context/todoContext";
class App extends Component {
  headers = HEADERS;

  constructor() {
    super();
    this.state = {
      todos: [],
      alert: {
        isEnabled: false,
        type: "primary",
        msg: "Something Went Wrong",
      },
    };
  }

  async componentDidMount() {
    this.headers.authtoken = localStorage.getItem("authtoken");
  }

  showAlert = (type, msg) => {
    this.setState({
      alert: {
        isEnabled: true,
        type: type,
        msg: msg,
      },
    });
    setTimeout(() => {
      this.setState({
        alert: {
          isEnabled: false,
        },
      });
    }, 2000);
  };

  setTodos = (todos) => {
    this.setState({
      todos: todos,
    });
  };

  onDelete = async (todo) => {
    let isConfirm = window.confirm("Are you sure ?");
    if (isConfirm) {
      let response = await fetch(`${TODO_URL}/${todo._id}`, {
        method: "DELETE",
        headers: this.headers,
      });
      let json = await response.json();
      if (json.status) {
        this.setState({
          todos: this.state.todos.filter((e) => e !== todo),
        });
        this.showAlert("success", "Todo is deleted successfully");
      } else {
        this.showAlert("danger", json.data);
      }
    }
  };

  modifyTodo = (title, desc, _id) => {
    let isUpdate = true;
    if (_id === -1) {
      if (this.state.todos.length === 0) {
        _id = 1;
      } else {
        _id = this.state.todos[this.state.todos.length - 1]._id + 1;
      }
      isUpdate = false;
    }
    if (isUpdate) {
      this.updateTodo(_id, title, desc);
    } else {
      this.addTodo(title, desc);
    }
  };

  addTodo = async (title, desc) => {
    let response = await fetch(TODO_URL, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        title,
        desc,
      }),
    });
    let json = await response.json();
    if (json.status) {
      this.setState({
        todos: [...this.state.todos, json.data],
      });
      this.showAlert("success", "Todo Added Successfully");
    } else {
      this.showAlert("danger", json.data);
    }
  };
  updateTodo = async (_id, title, desc) => {
    let response = await fetch(`${TODO_URL}/${_id}`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify({
        title,
        desc,
      }),
    });
    let json = await response.json();
    if (json.status) {
      let todos = this.state.todos.map((e) => {
        let todo = e;
        if (todo._id === _id) {
          todo.title = title;
          todo.desc = desc;
        }
        return todo;
      });
      this.setState({
        todos: todos,
      });
      this.showAlert("success", "Todo Updated successfully");
    } else {
      this.showAlert("danger", json.data);
    }
  };

  render() {
    return (
      <>
        <Router>
          <TodoContext.Provider value={{ setTodo: this.setTodos }}>
            <Header title="myTODO" showAlert={this.showAlert} />
            {this.state.alert.isEnabled && <Alert type={this.state.alert.type} msg={this.state.alert.msg} />}
            <div style={{ marginTop: "65px" }}></div>
            <Switch>
              <Route exact path="/" children={(props) => <Todos getTodos={this.getTodos} todos={this.state.todos} onDelete={this.onDelete} history={props.history} />} />
              <Route exact path="/about" component={About} />
              <Route path={`/todo/:id`} children={(props) => <AddTodo todo={this.state.todos.find((e) => e._id.toString() === props.match.params.id)} modifyTodo={this.modifyTodo} history={props.history} />} />
              <Route exact path="/todo" children={(props) => <AddTodo showAlert={this.showAlert} modifyTodo={this.modifyTodo} history={props.history} />} />
              <Route exact path="/login" children={(props) => <Login history={props.history} showAlert={this.showAlert} />} />
              <Route exact path="/signup" children={(props) => <SignUp history={props.history} showAlert={this.showAlert} />} />
            </Switch>
            <Footer />
          </TodoContext.Provider>
        </Router>
      </>
    );
  }
}

export default App;
