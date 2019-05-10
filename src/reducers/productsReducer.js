import { toast } from 'react-toastify';
import types from '../actions';
import 'react-toastify/dist/ReactToastify.css';
import { serverResponses, messages } from '../utils';

export const initialState = {
  products: [],
  product: {},
};

const productsReducer = (state = initialState, action) => {
  const { payload } = action;
  const { products } = state;

  switch (action.type) {
  case types.GET_ALL_PRODUCTS:
    return { ...state, products: payload };
  case types.POST_NEW_PRODUCT:
    return { ...state, product: payload };
  case types.DELETE_PRODUCT: {
    const productsList = products.filter(product => product._id !== payload._id);
    return { ...state, products: productsList };
  }
  case types.ERROR: {
    if (String(payload).includes(serverResponses.DUPLICATE)) toast.error(messages.DUPLICATE_MESSAGE);
    else toast.error(payload);
    return state;
  }
  case types.SUCCESS: {
    toast.success(payload);
    return state;
  }
  default: return state;
  }
};

export default productsReducer;
