import {
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  RESET_USERINFO,
} from "../../actions/types";
const initialState = {
  status: null,
  data: {},
  message: null,
  error: null,
};

export const getUserInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        status: "ok",
        data: action.payload,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        data: {},
        status: "error",
        error: action.payload,
      };
    case RESET_USERINFO:
      return initialState;
    default:
      return state;
  }
};
