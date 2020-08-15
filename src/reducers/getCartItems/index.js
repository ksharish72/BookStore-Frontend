import {
  GET_CARTITEMS_FAILURE,
  GET_CARTITEMS_SUCCESS,
} from "../../actions/types";
const initialState = {
  status: null,
  data: {},
  message: null,
  error: null,
};

export const getCartItems = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARTITEMS_SUCCESS:
      return {
        ...state,
        status: "ok",
        data: action.payload,
      };
    case GET_CARTITEMS_FAILURE:
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
