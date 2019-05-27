import axios from 'axios';
import types, { handleException, showSuccess, showPageLoader } from '.';

export const addProductsToState = payload => ({
  type: types.GET_ALL_PRODUCTS,
  payload,
});
export const addOneProductToState = payload => ({
  type: types.POST_NEW_PRODUCT,
  payload,
});
export const removeProductFromState = payload => ({
  type: types.DELETE_PRODUCT,
  payload,
});

const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }
};

const handlePostAndEditResponse = (response, dispatch) => {
  dispatch(addOneProductToState(response.data));
  dispatch(showSuccess());
};

const getAllProducts = url => async (dispatch) => {
  dispatch(showPageLoader(true));
  return axios.get(url)
    .then((response) => {
      dispatch(addProductsToState(response.data));
      dispatch(showPageLoader(false));
    })
    .catch((error) => {
      dispatch(showPageLoader(false));
      handleException(error, dispatch);
    });
};

export const postProduct = (url, body, history, createAnother) => async (dispatch) => {
  dispatch(showPageLoader(true));
  const productBody = body;
  delete productBody.array;
  return axios.post(url, productBody, headers)
    .then((response) => {
      handlePostAndEditResponse(response, dispatch);
      dispatch(showPageLoader(false));
      if (!createAnother) history.goBack();
    })
    .catch((error) => {
      dispatch(showPageLoader(false));
      handleException(error, dispatch);
    });
};

export const editProduct = (url, body, history) => async (dispatch) => {
  dispatch(showPageLoader(true));
  const productBody = body;
  delete productBody.array;
  return axios.put(url, productBody, headers)
    .then((response) => {
      handlePostAndEditResponse(response, dispatch);
      dispatch(showPageLoader(false));
      history.goBack();
    })
    .catch((error) => {
      dispatch(showPageLoader(false));
      handleException(error, dispatch);
    });
};

export const deleteProduct = url => async dispatch => axios.delete(url, headers)
  .then(response => dispatch(removeProductFromState(response.data)))
  .catch(error => handleException(error, dispatch));

export default getAllProducts;
