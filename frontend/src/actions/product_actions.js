import axios from "axios";
import {
  ALL_PRODUCTS_FETCH,
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_SUCCESS,
  CLEAR_ERRORS,
} from "../reducers/product_constants";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_FETCH }); // all product req which will set loading to true, and eproduct to an empty array

    // fetch data from backend
    const { data } = await axios.get("/api/v1/products");

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data, // pass the fetched data in payload
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// handle errors
export const handleErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
