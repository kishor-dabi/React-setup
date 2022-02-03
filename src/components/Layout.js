import React from "react";
// import { Layout } from "antd";
import { Link, withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import { Navbar, NavDropdown, FormControl, Form, Nav } from 'react-bootstrap'
import { Component } from "react";
import BaseRouter from "../routes";
import Login from "./Login";

import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


// const { Content, Footer } = Layout;



class CustomLayout extends Component {


  constructor(props) {
    super(props)
    this.state = {
      // classes:  useStyles()
      isMenuOpen: false,
      anchorEl: null,
    }
  }

  handleClickMenuButton = (event) => {
    this.setState({ isMenuOpen: true, anchorEl: event.currentTarget })
  }

  handleMeuuClose = () => {
    this.setState({ isMenuOpen: false, anchorEl: null })
  }

  handleCallback = (childData) => {
    console.log(childData);
    // this.setState({ name: childData })
    this.props.onAuth(childData.email, childData.password)
  }

  render() {
    let user = this.props.user ? (this.props.user ? this.props.user : {}) : {}
    // console.log(user , "--------user, user_type", user.user_type);
    // console.log(useStyles());

    return (
      <div>

        <div className="flexGrow">


          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <div className="col-md-4">

                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div>
              <div className="col-md-8 text-uppercase">
                <div className="collapse navbar-collapse float-right" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link to="" className="nav-link active" aria-current="page" >Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="" className="nav-link" href="javascript:void(0)">Properties</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="" className="nav-link" href="javascript:void(0)">Map</Link>
                    </li>
                    {!this.props.isAuthenticated ?
                      <>
                        <li className="nav-item dropdown">

                          <div>
                            <Link aria-controls="d-menu" className="nav-link dropdown-toggle" aria-haspopup="true" onClick={this.handleClickMenuButton}>
                              Open Menu
                            </Link>
                            <Menu
                              id="d-menu"
                              keepMounted
                              anchorEl={this.state.anchorEl}
                              open={this.state.isMenuOpen}
                              getContentAnchorEl={null}
                              onClose={this.handleMeuuClose}
                            >
                              {/* anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }} */}
                              <MenuItem onClick={this.handleMeuuClose}>Profile</MenuItem>
                              <MenuItem onClick={this.handleMeuuClose}>My account</MenuItem>
                              <MenuItem onClick={this.handleMeuuClose}>Logout</MenuItem>
                            </Menu>
                          </div>

                          {/* <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-bs-toggle="dropdown" >
                      Dropdown
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><a className="dropdown-item" href="#">Action</a></li>
                      <li><a className="dropdown-item" href="#">Another action</a></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul> */}
                        </li>
                        <li className="nav-item">
                          <a className="nav-link " data-toggle="modal" data-target="#LoginModal">Login</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link ">register</a>
                        </li>
                      </>
                      : ""}
                  </ul>

                </div>
              </div>
            </div>
          </nav>

        </div>

        {/* <Layout className="layout"> */}

        <div >
          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            {/* {this.props.children} */}
            <BaseRouter {...this.props} />
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div className="row">
            <div className="col-md-8">
              <span>Copyright © 2022 MY BROTHER'S ROOM LLC</span>
            </div>
            <div className="col-md-4">

            </div>
          </div>

        </div>
        {/* </Layout> */}
        {/* <div>
          {this.props.children}
        </div> */}


        <div className="modal fade" id="LoginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <Login {...this.props} parentCallback={this.handleCallback} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout()),
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password))
  };

};

export default withRouter(
  // withStyles(useStyles()),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);
// useStyles()
// export default compose(
//   withStyles(useStyles()),
//   connect(
//     mapStateToProps,
//     mapDispatchToProps, // or put null here if you do not have actions to dispatch
//   ),
// )(withRouter(CustomLayout))