import React from "react";
import { Redirect, Route, Router } from "react-router-dom";
import Hoc from "./hoc/hoc";
import createHistory from 'history/createBrowserHistory'
import PropTypes from "prop-types"

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Profile from "./containers/Profile";
// import AssignmentList from "./containers/AssignmentList";
import AssignmentDetail from "./containers/AssignmentDetail";
import AssignmentCreate from "./containers/AssignmentCreate";
import Dashboard from "./containers/Dashboard";
import AppointmentList from "./containers/AppointmentList";
import { Component } from "react";
// import { render } from "react-dom";
const history = createHistory()


const PrivateRoute = ({ component, ...rest }) => {
  // console.log(rest, component, this.props);
  const isAuthed = rest.isAuthenticated

  console.log(isAuthed, "isAuthed");
  return (
    <Route {...rest} exact
      render={(props) => (
        isAuthed ? (
          <div>
            {React.createElement(component, props)}
          </div>
        ) :
          (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />

          )
      )}
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func
  ]).isRequired,
  location: PropTypes.object
}

class BaseRouter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      updated: false
    }
  }

  componentWillMount() {


    setTimeout(() => {
      this.setState({ updated: true })
    }, 2000)

    this.setState({ open: true })
    const { user, token } = this.props
    if (token && !user) {
      this.props.fetchUser()
    }
  }

  componentWillReceiveProps(nextProps) {
    const { user, token, loading } = nextProps
    console.log(user, token, loading, "------------------------------------------------");
    // this._checkForValidUserState(user, token, phase)
  }


  render() {
    console.log(this.props, "App route");
    const {
      user,
      token,
      phase,
    } = this.props

    let loginUserData = localStorage.getItem("Authorization")
    if (window.location.pathname !== "/login" && !loginUserData) {
      console.log("user auth redirect");
      localStorage.clear()
      history.push('/login')
    }
    if (token && !user) {

      if (phase === "LOADING") {
        return (
          <div className="App" style={{ textAlign: 'center' }}>
            <h4>Authenticating...</h4>
          </div>
        )
      }
    }
    return (
      <Hoc>
        <Router history={history}>


          {
            this.state.updated ? (
              <div>

                <PrivateRoute exact path="/" {...this.props} component={Dashboard} />
                <PrivateRoute exact path="/create/" {...this.props} component={AssignmentCreate} />
                <Route exact path="/login/" {...this.props} component={Login} />
                <Route exact path="/signup/" {...this.props} component={Signup} />
                <PrivateRoute exact path="/assignments/:id" {...this.props} component={AssignmentDetail} />
                <PrivateRoute exact path="/profile/:id" {...this.props} component={Profile} />
                <PrivateRoute exact path="/appointment/:id" {...this.props} component={AppointmentList} />
              </div>

            ) :
              "loading ..."
          }
        </Router>
      </Hoc>
    );
  }

}

export default BaseRouter;
