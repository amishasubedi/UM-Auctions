import {
  ALL_PRODUCTS_FETCH,
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_SUCCESS,
  CLEAR_ERRORS,
} from "./product_constants";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    // case 1 to fetch product
    case ALL_PRODUCTS_FETCH:
      return {
        loading: true,
        products: [],
      };

    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        numberOfProducts: action.payload.numberOfProducts,
      };

    case ALL_PRODUCTS_FAIL:
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
