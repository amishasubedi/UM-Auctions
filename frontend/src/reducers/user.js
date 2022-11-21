import {
  LOGIN_FETCH,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  REGISTER_FETCH,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./product_constants";

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_FETCH:
    case REGISTER_FETCH:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false.valueOf,
        user: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
