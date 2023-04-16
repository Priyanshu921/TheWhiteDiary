export const quoteActionTypes = {
  GET_RANDOM_QUOTE: "GET_RANDOM_QUOTE",
  GET_RANDOM_QUOTE_SUCCESS: "GET_RANDOM_QUOTE_SUCCESS",
  GET_RANDOM_QUOTE_ERROR: "GET_RANDOM_QUOTE_ERROR",
};

export class quoteActions {
  static getRandomQuote = () => ({
    type: quoteActionTypes.GET_RANDOM_QUOTE,
  });
  static getRandomQuoteSuccess = (payload) => ({
    type: quoteActionTypes.GET_RANDOM_QUOTE_SUCCESS,
    payload,
  });
  static getRandomQuoteError = (payload) => ({
    type: quoteActionTypes.GET_RANDOM_QUOTE_ERROR,
    payload,
  });
}