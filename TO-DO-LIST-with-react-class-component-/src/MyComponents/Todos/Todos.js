import React, { Component } from "react";
import { TodoItem } from "./Todo/TodoItem";
import { Link } from "react-router-dom";
import TodoContext from "../../context/todoContext";
import { HEADERS, TODO_URL } from "../../Constants/Constants";

export class Todos extends Component {

  static contextType = TodoContext;

  constructor(props){
    super(props);
    if(!localStorage.getItem('authtoken')){
      this.props.history.push("/login");
    }else{
      this.headers = HEADERS;
      this.headers.authtoken = localStorage.getItem("authtoken");
    }
  }

  myStyle = {
    minHeight: "76vh",
    margin: "40px auto",
  };
  buttonStyle = {
    display: "flex",
    position: "absolute",
    alignContent: "center",
    justifyContent: "center",
    top: "15px",
    right: "0px",
    fontSize: "30px",
  };

  
  getTodos = async ()=>{
    let response = await fetch(TODO_URL, {
      method: "GET",
      headers: this.headers,
    });
    let json = await response.json();
    this.context.setTodo(json.data);
  }

  componentDidMount(){
    this.getTodos();
  }

  render() {
    return (
      <div className="container my-3" style={this.myStyle}>
        <div className="d-flex" style={{ position: "relative" }}>
          <h3 className="text-center my-2">Your Todos</h3>
          <Link to="/todo">
            <i className="fa-regular fa-square-plus text-primary" style={this.buttonStyle}></i>
          </Link>
        </div>
        <hr />
        <div className="row">
          {this.props.todos.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center fs-1 my-5 text-danger ">No Todos To Display</div>
          ) : (
            this.props.todos.map((todo) => {
              return <TodoItem todo={todo} key={todo._id} onDelete={this.props.onDelete} />;
            })
          )}
        </div>
      </div>
    );
  }
}
