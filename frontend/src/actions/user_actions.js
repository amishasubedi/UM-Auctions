import {
  LOGIN_FETCH,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FETCH,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
} from "../reducers/product_constants";
import axios from "axios";

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
      "api/v1/login",
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

// signup

export const signupUser = (userDetails) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_FETCH,
    });

    const config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };

    // fetch
    const { data } = await axios.post("api/v1/register", userDetails, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const handleErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
