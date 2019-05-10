import loaderReducer from './loaderReducer';
import types from '../actions';

describe('Loader Reducers', () => {
  let initialState;

  beforeEach(() => {
    initialState = { showLoader: false };
  });

  it('should return default state if improper action is provided', () => {
    const action = { type: 'value', payload: 'value' };
    expect(loaderReducer(initialState, action))
      .toEqual(initialState);
  });

  it('should handle SHOW_PAGE_LOADER', () => {
    const action = {
      type: types.SHOW_PAGE_LOADER,
      payload: true,
    };
    expect(loaderReducer(initialState, action))
      .toEqual({ showLoader: true });
  });
});
