import {
  GET_SELLER_BOOKS_SUCCESS,
  GET_SELLER_BOOKS_FAILURE,
} from "../../actions/types";
const initialState = {
  status: null,
  data: {},
  message: null,
  error: null,
};

export const getSellerBooks = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_BOOKS_SUCCESS:
      return {
        ...state,
        status: "ok",
        data: action.payload,
      };
    case GET_SELLER_BOOKS_FAILURE:
      return {
        ...state,
        data: {},
        status: "error",
        error: action.payload,
      };
    default:
      return state;
  }
};
