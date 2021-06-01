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

export const relatedProductList = (state = {products: [] }, action) => {
  switch(action.type){
    case type.PRODUCT_LIST_PAGINATE_REQUEST:
      return {loadingListPaginate: true};
    case type.PRODUCT_LIST_PAGINATE_SUCCESS:
      return {loadingListPaginate: false, products: action.payload};
    case type.PRODUCT_LIST_PAGINATE_FAIL:
      return {loadingListPaginate: false, errorListPaginate: action.payload};
    default:
      return state;
  }
}

export const reviewsListReducer = (state = {reviews: [] }, action) => {
  switch(action.type){
    case type.REVIEW_LIST_REQUEST:
      return { loadingReviews: true };
    case type.REVIEW_LIST_SUCCESS:
      return { loadingReviews: false, reviews: action.payload };
    case type.REVIEW_LIST_FAIL:
      return { loadingReviews: false, errorReviews: action.payload };
    default:
      return state;
  }
}

export const productAddReviewsReducer = (state = { review: {} }, action) => {
   switch (action.type)  {
   case type.REVIEW_ADD_REQUEST:
     return { loadingAddRev: true };
   case type.REVIEW_ADD_SUCCESS:
     return { loadingAddRev: false, review: action.payload, success: true };
   case type.REVIEW_ADD_FAIL:
     return { loadingAddRev: false, errorAddRev: action.payload };
   case type.REVIEW_ADD_RESET:
     return {};
   default:
     return state;
  }
}

export const productDelReviewsReducer = (state = {reviewDel: {} }, action) => {
  switch(action.type){
    case type.REVIEW_DEL_REQUEST:
      return {loadingDelRev: true};
    case type.REVIEW_DEL_SUCCESS:
      return {loadingDelRev: false, successDelRev: true, reviewDel: action.payload};
    case type.REVIEW_DEL_FAIL:
      return {loadingDelRev: false, successDelRev: false, errorDelRev: action.payload};
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
