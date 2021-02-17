import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";
// import "antd/dist/antd.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import * as actions from "./store/actions/auth";

import CustomLayout from "./containers/Layout";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    console.log(this.props, "---App js");
    return (
      <Router>
        <CustomLayout {...this.props}>
          <BaseRouter {...this.props} />
        </CustomLayout>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    user: state.auth.user,
    loading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
