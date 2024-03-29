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
    isLoading: false,
  },
  postDetails: null,
  selectedPost: null,
};
let postData = [];
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
    // case postActionTypes.LIKE_POST_SUCCESS:
    //   postData = state.posts.data.map((post) => {
    //     if (post._id === action.payload.data._id) {
    //       post = action.payload.data;
    //     }
    //     return post;
    //   });
    //   return {
    //     ...state,
    //     posts: { ...state.posts, data: postData },
    //   };
    case postActionTypes.LIKE_POST_ERROR:
      if (action.payload.statusCode !== 409) {
        const likesLength = Array.isArray(state?.posts?.data?.likes)
          ? state?.posts?.data?.likes?.length
          : 0;
        let likes = [];
        if (likesLength > 0) {
          likes = state?.posts?.data?.likes.slice(0, likesLength - 1);
        }
        postData = state.posts.data.map((post) => {
          if (post._id === action.payload.data._id) {
            post = {
              ...post,
              isLiked: false,
              likes: likes,
            };
          }
          return post;
        });
        console.log(postData);
        return {
          ...state,
          posts: { ...state.posts, data: postData },
        };
      }
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
    case postActionTypes.GET_POSTS:
      return {
        ...state,
        posts: {
          ...state.posts,
          isLoading: true,
        },
      };
    case postActionTypes.GET_POSTS_SUCCESS:
      let postsData = action.payload.data;
      if (state.posts.data.length && action.payload.page > 1) {
        postsData = [...state.posts.data, ...postsData];
      }
      return {
        ...state,
        posts: { ...action.payload, data: postsData, isLoading: false },
      };
    case postActionTypes.GET_POSTS_ERROR:
      return {
        ...state,
        posts: {
          ...state.posts,
          isLoading: false,
          isNextPageAvailable: false,
        },
      };
    case postActionTypes.GET_POST_SUCCESS:
      return {
        ...state,
        postDetails: { ...action.payload.data },
      };
    case postActionTypes.GET_POST_ERROR:
      return {
        ...state,
        postDetails: null,
      };
    case postActionTypes.CLEAR_POST_UPLOADED:
      return { ...state, postSubmitted: { isSubmitting: false, data: null } };

    case postActionTypes.SELECT_POST:
      return { ...state, selectedPost: action.payload };

    case postActionTypes.CLEAR_SELECTED_POST:
      return { ...state, selectedPost: null };

    case postActionTypes.CLEAR_POST_DETAILS:
      return { ...state, postDetails: null };

    default:
      return state;
  }
};
