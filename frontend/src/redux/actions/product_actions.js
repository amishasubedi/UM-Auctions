import axios from "axios";
import {
  ALL_PRODUCTS_FETCH,
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_SUCCESS,
  PRODUCT_DETAILS_FETCH,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  ADMIN_PRODUCT_FETCH,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  NEW_PRODUCT_FETCH,
  NEW_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FETCH,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  CLEAR_ERRORS,
} from "../reducers/product_constants";

export const getProducts =
  (keyword = "", currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_FETCH }); // all product req which will set loading to true, and eproduct to an empty array

      // fetch data from backend
      const { data } = await axios.get(
        `/api/v1/products?keyword=${keyword}&page=${currentPage}`
      );

      console.log(data);
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

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_FETCH });

    const { data } = await axios.get(`/api/v1/product/${id}?page`);

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

export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_FETCH });

    const { data } = await axios.get(`/api/v1/admin/products`);

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_FETCH });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/v1/products/new`,
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("New product fail error message ", error.response);
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete product (Admin)
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_FETCH });

    const { data } = await axios.delete(`/api/v1/admin/products/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
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
