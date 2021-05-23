import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { productListReducer, productDetailsReducer } from './reducers/productReducer';

const initialState = {};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer
});

//const composeEnhancer = compose;
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;
