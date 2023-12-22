import { ofType } from "redux-observable";
import { catchError, from, map, mergeMap, of } from "rxjs";
import axios from "axios";
import { BASE_URL } from "../helper";
import { postActionTypes, postActions } from "../Actions/postActios";
export const addPostEpic = (action$) =>
  action$.pipe(
    ofType(postActionTypes.ADD_POST),
    mergeMap((action) =>
      from(
        axios.post(
          BASE_URL + "post/createPost",
          { image: action.payload.image, text: action.payload.text },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              bearer: action.payload.token,
            },
          }
        )
      ).pipe(
        map((response) => postActions.addPostSuccess(response.data)),
        catchError((error) => of(postActions.addPostError(error.response.data)))
      )
    )
  );

export const getPostsEpic = (action$) =>
  action$.pipe(
    ofType(postActionTypes.GET_POSTS),
    mergeMap((action) =>
      from(
        axios.get(BASE_URL + "post?page="+action.payload.page, { headers: { bearer: action.payload.userToken } })
      ).pipe(
        map((response) => postActions.getPostsSuccess(response.data)),
        catchError((error) =>
          of(postActions.getPostsError(error.response.data))
        )
      )
    )
  );

export const getPostEpic = (action$) =>
  action$.pipe(
    ofType(postActionTypes.GET_POST),
    mergeMap((action) =>
      from(
        axios.get(BASE_URL +"post/"+action.payload.postID, { headers: { bearer: action.payload.userToken } })
      ).pipe(
        map((response) => postActions.getPostSuccess(response.data)),
        catchError((error) =>
          of(postActions.getPostError(error.response.data))
        )
      )
    )
  );
  // +"&&limit="+action.payload.limit;

export const likePostEpic = (action$) =>
  action$.pipe(
    ofType(postActionTypes.LIKE_POST),
    mergeMap((action) =>
      from(
        axios.post(
          BASE_URL + "post/likePost",
          { postID: action.payload.postID },
          { headers: { bearer: action.payload.user.userToken } }
        )
      ).pipe(
        map((response) => postActions.likePostSuccess(response.data)),
        catchError((error) =>
          of(postActions.likePostError(error.response.data))
        )
      )
    )
  );
export const unlikePostEpic = (action$) =>
  action$.pipe(
    ofType(postActionTypes.UNLIKE_POST),
    mergeMap((action) =>
      from(
        axios.post(BASE_URL + "post/unlikePost",{postID:action.payload.postID}, { headers: { bearer: action.payload.user.userToken } })
      ).pipe(
        map((response) => postActions.unlikePostSuccess(response.data)),
        catchError((error) =>
          of(postActions.unlikePostError(error.response.data))
        )
      )
    )
  );


  // export const getRandomQuoteEpic = (action$) =>
  //   action$.pipe(
  //     ofType(quoteActionTypes.GET_RANDOM_QUOTE),
  //     mergeMap(() =>
  //       from(axios.get(BASE_URL + "quote/getRandomQuote")).pipe(
  //         map((response) => quoteActions.getRandomQuoteSuccess(response.data)),
  //         catchError((error) =>
  //           of(quoteActions.getRandomQuoteError(error.response.data))
  //         )
  //       )
  //     )
  //   );
export const postEpics = [
  addPostEpic,
  getPostsEpic,
  likePostEpic,
  unlikePostEpic,
  getPostEpic,
];
