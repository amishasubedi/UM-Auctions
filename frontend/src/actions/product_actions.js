import axios from "axios";
import {
  ALL_PRODUCTS_FETCH,
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_SUCCESS,
  PRODUCT_DETAILS_FETCH,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../reducers/product_constants";

export const fetchProducts =
  (keyword = "", currentPage = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_FETCH }); // all product req which will set loading to true, and eproduct to an empty array

      // fetch data from backend
      const { data } = await axios.get(
        `/api/v1/products?keyword=${keyword}&page=${currentPage}`
      );

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

export const fetchProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_FETCH });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
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
