import { ofType } from "redux-observable";
import { userActionTypes, userActions } from "../Actions/userActions";
import { catchError, from, map, mergeMap, of } from "rxjs";
import axios from "axios";
import { BASE_URL } from "../helper";
export const userLoginEpic = (action$) =>
  action$.pipe(
    ofType(userActionTypes.USER_LOGIN),
    mergeMap((action) =>
      from(axios.post(BASE_URL+"user/login", action.payload)).pipe(
        map((response) => userActions.loginSuccess(response.data)),
        catchError((error) => of(userActions.loginError(error.response.data)))
      )
    )
  );
export const userRegisterEpic = (action$) =>
  action$.pipe(
    ofType(userActionTypes.USER_REGISTER),
    mergeMap((action) =>
      from(
        axios.post(BASE_URL+"user/register", action.payload)
      ).pipe(
        map((response) => userActions.registerSuccess(response.data)),
        catchError((error) =>
          of(userActions.registerError(error.response.data))
        )
      )
    )
  );
  
  export const usernameCategories = (action$) =>
    action$.pipe(
      ofType(userActionTypes.GET_USERNAME_CATEGORIES),
      mergeMap(() =>
        from(
          axios.get(BASE_URL+"user/getUserNames")
        ).pipe(
          map((response) => userActions.getUsernameCategoriesSuccess(response.data)),
          catchError((error) =>
            of(userActions.getUsernameCategoriesError(error.response.data))
          )
        )
      )
    );
export const userEpics = [userLoginEpic, userRegisterEpic, usernameCategories];
