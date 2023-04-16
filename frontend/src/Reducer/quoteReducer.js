import { quoteActionTypes } from "../Actions/quoteActions";

const initialState = {
  quote:{}
};
export const quoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case quoteActionTypes.GET_RANDOM_QUOTE_SUCCESS:
      return { ...state, quote: action.payload };
    case quoteActionTypes.GET_RANDOM_QUOTE_ERROR:
      return { ...state, quote: action.payload };
    default:
      return state;
  }
};
