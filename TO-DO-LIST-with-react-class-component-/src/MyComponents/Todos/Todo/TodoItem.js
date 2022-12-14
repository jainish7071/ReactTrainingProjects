import React, { Component } from "react";
import { Link } from "react-router-dom";

export class TodoItem extends Component {
  render() {
    return (
      <>
        <div className="col-md-4">
          <div className="card my-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-item-center">
                <h5 className="card-title">{this.props.todo.title}</h5>
                <div style={{ fontSize: "20px" }}>
                  <Link to={`/todo/${this.props.todo._id}`}>
                    <i className="fa-solid fa-highlighter mx-1 text-primary"></i>
                  </Link>
                  <i
                    className="fa-solid fa-square-minus mx-1 text-danger"
                    onClick={() => {
                      this.props.onDelete(this.props.todo);
                    }}
                  ></i>
                </div>
              </div>
              <p className="card-text">{this.props.todo.desc}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default TodoItem;
