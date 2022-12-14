import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { HEADERS, USER_URL } from "../../Constants/Constants";

export class Header extends Component {
  headers = HEADERS;
  user;

  static defaultProps = {
    title: "myTODO",
  };

  static propTypes = {
    title: PropTypes.string,
  };

  getUser = async () => {
    const response = await fetch(USER_URL,{
      headers : this.headers,
      method : "GET",
    });
    const json = await response.json();
    if(json.status){
      this.user = json.data;
      document.getElementById("username").innerText = this.user.name;
    }
  }

  componentDidUpdate(){
    if(localStorage.getItem("authtoken")){
      this.headers.authtoken = localStorage.getItem("authtoken");
      this.getUser();
    }
  }

  logout = () => {
    const confirm = window.confirm("Are you sure ?");
    if (confirm) {
      localStorage.removeItem("authtoken");
      this.props.showAlert("success","Logged Out Successfully");
      this.props.history.push("/login");
    }
  };

  render() {
    let pathName = this.props.location.pathname;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            {this.props.title}
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${pathName === "/" ? "active" : ""}`} aria-current="page" to="/">
                  Dashbord
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${pathName === "/about" ? "active" : ""}`} to="/about">
                  About
                </Link>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              {!localStorage.getItem("authtoken") ? (
                <>
                  <Link className={`btn btn${pathName === "/login" ? "-outline" : ""}-success mx-1`} aria-label="Login" role="button" to="/login">
                    <i className="fa-solid fa-right-to-bracket"></i>
                  </Link>
                  <Link className={`btn btn${pathName === "/signup" ? "-outline" : ""}-success mx-1`} role="button" to="/signup">
                    <i className="fa-solid fa-user-plus" aria-label="SignUp"></i>
                  </Link>
                </>
              ) : (
                <>
                <div className="text-light mx-2" id="username">
                </div>
                <button aria-label="Logout" onClick={this.logout} className="btn btn-success mx-1" type="button">
                  <i className="fa-solid fa-power-off"></i>
                </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);
