import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  doctors_list: [],
  error: null,
  loading: false,
  doctorsObj:{}
};


const getDoctorListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getDoctorListSuccess = (state, action) => {
  return updateObject(state, {
    doctors_list: action.data,
    loading: false
  });
};

const getDoctorListFail = (state, action) => {
    console.log(action);
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};



const getDoctorDetailsStart = (state, action) => {
    return updateObject(state, {
      error: null,
      loading: true,
      doctorsObj:{}
    });
  };
  
  const getDoctorDetailsSuccess = (state, action) => {
    return updateObject(state, {
      doctorsObj: action.data,
      loading: false
    });
  };
  
  const getDoctorDetailsFail = (state, action) => {
      console.log(action);
    return updateObject(state, {
      error: action.error,
      loading: false
    });
  };
  

export const clearError = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_ERROR:
      return clearError(state, action);
    case actionTypes.GET_DOCTOR_LIST_START:
      return getDoctorListStart(state, action);
    case actionTypes.GET_DOCTOR_LIST_SUCCESS:
      return getDoctorListSuccess(state, action);
    case actionTypes.GET_DOCTOR_LIST_FAIL:
      return getDoctorListFail(state, action);
    case actionTypes.GET_DOCTOR_DETAILS_START:
      return getDoctorDetailsStart(state, action);
    case actionTypes.GET_DOCTOR_DETAILS_SUCCESS:
      return getDoctorDetailsSuccess(state, action);
    case actionTypes.GET_DOCTOR_DETAILS_FAIL:
      return getDoctorDetailsFail(state, action);
    

      
    default:
      return state;
  }
};

export default reducer;
