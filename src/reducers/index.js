import { combineReducers } from 'redux';
import loaderReducer from './loaderReducer';
import productsReducer from './productsReducer';
import adminReducer from './adminReducer';
import emailReducer from './emailReducer';

export default combineReducers({
  loaderReducer,
  productsReducer,
  adminReducer,
  emailReducer,
});
