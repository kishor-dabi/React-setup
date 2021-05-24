// import axios from "axios";
import * as actionTypes from "./actionTypes";
import { Axios, AxiosNoAUTH }   from "../utility"

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
    Axios
      .get("users-list")
      .then(res => {
        console.log(res)
        dispatch(getDrSuccess(res.data));
        
      })
      .catch(err => {
        dispatch(getDrFail(err));
      });
  };
};
