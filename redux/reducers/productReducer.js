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

export const reviewsListReducer = (state = {reviews: [] }, action) => {
  switch(action.type){
    case type.REVIEW_LIST_REQUEST:
      return {loadingReviews: true};
    case type.REVIEW_LIST_SUCCESS:
      return {loadingReviews: false, reviews: action.payload};
    case type.REVIEW_LIST_FAIL:
      return {loadingReviews: false, errorReviews: action.payload};
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
