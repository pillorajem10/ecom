import * as type from '../types'

export const productListReducer = (state = {products: [] }, action) => {
  switch(action.type){
    case type.PRODUCT_LIST_REQUEST:
      return {loading: true};
    case type.PRODUCT_LIST_SUCCESS:
      return {loading: false, products: action.payload};
    case type.PRODUCT_LIST_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
}

export const productDetailsReducer = (state = {product: {} }, action) => {
  switch(action.type){
    case type.PRODUCT_DETAIL_REQUEST:
      return {loading: true};
    case type.PRODUCT_DETAIL_SUCCESS:
      return {loading: false, product: action.payload};
    case type.PRODUCT_DETAIL_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
}
