import axios from 'axios';
import * as types from '../types';

export const listShipTo = () => async (dispatch) => {
  try{
    dispatch({type: types.SHIPTO_LIST_REQUEST});
    const { data } = await axios.get(
      '/api/shipto'
    );
    dispatch({type: types.SHIPTO_LIST_SUCCESS, payload: data});
    return data;
  }
  catch(error){
    dispatch({type: types.SHIPTO_LIST_FAIL, payload: error.message})
  }
}

export const listSubCities = (maincity = '') => async (dispatch) => {
  try{
    dispatch({type: types.SUBCITY_LIST_REQUEST});
    const { data } = await axios.get(
      '/api/shipto/list/subcities?shipTo=' + maincity
    );
    dispatch({type: types.SUBCITY_LIST_SUCCESS, payload: data});
    return data
  }
  catch(error){
    dispatch({type: types.SUBCITY_LIST_FAIL, payload: error.message})
  }
}

export const getShippingPlace = (shippingId) => async (dispatch) => {
  try{
    dispatch({type: types.SHIPTO_LIST_REQUEST});
    const { data } = await axios.get(
      `/api/shipto/${shippingId}`
    );
    dispatch({type: types.SHIPTO_LIST_SUCCESS, payload: data});
    return data;
  }
  catch(error){
    dispatch({type: types.SHIPTO_LIST_FAIL, payload: error.message})
  }
}
