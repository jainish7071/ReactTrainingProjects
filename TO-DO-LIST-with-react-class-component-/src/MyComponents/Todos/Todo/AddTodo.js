import React, { Component } from "react";
import { withRouter } from "react-router-dom";

export class AddTodo extends Component {
  myStyle = {
    minHeight: "75vh",
  };
  constructor(props) {
    super(props);
    if (this.props.todo) {
      this.state = {
        title: this.props.todo.title,
        desc: this.props.todo.desc,
        _id: this.props.todo._id,
      };
    } else {
      this.state = {
        title: "",
        desc: "",
        _id: -1,
      };
    }
  }

  submit = (e) => {
    e.preventDefault();
    if (!this.state.title.trim() || !this.state.desc.trim()) {
      this.props.showAlert("danger","title or desc can not be blank");
    } else {
      this.props.modifyTodo(this.state.title, this.state.desc, this.state._id);
      this.setState({
        title: "",
        desc: "",
        _id: -1,
      });
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <div className="container my-3" style={this.myStyle}>
        <form onSubmit={this.submit}>
          <h3 className="text-center">{this.props.todo ? "Update TODO" : "Add TODO"}</h3>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Todo Title
            </label>
            <input
              type="text"
              value={this.state.title}
              onChange={(e) => {
                this.setState({
                  title: e.target.value,
                });
              }}
              className="form-control"
              id="title"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">
              Todo Description
            </label>
            <input
              type="text"
              value={this.state.desc}
              onChange={(e) => {
                this.setState({
                  desc: e.target.value,
                });
              }}
              className="form-control"
              id="desc"
              required
            />
          </div>
          <button type="submit" className="btn btn-sm btn-success">
            {this.props.todo ? "Update Todo" : "Add Todo"}
          </button>
          <button type="button" onClick={() => this.props.history.push("/")} className=" mx-2 btn btn-sm btn-danger">
            {" "}
            Cancel{" "}
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(AddTodo);
