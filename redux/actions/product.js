import axios from 'axios';
import * as types from '../types';

export const listProduct = ( sortBy = 'createdAt', order = 'desc', limit = 10  ) => async (dispatch) => {
  try{
    dispatch({type: types.PRODUCT_LIST_REQUEST});
    const { data } = await axios.get(
      '/api/product/sort?sortBy=' + sortBy + '&order=' + order + '&limit=' + limit
    );
    dispatch({type: types.PRODUCT_LIST_SUCCESS, payload: data});
    return data;
  }
  catch(error){
    dispatch({type: types.PRODUCT_LIST_FAIL, payload: error.message})
  }
}

export const relatedProducts = (pageIndex = 1, pageSize = 5 ,category='') => async (dispatch) => {
  try{
    dispatch({type: types.PRODUCT_LIST_PAGINATE_REQUEST});
    const { data } = await axios.get(
    '/api/product?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&category=' + category
     );
    dispatch({type: types.PRODUCT_LIST_PAGINATE_SUCCESS, payload: data});
    return data
  }
  catch(error){
    dispatch({type: types.PRODUCT_LIST_PAGINATE_FAIL, payload: error.message})
  }
}

export const detailsProduct = (productById) => async (dispatch) => {
  try {
    dispatch({type: types.PRODUCT_DETAIL_REQUEST, payload: productById});
    const {data} = await axios.get('/api/product/get/' + productById);
    dispatch({type: types.PRODUCT_DETAIL_SUCCESS, payload: data});
    return data;
  }
  catch(error){
    dispatch({type: types.PRODUCT_DETAIL_FAIL, payload: error.message});
  }
}

export const listReviews = (product='', pageIndex=1, pageSize=5) => async (dispatch) => {
  try{
    dispatch({type: types.REVIEW_LIST_REQUEST});
    const { data } = await axios.get(
    '/api/product/reviews?product=' + product + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize
     );
    dispatch({type: types.REVIEW_LIST_SUCCESS, payload: data});
    return data
  }
  catch(error){
    dispatch({type: types.REVIEW_LIST_FAIL, payload: error.message})
  }
}

export const saveRecipeReview = (productId, review) => async (dispatch, getState) => {
  try {
    const { userSignin: { user }, userRegister: { userInfo } } = getState();
    dispatch({ type: types.REVIEW_ADD_REQUEST, payload: review });
    if(user) {
      const { data } = await axios.post(
        `/api/product/reviews/add/${productId}`, review, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      dispatch({ type: types.REVIEW_ADD_SUCCESS, payload: data });
      return data;
    } else {
      const { data } = await axios.post(
        `/api/product/reviews/add/${productId}`, review, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
      dispatch({ type: types.REVIEW_ADD_SUCCESS, payload: data });
      return data;
    }
  } catch (error) {
    // report error
    dispatch({ type: types.REVIEW_ADD_FAIL, payload: error.response.data.error });
  }
};

export const updateReview = (productId, reviewId, review) => async (dispatch, getState) => {
  try {
    const { userSignin: { user }, userRegister: { userInfo } } = getState();
    dispatch({ type: types.REVIEW_UPDT_REQUEST, payload: review });
    if(user) {
      const { data } = await axios.put(
        `/api/product/reviews/update/${productId}/${reviewId}`, review, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      dispatch({ type: types.REVIEW_UPDT_SUCCESS, payload: data });
      return data;
    } else {
      const { data } = await axios.put(
        `/api/product/reviews/update/${productId}/${reviewId}`, review, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
      dispatch({ type: types.REVIEW_UPDT_SUCCESS, payload: data });
      return data;
    }
  } catch (error) {
    // report error
    dispatch({ type: types.REVIEW_UPDT_FAIL, payload: error.response.data.error });
  }
};

export const reviewDelete = (productId, reviewId) => async (dispatch, getState) => {
  try {
    const { userSignin: { user }, userRegister: { userInfo } } = getState();
    dispatch({ type: types.REVIEW_DEL_REQUEST, payload: reviewId });
    if(user) {
      const { data } = await axios.delete(
        `/api/product/reviews/delete/${productId}/${reviewId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      dispatch({ type: types.REVIEW_DEL_SUCCESS, payload: data });
      return data;
    } else {
      const { data } = await axios.delete(
        `/api/product/reviews/delete/${productId}/${reviewId}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
      dispatch({ type: types.REVIEW_DEL_SUCCESS, payload: data });
      return data;
    }
  } catch (error) {
    // report error
    dispatch({ type: types.REVIEW_DEL_FAIL, payload: error.response.data.error });
  }
}
