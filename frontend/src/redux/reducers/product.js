import {
  ALL_PRODUCTS_FETCH,
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_SUCCESS,
  ADMIN_PRODUCT_FETCH,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_FETCH,
  NEW_PRODUCT_FETCH,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "./product_constants";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    // case 1 to fetch product
    case ALL_PRODUCTS_FETCH:
    case ADMIN_PRODUCT_FETCH:
      return {
        loading: true,
        products: [],
      };

    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        numberOfProducts: action.payload.numberOfProducts,
        productsInPage: action.payload.productsInPage,
      };

    case ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };

    case ALL_PRODUCTS_FAIL:
    case ADMIN_PRODUCT_FAIL:
      return {
        loading: false,
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

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    // fetch details for each product
    case PRODUCT_DETAILS_FETCH:
      return {
        loading: true,
        ...state,
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        productId: action.payload.id,
      };

    case PRODUCT_DETAILS_FAIL:
      return {
        ...state,
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
