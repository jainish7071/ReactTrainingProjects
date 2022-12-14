import React, { Component } from "react";
import { HEADERS, SIGNUP_URL } from "../../Constants/Constants";

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      userDetails: {
        name: "",
        email: "",
        DOB: "",
        password: "",
        cpassword: "",
      },
    };
  }

  onInputChange = (event) => {
    this.setState({
      userDetails: { ...this.state.userDetails, [event.target.name]: event.target.value },
    });
  };

  signUp = async (event) => {
    event.preventDefault();
    if (this.state.userDetails.password.length < 8 || this.state.userDetails.password.length > 15) {
      return this.props.showAlert("danger","Password should be at least 8 and at most 15 characters");
    }
    if (this.state.userDetails.cpassword === this.state.userDetails.password) {
      const data = {
        name: this.state.userDetails.name,
        email: this.state.userDetails.email,
        DOB: this.state.userDetails.DOB,
        password: this.state.userDetails.password,
      };
      const result = await fetch(SIGNUP_URL, {
        headers: HEADERS,
        method: "POST",
        body: JSON.stringify(data),
      });
      const json = await result.json();
      if (json.status) {
        localStorage.setItem("authtoken", json.authToken);
        this.props.showAlert("success","Signed Up Successfully! Enjoy using my todo.")
        this.props.history.push("/");
      } else {
        this.props.showAlert("danger",json.data);
      }
    } else {
      this.props.showAlert("danger","Password must to be same !!");
    }
  };

  render() {
    return (
      <div className="container my-5">
        <h1 className="text-center">Signup</h1>
        <form className="container my-2" onSubmit={this.signUp}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="text" name="name" className="form-control" value={this.state.userDetails.name} onChange={this.onInputChange} id="name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input type="email" name="email" className="form-control" value={this.state.userDetails.email} onChange={this.onInputChange} id="email" aria-describedby="emailHelp" required />
            <div id="email-help" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="DOB" className="form-label">
              Email address
            </label>
            <input type="date" name="DOB" className="form-control" value={this.state.userDetails.DOB} onChange={this.onInputChange} id="DOB" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" value={this.state.userDetails.password} onChange={this.onInputChange} id="password" name="password" required />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input type="cpassword" className="form-control" value={this.state.userDetails.cpassword} onChange={this.onInputChange} id="cpassword" name="cpassword" required />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    );
  }
}
