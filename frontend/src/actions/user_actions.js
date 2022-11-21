import {
  LOGIN_FETCH,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
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

export const handleErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
