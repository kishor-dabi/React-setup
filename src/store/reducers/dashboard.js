import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  all_list: [],
  currentAssignment: {},
  error: null,
  loading: false
};

const getDrList = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getDrSuccess = (state, action) => {
  return updateObject(state, {
    all_list: action.data,
    error: null,
    loading: false
  });
};

const getDrFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DASHBOARD_DR_GET:
      return getDrList(state, action);
    case actionTypes.DASHBOARD_DR_GET_SUCCESS:
      return getDrSuccess(state, action);
    case actionTypes.DASHBOARD_DR_GET_FAIL:
      return getDrFail(state, action);
    
    default:
      return state;
  }
};

export default reducer;
