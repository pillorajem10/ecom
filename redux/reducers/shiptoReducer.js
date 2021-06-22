import * as type from '../types'

export const shiptoListReducer = (state = {shiptos: [] }, action) => {
  switch(action.type){
    case type.SHIPTO_LIST_REQUEST:
      return {loadingShipto: true};
    case type.SHIPTO_LIST_SUCCESS:
      return {loadingShipto: false, shiptos: action.payload};
    case type.SHIPTO_LIST_FAIL:
      return {loadingShipto: false, errorShipto: action.payload};
    default:
      return state;
  }
}

export const subcitiesListReducer = (state = {shiptos: [] }, action) => {
  switch(action.type){
    case type.SUBCITY_LIST_REQUEST:
      return {loadingSubcities: true};
    case type.SUBCITY_LIST_SUCCESS:
      return {loadingSubcities: false, subcities: action.payload};
    case type.SUBCITY_LIST_FAIL:
      return {loadingSubcities: false, errorSubcities: action.payload};
    default:
      return state;
  }
}
