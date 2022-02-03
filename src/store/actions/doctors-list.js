// import axios from "axios";
import * as actionTypes from "./actionTypes";
import { conf } from "../../config/config";
import axios from "axios";


export const getDoctorListStart = () => {
    return {
      type: actionTypes.GET_DOCTOR_LIST_START
    };
  };
  
  export const getDoctorListSuccess = data => {
    return {
      type: actionTypes.GET_DOCTOR_LIST_SUCCESS,
      data
    };
  };
  
  export const getDoctorListFail = error => {
    return {
      type: actionTypes.GET_DOCTOR_LIST_FAIL,
      error: error.response ? (error.response.data ? error.response.data.message : "failed"): null
    };
  };

  
export const getDoctorDetailsStart = () => {
    return {
      type: actionTypes.GET_DOCTOR_DETAILS_START
    };
  };
  
  export const getDoctorDetailsSuccess = data => {
    return {
      type: actionTypes.GET_DOCTOR_DETAILS_SUCCESS,
      data
    };
  };
  
  export const getDoctorDetailsFail = error => {
    return {
      type: actionTypes.GET_DOCTOR_DETAILS_FAIL,
      error: error.response ? (error.response.data ? error.response.data.message : "failed"): null
    };
  };
  
  
export const clearError = () => {
    return {
      type: actionTypes.CLEAR_ERROR,
      error: null
    };
  };
  


export const getDoctorsListByDisease = (id) => {
    console.log(id)
    return dispatch => {
      dispatch(getDoctorListStart());
      // Axios
      axios
        .get(`${conf.base_api_url}doctor/disease/${id}`, {headers: {'Authorization':'bearer '+ localStorage.getItem('user') ? 'bearer '+ JSON.parse(localStorage.getItem('user')).token : null }    })
        .then(res => {
          const data = res.data.response;
          dispatch(getDoctorListSuccess(data));
          // dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
          dispatch(getDoctorListFail(err));
          setTimeout(() => {
            dispatch(clearError());
          }, 3000);
        });
    };
  };
  

export const getDoctorDetails = (id) => {
    console.log(id)
    return dispatch => {
      dispatch(getDoctorDetailsStart());
      // Axios
      axios
        .get(`${conf.base_api_url}user/${id}`, {headers: {'Authorization':'bearer '+ localStorage.getItem('user') ? 'bearer '+ JSON.parse(localStorage.getItem('user')).token : null }    })
        .then(res => {
          const data = res.data.response;
          dispatch(getDoctorDetailsSuccess(data));
          // dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
          dispatch(getDoctorDetailsFail(err));
          setTimeout(() => {
            dispatch(clearError());
          }, 3000);
        });
    };
  };
  