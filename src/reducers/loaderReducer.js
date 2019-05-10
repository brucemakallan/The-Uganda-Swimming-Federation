import types from '../actions';

export const initialState = {
  showLoader: false,
};

const loaderReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
  case types.SHOW_PAGE_LOADER:
    return { ...state, showLoader: payload };
  default: return state;
  }
};

export default loaderReducer;
