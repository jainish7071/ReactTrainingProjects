import React, { Component } from "react";
import { HEADERS, LOGIN_URL } from "../../Constants/Constants";

export default class Login extends Component {
  headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  constructor() {
    super();
    this.state = {
      credentials: {
        email: "",
        password: "",
      },
    };
  }

  onInputChange = (event) => {
    this.setState({
      credentials: { ...this.state.credentials, [event.target.name]: event.target.value },
    });
  };

  login = async (event) => {
    event.preventDefault();
    if (this.state.credentials.password.length < 8 || this.state.credentials.password.length > 15) {
      return this.props.showAlert("danger","Password should be at least 8 and at most 15 characters");
    } else {
        const data = {
            email : this.state.credentials.email,
            password : this.state.credentials.password
        }
      const result = await fetch(LOGIN_URL,{
         headers : HEADERS,
         method : "POST",
         body : JSON.stringify(data)
      });
      const json = await result.json();
      if(json.status){
        localStorage.setItem("authtoken",json.authToken);
        this.props.history.push("/");
        this.props.showAlert("success", "Logged In Successfully!!")
      }else{
        this.props.showAlert("danger",json.data);
      }
    }
  };

  render() {
    return (
      <div className="container my-5" style={{ minHeight: "65.4vh" }}>
        <h1 className="text-center">Login</h1>
        <form className="container my-2" onSubmit={this.login}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input type="email" name="email" className="form-control" value={this.state.credentials.email} onChange={this.onInputChange} id="email" aria-describedby="emailHelp" />
            <div id="email-help" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" value={this.state.credentials.password} onChange={this.onInputChange} name="password" />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}
