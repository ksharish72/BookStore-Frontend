import {
  GET_BUYER_BOOKS_SUCCESS,
  GET_BUYER_BOOKS_FAILURE,
} from "../../actions/types";
const initialState = {
  status: null,
  data: {},
  message: null,
  error: null,
};

export const getBuyerBooks = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUYER_BOOKS_SUCCESS:
      return {
        ...state,
        status: "ok",
        data: action.payload,
      };
    case GET_BUYER_BOOKS_FAILURE:
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
