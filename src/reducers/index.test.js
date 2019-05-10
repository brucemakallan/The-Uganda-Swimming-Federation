import { initialState as loaderState } from './loaderReducer';
import { initialState as productsState } from './productsReducer';

import combinedReducers from '.';

describe('Loader Reducers', () => {
  it('should return default state if improper action is provided', () => {
    expect(combinedReducers(undefined, {}))
      .toEqual({
        loaderReducer: loaderState,
        productsReducer: productsState,
      });
  });
});
