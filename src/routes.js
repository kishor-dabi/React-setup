import React from "react";
import { Redirect, Route, Router, BrowserRouter, Switch, Link } from "react-router-dom";
import Hoc from "./hoc/hoc";
import createHistory from 'history/createBrowserHistory'
import PropTypes from "prop-types"

import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import AdminCreate from "./components/AdminCreate";
import { Component } from "react";
import Layout from "./components/Layout";
import { Button } from "bootstrap";
import Users from "./components/Users";
// import DoctorsList from "./components/DoctorsList";
// import DoctorDetails from "./components/DoctorDetails";

// import { render } from "react-dom";
const history = createHistory()

let redirectURL = ""

const PrivateRoute = ({ component: Component, ...rest }) => {
  // console.log(rest);
  const isAuthed = rest.isAuthenticated;
  const user_type = rest.user ? rest.user.user ? rest.user.user.user_type : null : null;
  const urlParams = new URLSearchParams(window.location.search);
  const redirectUrl = rest.location.state ? rest.location.state.from.pathname : '' //urlParams.get('redirectUrl');
  // console.log(redirectURL, "redirectUrl", rest.location.state ? rest.location.state.from.pathname :'');

  return (
    <Route {...rest} exact
      render={(props) => (
        isAuthed ? (

          /*   rest.location.state ? (rest.location.state.from.pathname ? 

            <Redirect
            to={{
              pathname: rest.location.state ? rest.location.state.from.pathname : "",
              state: { from: props.location }
            }}
          /> :'') 
              : */
          <div>
            <Component {...props} />
          </div>
        ) :
          (
            <Redirect
              to={{
                pathname: '/login',
                search: window.location.pathname ? "?redirectUrl=" + window.location.pathname : "",
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
    PropTypes.any
  ]).isRequired,
  location: PropTypes.object
}

const SuperAdminRoute = ({ component: Component, ...rest }) => {
  let isAuthed = rest.isAuthenticated;
  let user_type = rest.user ? (rest.user ? rest.user.user_type : null) : null;


  // console.log(isAuthed, "isAuthed", user_type , rest.user);
  return (
    <Route {...rest} exact
      render={(props) => (
        isAuthed && user_type == 1 ? (
          <div>
            <Component {...props} />
          </div>
        ) :
          (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location }
              }}
            />

          )
      )}
    />
  )
}

SuperAdminRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.any
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
    // this._checkForValidUserState(user, token, phase)
  }

  checkRedirectUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('redirectUrl');
    if (redirectUrl) {
      return redirectUrl;
    }
  }


  render() {
    const currentLocation = window.location.pathname
    const {
      user,
      token,
      phase,
    } = this.props

    let loginUserData = localStorage.getItem("Authorization")

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
        {/* <Layout {...this.props} /> */}

        {/* {this.props.isAuthenticated ? (
          <Button key="2" onClick={this.props.logout} className="ml-2">
            Logout
          </Button>
        ) : (
            <div>
              <Link to="/login">
                <Button key="2" className="ml-2">
                  Login
                    </Button>
              </Link>
              <Link to="/signup">
                <Button key="3" className="ml-2">
                  Signup
                                 </Button>
              </Link>
            </div>

          )} */}
        {/* <Router history={history}> */}


        {
          this.state.updated ? (

            (
              /*   this.checkRedirectUrl() ? 
                  <Redirect to={this.checkRedirectUrl()}/>
                : */

              <Switch>
                <React.Fragment>
                  <Route exact path="/" {...this.props} component={Dashboard} />
                  <PrivateRoute path="/profile" {...this.props} component={Profile} />
                  <Route exact path="/login/" {...this.props} component={Login} />
                  <Route exact path="/signup/" {...this.props} component={Signup} />
                  <PrivateRoute path="/users" {...this.props} component={Users} />
                  <SuperAdminRoute path="/new-admin" {...this.props} component={AdminCreate} />

                </React.Fragment>
              </Switch>)

          ) :
            "loading ..."
        }
        {/* </Router> */}



        {/* 
        <div className='component'>
          <Switch>
            <Route path="/">
              <Dashboard />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/create">
              <AssignmentCreate />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
          </Switch>
        </div> */}

      </Hoc>
    );
  }

}

export default BaseRouter;
