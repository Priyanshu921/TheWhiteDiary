export const postActionTypes = {
  GET_POSTS: "GET_POSTS",
  GET_POSTS_SUCCESS: "GET_POSTS_SUCCESS",
  GET_POSTS_ERROR: "GET_POSTS_ERROR",

  GET_POST: "GET_POST",
  GET_POST_SUCCESS: "GET_POST_SUCCESS",
  GET_POST_ERROR: "GET_POST_ERROR",

  ADD_POST: "ADD_POST",
  ADD_POST_SUCCESS: "ADD_POST_SUCCESS",
  ADD_POST_ERROR: "ADD_POST_ERROR",

  ADD_NEW_POST:"ADD_NEW_POST",

  LIKE_POST: "LIKE_POST",
  LIKE_POST_SUCCESS: "LIKE_POST_SUCCESS",
  LIKE_POST_ERROR: "LIKE_POST_ERROR",

  UNLIKE_POST: "UNLIKE_POST",
  UNLIKE_POST_SUCCESS: "UNLIKE_POST_SUCCESS",
  UNLIKE_POST_ERROR: "UNLIKE_POST_ERROR",

  ADD_COMMENT: "ADD_COMMENT",
  ADD_COMMENT_SUCCESS: "ADD_COMMENT_SUCCESS",
  ADD_COMMENT_ERROR: "ADD_COMMENT_ERROR",

  CLEAR_POST_UPLOADED: "CLEAR_POST_UPLOADED",

  SELECT_POST : "SELECT_POST",
  CLEAR_SELECTED_POST : "CLEAR_SELECTED_POST",
  CLEAR_POST_DETAILS : "CLEAR_POST_DETAILS",

};

export class postActions {
  static addPost = (payload) => ({
    type: postActionTypes.ADD_POST,
    payload,
  });
  static addPostSuccess = (payload) => ({
    type: postActionTypes.ADD_POST_SUCCESS,
    payload,
  });
  static addPostError = (payload) => ({
    type: postActionTypes.ADD_POST_ERROR,
    payload,
  });
  static clearPostUploaded = () => ({
    type: postActionTypes.CLEAR_POST_UPLOADED,
  });
  static addNewPost = (payload) => ({
    type: postActionTypes.ADD_NEW_POST,
    payload,
  });
  static getPosts = (payload) => ({
    type: postActionTypes.GET_POSTS,
    payload,
  });
  static getPostsSuccess = (payload) => ({
    type: postActionTypes.GET_POSTS_SUCCESS,
    payload,
  });
  static getPostsError = (payload) => ({
    type: postActionTypes.GET_POSTS_ERROR,
    payload,
  });
  static getPost = (payload) => ({
    type: postActionTypes.GET_POST,
    payload,
  });
  static getPostSuccess = (payload) => ({
    type: postActionTypes.GET_POST_SUCCESS,
    payload,
  });
  static getPostError = (payload) => ({
    type: postActionTypes.GET_POST_ERROR,
    payload,
  });

  static likePost = (payload) => ({
    type: postActionTypes.LIKE_POST,
    payload,
  });
  static likePostSuccess = (payload) => ({
    type: postActionTypes.LIKE_POST_SUCCESS,
    payload,
  });
  static likePostError = (payload) => ({
    type: postActionTypes.LIKE_POST_ERROR,
    payload,
  });
  static unlikePost = (payload) => ({
    type: postActionTypes.UNLIKE_POST,
    payload,
  });
  static unlikePostSuccess = (payload) => ({
    type: postActionTypes.UNLIKE_POST_SUCCESS,
    payload,
  });
  static unlikePostError = (payload) => ({
    type: postActionTypes.UNLIKE_POST_ERROR,
    payload,
  });

  static selectPost = (payload) => ({
    type: postActionTypes.SELECT_POST,
    payload,
  });
  static clearSelectedPost = () => ({
    type: postActionTypes.CLEAR_SELECTED_POST,
  });
  static clearPostDetails = () => ({
    type: postActionTypes.CLEAR_POST_DETAILS,
  });
}