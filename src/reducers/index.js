import { combineReducers } from 'redux';
import loaderReducer from './loaderReducer';
import productsReducer from './productsReducer';

export default combineReducers({
  loaderReducer,
  productsReducer,
});
