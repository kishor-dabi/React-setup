// import axios from "axios";
import * as actionTypes from "./actionTypes";
import { conf } from "../../config/config";
import axios from "axios";



export const getUserPaymentStart = () => {
    return {
      type: actionTypes.GET_USER_DOCTOR_PAYMENT_START
    };
  };
  
  export const getUserPaymentSuccess = data => {
    return {
      type: actionTypes.GET_USER_DOCTOR_PAYMENT_SUCCESS,
      data
    };
  };
  
  export const getUserPaymentFail = error => {
    return {
      type: actionTypes.GET_USER_DOCTOR_PAYMENT_FAIL,
      error: error.response ? error.response.message : null
    };
  };
  
  export const clearError = () => {
    return {
      type: actionTypes.CLEAR_ERROR,
      error: null
    };
  };
  
  
  
  export const getUserPayment = (id) => {
    return dispatch => {
      dispatch(getUserPaymentStart());
      axios
        .get(`${conf.base_api_url}transaction/user-transaction-by-doctor/${id}`, {headers: {'Authorization': 'bearer '+ localStorage.getItem('user') ? 'bearer '+ JSON.parse(localStorage.getItem('user')).token : null }    })
        .then(res => {
          const data = res.data.response;
          dispatch(getUserPaymentSuccess(data));
          // dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
          dispatch(getUserPaymentFail(err));
          setTimeout(() => {
            dispatch(clearError());
          }, 4000);
        });
    };
  };
  