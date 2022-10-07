import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productListReducer,
  productDetailReducer,
} from "./reducers/productReducers";

import { userLoginReducer, userRegisterReducer, userDetailReducer, userUpdateReducer, userListReducer, userDelReducer } from './reducers/userReducer'

import { cartReducer } from '../src/reducers/cartReducers'
import { orderCreateReducer, orderDetailReducer, orderPayReducer, myOrderReducer } from '../src/reducers/orderReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetail: userDetailReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetail: orderDetailReducer,
  orderPay: orderPayReducer,
  myOrder: myOrderReducer,
  userList: userListReducer,
  userDel: userDelReducer,
});


const cartItemsFromStorage = localStorage.getItem('cartItems') ?
  JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
  JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddFromStorage = localStorage.getItem('shipping_add') ?
  JSON.parse(localStorage.getItem('shipping_add')) : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shipping_add: shippingAddFromStorage
  },
  userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
