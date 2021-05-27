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
