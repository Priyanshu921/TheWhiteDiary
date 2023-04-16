import {combineReducers} from 'redux';
import { userReducer } from './UserReducer';
import { quoteReducer } from './quoteReducer';
export const rootReducer = combineReducers({
  userReducer,
  quoteReducer
});