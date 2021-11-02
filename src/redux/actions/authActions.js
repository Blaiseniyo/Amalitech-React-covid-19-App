import axios from 'axios';
import Cookies from 'universal-cookie';

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const GET_COUNTRY_CASES_PENDING = "GET_COUNTRY_CASES_PENDING";
export const AUTH_PENDING = "AUTH_PENDING";
export const AUTH_FAILED = "AUTH_FAILED";
export const REST_PASSWORD_EMAIL = "REST_PASSWORD_EMAIL";
export const CREATE_NEW_PASSWORD = "CREATE_NEW_PASSWORD";
export const CLEAR_SNACKBAR = "CLEAR_SNACKBAR";

const cookies = new Cookies();

export const signUp=(data) => dispatch => {
    dispatch({
        type: AUTH_PENDING
      })
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/signup`,data)
  .then(res=>{
    dispatch({
      type: SIGNUP_SUCCESS,
      user:res.data.user,
      message:res.data.message
    })
  })
  .catch(err => {
        dispatch({
          type:AUTH_FAILED,
          message: err.response ? err.response.data.error : "Error occured"
        })
      })
}

export const login=(data,direct) => dispatch => {
  dispatch({
      type: AUTH_PENDING
    })
return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`,data)
.then(res=>{
  dispatch({
    type: LOGIN_SUCCESS,
    token:res.data.token,
    message:res.data.message
  })
  cookies.set("auth-token",res.data.token,{ path: '/',expires: new Date(Date.now()+2592000) })
  sessionStorage.setItem('loggedIn', true)
  direct.push("/");

})
.catch(err => {
      dispatch({
        type:AUTH_FAILED,
        message: err.response ? err.response.data.error : "Error occured"
      })
    })
}
export const logout=(direct) => dispatch => {
  dispatch({
      type: AUTH_PENDING
    })
return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/logout`)
.then(res=>{
  dispatch({
    type: LOGOUT_SUCCESS,
    message:res.data.message
  })
  cookies.remove("auth-token");
  sessionStorage.clear('loggedIn')
  direct.push("/auth");

})
.catch(err => {
  console.log(err)
      dispatch({
        type:AUTH_FAILED,
        message: err.response ? err.response.data.error : "Error occured"
      })
    })
}

export const restPasswordRequest=(data) => dispatch => {
    dispatch({
        type: AUTH_PENDING
      })
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/rest_password_request`,data)
  .then(res=>{
    dispatch({
      type: REST_PASSWORD_EMAIL,
      message:res.data.message
    })
  })
  .catch(err => {
        dispatch({
          type:AUTH_FAILED,
          message: err.response ? err.response.data.error : "Error occured"
        })
      })
}
export const createNewPassword=(token,data,direct) => dispatch => {
    dispatch({
        type: AUTH_PENDING
      })
  return axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/rest_password${token}`,data)
  .then(res=>{
    dispatch({
      type: CREATE_NEW_PASSWORD,
      message:res.data.message
    })
    direct.push("/auth")
  })
  .catch(err => {
        dispatch({
          type:AUTH_FAILED,
          message: err.response ? err.response.data.error : "Error occured"
        })
      })
}

export const clearSnackbar = () => dispatch => {
  dispatch({
    type: CLEAR_SNACKBAR
  })
}
