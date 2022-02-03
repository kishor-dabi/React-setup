// import axios from "axios";
import * as actionTypes from "./actionTypes";
import { Axios, AxiosNoAUTH } from "../utility"
import { conf } from "../../config/config";
import axios from "axios";


export const getDiseaseListStart = () => {
  return {
    type: actionTypes.GET_DISEASE_LIST_START
  };
};

export const getDiseaseListSuccess = data => {
  return {
    type: actionTypes.GET_DISEASE_LIST_SUCCESS,
    data
  };
};

export const getDiseaseListFail = error => {
  return {
    type: actionTypes.GET_DISEASE_LIST_FAIL,
    error: error.response ? (error.response.data ? error.response.data.message : "failed") : null
  };
};


export const clearError = () => {
  return {
    type: actionTypes.CLEAR_ERROR,
    error: null
  };
};



export const getDiseaseList = (limit, offset) => {
  return dispatch => {
    dispatch(getDiseaseListStart());
    // Axios
    axios
      .get(`${conf.base_api_url}doctor/disease?limit=${limit ? limit : 10}&offset=${offset ? offset : 0}`, { headers: { 'Authorization': conf.basic_token } })
      .then(res => {
        const data = res.data.response;
        dispatch(getDiseaseListSuccess(data));
        // dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(getDiseaseListFail(err));
        setTimeout(() => {
          dispatch(clearError());
        }, 3000);
      });
  };

};

