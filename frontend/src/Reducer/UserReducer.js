import { userActionTypes } from "../Actions/userActions"

const initialState = {
    user:null,
    userRegistered:null,
    userNameCategories:[]
}
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.USER_LOGIN_SUCCESS:
      return { ...state, user: action.payload };
    case userActionTypes.USER_LOGIN_ERROR:
      return { ...state, user: action.payload };
    case userActionTypes.USER_REGISTER_SUCCESS:
      return { ...state, userRegistered: action.payload };
    case userActionTypes.USER_REGISTER_ERROR:
      return { ...state, userRegistered: action.payload };
    case userActionTypes.CLEAN_REGISTER_USER:
      return { ...state, userRegistered: null };
    case userActionTypes.USER_LOGOUT:
      return { ...state, user: null };
    case userActionTypes.GET_USERNAME_CATEGORIES_SUCCESS:
      return { ...state, userNameCategories: action.payload.data };
    case userActionTypes.GET_USERNAME_CATEGORIES_ERROR:
      return { ...state, userNameCategories: action.payload.data };
    default:
      return state;
  }
};