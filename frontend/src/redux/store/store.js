import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducer,
  productDetailsReducer,
  newProductReducer,
  productChangeReducer,
} from "../reducers/product";
import {
  allUsersReducer,
  authReducer,
  editProfileReducer,
} from "../reducers/user";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  user: editProfileReducer,
  allUsers: allUsersReducer,
  newProduct: newProductReducer,
  product: productChangeReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
