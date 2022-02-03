import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  all_disease_list: [],
  error: null,
  loading: false
};


const getDiseaseListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getDiseaseListSuccess = (state, action) => {
  return updateObject(state, {
    all_disease_list: action.data,
    loading: false
  });
};

const getDiseaseListFail = (state, action) => {
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
    case actionTypes.GET_DISEASE_LIST_START:
      return getDiseaseListStart(state, action);
    case actionTypes.GET_DISEASE_LIST_SUCCESS:
      return getDiseaseListSuccess(state, action);
    case actionTypes.GET_DISEASE_LIST_FAIL:
      return getDiseaseListFail(state, action);
    
    default:
      return state;
  }
};

export default reducer;
