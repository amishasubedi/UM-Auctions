import {
  LOGIN_FETCH,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FETCH,
  LOAD_USERS_FAIL,
  LOAD_USERS_FETCH,
  LOAD_USERS_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  EDIT_PROFILE_FETCH,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  UPDATE_PASSWORD_FETCH,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  ALL_USERS_FETCH,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
} from "../reducers/product_constants";
import axios from "axios";

export const loadUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_USERS_FETCH,
    });

    // send request to backend
    const { data } = await axios.get("/api/v1/user");

    dispatch({
      type: LOAD_USERS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_FETCH,
    });

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    // fetch
    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// logout user
export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logout");

    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// signup
export const signupUser = (userDetails) => async (dispatch) => {
  console.log("user register : ", userDetails);
  try {
    dispatch({
      type: REGISTER_FETCH,
    });

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    // fetch
    const { data } = await axios.post("/api/v1/register", userDetails, config);

    console.log("signupUser try : ", data);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
    console.log("signupUser catch : ", error);
  }
};

// edit user profile
export const editProfile = (userDetails) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_PROFILE_FETCH,
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    // fetch
    const { data } = await axios.put(
      "/api/v1/edit/profile",
      userDetails,
      config
    );

    dispatch({
      type: EDIT_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: EDIT_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PASSWORD_FETCH,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // fetch
    const { data } = await axios.put(
      "/api/v1/update/password",
      passwords,
      config
    );

    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_FETCH });

    const { data } = await axios.get("/api/v1/admin/users");

    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const handleErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
