import { postActionTypes } from "../Actions/postActios";

const initialState = {
  postSubmitted: { isSubmitting: false, data: null },
  posts: {
    data: [],
    statusCode: 200,
    error: "",
    message: "",
    isNextPageAvailable: false,
    isPreviousPageavailable: false,
  },
  postDetails: null,
};
let postData = []
export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case postActionTypes.ADD_POST:
      return { ...state, postSubmitted: { isSubmitting: true, data: null } };
    case postActionTypes.ADD_POST_SUCCESS:
      return {
        ...state,
        postSubmitted: { isSubmitting: false, data: action.payload },
      };
    case postActionTypes.ADD_POST_ERROR:
      return {
        ...state,
        postSubmitted: { isSubmitting: false, data: action.payload },
      };
    case postActionTypes.LIKE_POST:
      postData = state.posts.data.map((post) => {
        if (post._id === action.payload.postID) {
          post = {
            ...post,
            isLiked: true,
            likes: [...post.likes, { likedBy: action.payload.user }],
          };
        }
        return post;
      });
      return {
        ...state,
        posts: { ...state.posts, data: postData },
      };
    case postActionTypes.LIKE_POST_SUCCESS:
      postData = state.posts.data.map((post) => {
        if (post._id === action.payload.data._id) {
          post = action.payload.data;
        }
        return post;
      });
      return {
        ...state,
        posts: { ...state.posts, data: postData },
      };
    case postActionTypes.LIKE_POST_ERROR:
      return {
        ...state,
      };
    case postActionTypes.UNLIKE_POST:
      postData = state.posts.data.map((post) => {
        if (post._id === action.payload.postID) {
          post = {
            ...post,
            isLiked: false,
            likes: post.likes.filter(
              (like) => like.likedBy !== action.payload.user._id
            ),
          };
        }
        return post;
      });
      return {
        ...state,
        posts: { ...state.posts, data: postData },
      };
    case postActionTypes.UNLIKE_POST_SUCCESS:
      postData = state.posts.data.map((post) => {
        if (post._id === action.payload.data._id) {
          post = action.payload.data;
        }
        return post;
      });
      return {
        ...state,
        posts: { ...state.posts, data: postData },
      };
    case postActionTypes.UNLIKE_POST_ERROR:
      return {
        ...state,
      };
    case postActionTypes.ADD_NEW_POST:
      const updatedPostsData = [
        ...new Set([action.payload, ...state.posts.data]),
      ];
      return {
        ...state,
        posts: { ...state.posts, data: updatedPostsData },
      };
    case postActionTypes.GET_POSTS_SUCCESS:
      let postsData = action.payload.data;
      if (state.posts.data.length && action.payload.page > 1) {
        postsData = [...state.posts.data, ...postsData];
      }
      return {
        ...state,
        posts: { ...action.payload, data: postsData },
      };
    case postActionTypes.GET_POSTS_ERROR:
      return {
        ...state,
      };
    case postActionTypes.CLEAR_POST_UPLOADED:
      return { ...state, postSubmitted: { isSubmitting: false, data: null } };
    default:
      return state;
  }
};
