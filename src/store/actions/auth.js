// import axios from "axios";
import * as actionTypes from "./actionTypes";
import { conf } from "../../components/config/config"
import { Axios, AxiosNoAUTH }   from "../utility"


export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = user => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user
  };
};

export const authFail = error => {
  console.log(JSON.stringify(error), error.response);
  return {
    type: actionTypes.AUTH_FAIL,
    error: error.response ? error.response.data : null
  };
};



export const signupStart = () => {
  return {
    type: actionTypes.SIGNUP_START
  };
};

export const signupSuccess = user => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    // user
  };
};

export const signupFail = error => {
  console.log(JSON.stringify(error), error.response);
  return {
    type: actionTypes.SIGNUP_FAIL,
    error: error.response ? (error.response.data ? error.response.data.message : "failed"): null
  };
};

export const getProfileStart = () => {
  return {
    type: actionTypes.GET_USER_PROFILE_START
  };
};

export const getProfileSuccess = user => {
  return {
    type: actionTypes.GET_USER_PROFILE_SUCCESS,
    user
  };
};

export const getProfileFail = error => {
  console.log(JSON.stringify(error), error.response);
  return {
    type: actionTypes.GET_USER_PROFILE_FAIL,
    error: error.response ? (error.response.data ? error.response.data.message : "failed"): null
  };
};

export const clearError = () => {
  return {
    type: actionTypes.CLEAR_ERROR,
    error: null
  };
};


export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("Authorzation");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  // console.log(username,password)
  return dispatch => {
    dispatch(authStart());
    AxiosNoAUTH
      .post(`${conf.base_api_url}api/login`, {
        email: username,
        password: password
      })
      .then(res => {
        console.log(res, "login res------------------------")
        const user = {
          token: res.data.response.token,
          username,
          // userId: res.data.user,
          // is_student: res.data.user_type.is_student,
          // is_teacher: res.data.user_type.is_teacher,
          // expirationDate: new Date(new Date().getTime() + 3600 * 1000)
        };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("Authorization", JSON.stringify(res.data));

        dispatch(authSuccess(user));
        // dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
        setTimeout(() => {
          dispatch(clearError());
        }, 3000);
      });
  };
};

export const authSignup = (
  full_name,
  email,
  password,
  phone_number
) => {
  return dispatch => {
    dispatch(signupStart());
    const user = {
      full_name,
      email,
      password,
      phone_number,
    };

    


    // // export const createadminUsers = (data) => {
    //   console.log('in meeeeeeeeee')
      // return fetch(`${conf.base_api_url}api/signup`, {
      //   method: 'POST',
      //   body: JSON.stringify(user)
      // })
      // .then(res => {
      //   const user = {
      //     token: res.data.key,
      //     full_name,
      //     userId: res.data.user,
      //     // is_student,
      //     // is_teacher: !is_student,
      //     expirationDate: new Date(new Date().getTime() + 3600 * 1000)
      //   };
      //   localStorage.setItem("user", JSON.stringify(user));
      //   dispatch(authSuccess(user));
      //   dispatch(checkAuthTimeout(3600));
      // })
      // .catch(err => {
      //   dispatch(authFail(err));
      // });
    


      AxiosNoAUTH
      .post(`${conf.base_api_url}api/signup`, user)
      .then(res => {
        const user = {
          token: res.data.key,
          full_name,
          userId: res.data.user,
          // is_student,
          // is_teacher: !is_student,
          expirationDate: new Date(new Date().getTime() + 3600 * 1000)
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(signupSuccess({message:res.message}));
        // dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(signupFail(err));
        setTimeout(() => {
          dispatch(clearError());
        }, 2000);
      });
  };
};


export const getUserProfile = () => {
  // console.log(username,password)
  return dispatch => {
    dispatch(getProfileStart());
    Axios
      .get(`/user/user-profile`)
      .then(res => {
        console.log(res, "profile res------------------------")
        const user = res.data.response;
        dispatch(getProfileSuccess(user));
        // dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(getProfileFail(err));
        setTimeout(() => {
          dispatch(clearError());
        }, 3000);
      });
  };
};


export const authCheckState = () => {
  return dispatch => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined || user === null) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(user.expirationDate);
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(user));
        // dispatch(
        //   checkAuthTimeout(
        //     (expirationDate.getTime() - new Date().getTime()) / 1000
        //   )
        // );
      }
    }
  };
};


