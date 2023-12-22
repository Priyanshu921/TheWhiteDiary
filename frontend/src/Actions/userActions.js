export const userActionTypes = {
  USER_REGISTER: "USER__REGISTER",
  USER_REGISTER_SUCCESS: "USER_REGISTER_SUCCESS",
  USER_REGISTER_ERROR: "USER_REGISTER_ERROR",
  CLEAN_REGISTER_USER: "CLEAN_REGISTER_USER",

  USER_LOGIN: "USER__LOGIN",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_ERROR: "USER_LOGIN_ERROR",

  USER_LOGOUT: "USER__LOGOUT",
  USER_LOGOUT_SUCCESS: "USER_LOGOUT_SUCCESS",
  USER_LOGOUT_ERROR: "USER_LOGOUT_ERROR",

  GET_USERNAME_CATEGORIES: "GET_USERNAME_CATEGORIES",
  GET_USERNAME_CATEGORIES_SUCCESS: "GET_USERNAME_CATEGORIES_SUCCESS",
  GET_USERNAME_CATEGORIES_ERROR: "GET_USERNAME_CATEGORIES_ERROR",


  GET_NOTIFICATIONS: "GET_NOTIFICATIONS",
  GET_NOTIFICATIONS_SUCCESS: "GET_NOTIFICATIONS_SUCCESS",
  GET_NOTIFICATIONS_ERROR: "GET_NOTIFICATIONS_ERROR",
  
  ADD_NEW_NOTIFICATIONS: "ADD_NEW_NOTIFICATIONS",

  CLEAR_NOTIFICATIONS: "CLEAR_NOTIFICATIONS",
  CLEAR_NOTIFICATIONS_SUCCESS: "CLEAR_NOTIFICATIONS_SUCCESS",
  CLEAR_NOTIFICATIONS_ERROR: "CLEAR_NOTIFICATIONS_ERROR",

  READ_NOTIFICATIONS: "READ_NOTIFICATIONS",
  READ_NOTIFICATIONS_SUCCESS: "READ_NOTIFICATIONS_SUCCESS",
  READ_NOTIFICATIONS_ERROR: "READ_NOTIFICATIONS_ERROR",
};
export class userActions {
  static register = (payload) => ({
    type: userActionTypes.USER_REGISTER,
    payload,
  });
  static registerSuccess = (payload) => ({
    type: userActionTypes.USER_REGISTER_SUCCESS,
    payload,
  });
  static registerError = (payload) => ({
    type: userActionTypes.USER_REGISTER_ERROR,
    payload,
  });

  static cleanRegisteredUser = () => ({
    type: userActionTypes.CLEAN_REGISTER_USER,
  });
  static login = (payload) => ({
    type: userActionTypes.USER_LOGIN,
    payload,
  });
  static loginSuccess = (payload) => ({
    type: userActionTypes.USER_LOGIN_SUCCESS,
    payload,
  });
  static loginError = (payload) => ({
    type: userActionTypes.USER_LOGIN_ERROR,
    payload,
  });
  static logout = () => ({
    type: userActionTypes.USER_LOGOUT,
  });

  static getUsernameCategories = () => ({
    type: userActionTypes.GET_USERNAME_CATEGORIES,
  });
  static getUsernameCategoriesSuccess = (payload) => ({
    type: userActionTypes.GET_USERNAME_CATEGORIES_SUCCESS,
    payload,
  });
  static getUsernameCategoriesError = (payload) => ({
    type: userActionTypes.GET_USERNAME_CATEGORIES_ERROR,
    payload,
  });

  static addNewNotifications = (payload) => ({
    type: userActionTypes.ADD_NEW_NOTIFICATIONS,
    payload,
  });

  static getNotifications = (payload) => ({
    type: userActionTypes.GET_NOTIFICATIONS,
    payload,
  });
  static getNotificationsSuccess = (payload) => ({
    type: userActionTypes.GET_NOTIFICATIONS_SUCCESS,
    payload,
  });
  static getNotificationsError = (payload) => ({
    type: userActionTypes.GET_NOTIFICATIONS_ERROR,
    payload,
  });

  static clearNotifications = (payload) => ({
    type: userActionTypes.CLEAR_NOTIFICATIONS,
    payload
  });
  static clearNotificationsSuccess = (payload) => ({
    type: userActionTypes.CLEAR_NOTIFICATIONS_SUCCESS,
    payload,
  });
  static clearNotificationsError = (payload) => ({
    type: userActionTypes.CLEAR_NOTIFICATIONS_ERROR,
    payload,
  });

  static readNotification = (payload) => ({
    type: userActionTypes.READ_NOTIFICATIONS,
    payload,
  });
  static readNotificationSuccess = (payload) => ({
    type: userActionTypes.READ_NOTIFICATIONS_SUCCESS,
    payload,
  });
  static readNotificationError = (payload) => ({
    type: userActionTypes.READ_NOTIFICATIONS_ERROR,
    payload,
  });
}