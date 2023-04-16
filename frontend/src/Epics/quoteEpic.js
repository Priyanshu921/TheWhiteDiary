import { ofType } from "redux-observable";
import { catchError, from, map, mergeMap, of } from "rxjs";
import axios from "axios";
import { quoteActionTypes, quoteActions } from "../Actions/quoteActions";
import { BASE_URL } from "../helper";
export const getRandomQuoteEpic = (action$) =>
  action$.pipe(
    ofType(quoteActionTypes.GET_RANDOM_QUOTE),
    mergeMap(() =>
      from(axios.get(BASE_URL+"quote/getRandomQuote")).pipe(
        map((response) => quoteActions.getRandomQuoteSuccess(response.data)),
        catchError((error) =>
          of(quoteActions.getRandomQuoteError(error.response.data))
        )
      )
    )
  );

  export const quoteEpics = [getRandomQuoteEpic];
