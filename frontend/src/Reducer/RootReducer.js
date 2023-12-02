import {combineReducers} from 'redux';
import { userReducer } from './UserReducer';
import { quoteReducer } from './quoteReducer';
import { postReducer } from './postReducer';
export const rootReducer = combineReducers({
  userReducer,
  quoteReducer,
  postReducer,
});