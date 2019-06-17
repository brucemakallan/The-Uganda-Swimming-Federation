import { toast } from 'react-toastify';
import types from '../actions';

export const initialState = {};

const emailReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
  case types.SEND_EMAIL: {
    toast.success(payload.message);
    return state;
  }
  default: return state;
  }
};

export default emailReducer;
