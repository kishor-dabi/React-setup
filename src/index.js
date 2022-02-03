import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js/dist/popper.js';
import 'jquery/dist/jquery.js';
import authReducer from "./store/reducers/auth";
import userReducer from "./store/reducers/users";
import dashboardReducer from "./store/reducers/dashboard";
import doctors_list from "./store/reducers/doctors-list";
import paymentReducer from "./store/reducers/payment";

import { reducer as form } from 'redux-form';

import { createTheme, ThemeProvider } from "@material-ui/core/styles";


const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff", // This is an orange looking color
      "font-family": "Work Sans, sans-serif"
    },
    secondary: {
      main: "#ffcc80" //Another orange-ish color
    }
  },
  primary: 'purple',
  secondary: 'green',
  error: 'red',
  // fontFamily: font // as an aside, highly recommend importing roboto font for Material UI projects! Looks really nice
});


const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  users: userReducer,
  doctorsList: doctors_list,
  payment: paymentReducer,
  form: form

});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <ThemeProvider theme={theme}>

      <App />
    </ThemeProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
