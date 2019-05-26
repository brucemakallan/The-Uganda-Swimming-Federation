import { messages } from '../utils';

const types = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  SHOW_PAGE_LOADER: 'SHOW_PAGE_LOADER',
  GET_ALL_PRODUCTS: 'GET_ALL_PRODUCTS',
  POST_NEW_PRODUCT: 'POST_NEW_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  LOGIN: 'LOGIN',
};

export const showError = payload => ({
  type: types.ERROR,
  payload: payload || messages.NETWORK_ERROR,
});

export const showSuccess = payload => ({
  type: types.SUCCESS,
  payload: payload || messages.SUCCESS,
});

export const showPageLoader = payload => ({
  type: types.SHOW_PAGE_LOADER,
  payload,
});

export const handleException = (error, dispatch) => {
  if (error && error.response && error.response.data && error.response.data.message) {
    dispatch(showError(error.response.data.message));
  } else dispatch(showError());
};

export default types;
