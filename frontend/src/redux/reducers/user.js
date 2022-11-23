import {
  LOGIN_FETCH,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USERS_FAIL,
  LOAD_USERS_FETCH,
  LOAD_USERS_SUCCESS,
  CLEAR_ERRORS,
  REGISTER_FETCH,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FETCH,
  EDIT_PROFILE_FAIL,
  EDIT_PROFILE_RESET,
} from "./product_constants";

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    // case to make request to backend
    case LOGIN_FETCH:
    case REGISTER_FETCH:
    case LOAD_USERS_FETCH:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case LOAD_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOAD_USERS_FAIL:
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

// edit user's profile
export const editProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PROFILE_FETCH:
      return {
        ...state,
        loading: true,
      };

    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: true,
      };

    case EDIT_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case EDIT_PROFILE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    default:
      return state;
  }
};
