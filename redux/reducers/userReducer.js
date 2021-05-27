import * as type from '../types'

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case type.USER_SIGNUP_REQUEST:
      return { loading: true };
    case type.USER_SIGNUP_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case type.USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload };
    case type.USER_SIGNOUT_REQUEST:
      return { loading: true };
    case type.USER_SIGNOUT_SUCCESS:
      return { loading: false };
    default: return state;
  }
}

export const userLoginReducer = (state = {}, action, error) => {
  switch (action.type) {
    case type.USER_SIGNIN_REQUEST:
      return { loading: true };
    case type.USER_SIGNIN_SUCCESS:
      return { loading: false, user: action.payload };
    case type.USER_SIGNIN_FAIL:
      return { loading: false, error:action.payload };
    case type.USER_SIGNOUT_REQUEST:
      return { loading: true };
    case type.USER_SIGNOUT_SUCCESS:
      return { loading: false };
    default: return state;
  }
}
