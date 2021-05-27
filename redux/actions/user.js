import axios from 'axios';
import * as types from '../types';
import Cookie from 'js-cookie';

export const register = (fname, mname, lname, email, uname, password, password2) => async (dispatch) => {
  dispatch({ type: types.USER_SIGNUP_REQUEST, payload: { fname, mname, lname, email, uname, password, password2 } });
  try {
    const { data } = await axios.post('/api/auth/signup', { fname, mname, lname, email, uname, password, password2 });
    dispatch({ type: types.USER_SIGNUP_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: types.USER_SIGNUP_FAIL, payload: error.response.data.error });
  }
}

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: types.USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post('/api/auth/signin', { email, password });
    dispatch({ type: types.USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('user', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: types.USER_SIGNIN_FAIL, payload: error.response.data.error });
  }
}

export const logout = ( data ) => async (dispatch) => {
  dispatch({ type: types.USER_SIGNOUT_REQUEST, payload: data });
  Cookie.remove('user');
  Cookie.remove('userInfo');
  dispatch({ type: types.USER_SIGNOUT_SUCCESS, payload: '' });
}
