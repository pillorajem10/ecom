import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { productListReducer, productDetailsReducer, reviewsListReducer, productUpdtReviewsReducer, relatedProductList, productAddReviewsReducer, productDelReviewsReducer } from './reducers/productReducer';
import { userRegisterReducer, userLoginReducer } from './reducers/userReducer';
import { shiptoListReducer, subcitiesListReducer } from './reducers/shiptoReducer';
import Cookie from 'js-cookie';

const user = Cookie.getJSON('user');
const userInfo = Cookie.getJSON('userInfo');

const initialState = {
  userSignin: { user },
  userRegister: { userInfo },
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  relatedProducts: relatedProductList,
  userRegister: userRegisterReducer,
  userSignin: userLoginReducer,
  reviewList: reviewsListReducer,
  reviewAdd: productAddReviewsReducer,
  reviewDel: productDelReviewsReducer,
  reviewUpdate: productUpdtReviewsReducer,
  shipList: shiptoListReducer,
  subcityList: subcitiesListReducer
});

//const composeEnhancer = compose;
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;
