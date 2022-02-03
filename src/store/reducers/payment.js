import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  paymentObj: {},
  error: null,
  loading: false
};



const getUserPaymentStart = (state, action) => {
    return updateObject(state, {
      error: null,
      loading: true
    });
  };
  
  const getUserPaymentSuccess = (state, action) => {
    return updateObject(state, {
      paymentObj: action.data,
      loading: false
    });
  };
  
  const getUserPaymentFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loading: false
    });
  };
  

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_DOCTOR_PAYMENT_START:
      return getUserPaymentStart(state, action);
    case actionTypes.GET_USER_DOCTOR_PAYMENT_SUCCESS:
      return getUserPaymentSuccess(state, action);
    case actionTypes.GET_USER_DOCTOR_PAYMENT_FAIL:
      return getUserPaymentFail(state, action);
    
    default:
      return state;
  }
};

export default reducer;
