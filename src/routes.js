import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Profile from "./containers/Profile";
// import AssignmentList from "./containers/AssignmentList";
import AssignmentDetail from "./containers/AssignmentDetail";
import AssignmentCreate from "./containers/AssignmentCreate";
import Dashboard from "./containers/Dashboard";
import AppointmentList from "./containers/AppointmentList";


const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={Dashboard} />
    <Route exact path="/create/" component={AssignmentCreate} />
    <Route exact path="/login/" component={Login} />
    <Route exact path="/signup/" component={Signup} />
    <Route exact path="/assignments/:id" component={AssignmentDetail} />
    <Route exact path="/profile/:id" component={Profile} />
    <Route exact path="/appointment/:id" component={AppointmentList} />

  </Hoc>
);

export default BaseRouter;
