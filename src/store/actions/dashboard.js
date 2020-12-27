import axios from "axios";
import * as actionTypes from "./actionTypes";

export const getDrListStart = () => {
  return {
    type: actionTypes.DASHBOARD_DR_GET
  };
};

export const getDrSuccess = data => {
  return {
    type: actionTypes.DASHBOARD_DR_GET_SUCCESS,
    data
  };
};

export const getDrFail = error => {
  return {
    type: actionTypes.DASHBOARD_DR_GET_FAIL,
    error: error
  };
};

export const getDrList = (token) => {
  console.log("get dr list")
  return dispatch => {
    dispatch(getDrListStart());
    axios
      .get("http://127.0.0.1:8000/api/users-list")
      .then(res => {
        console.log(res)
        dispatch(getDrSuccess(res.data));
        
      })
      .catch(err => {
        dispatch(getDrFail(err));
      });
  };
};
