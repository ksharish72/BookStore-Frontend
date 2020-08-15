import { combineReducers } from "redux";
import { getUserInfoReducer } from "./getUserInfoReducer";
import { getBuyerBooks } from "./getBuyerBooks";
import { getCartItems } from "./getCartItems";
import { getSellerBooks } from "./getSellerBooks";
export default combineReducers({
  getUserInfoReducer,
  getBuyerBooks,
  getCartItems,
  getSellerBooks,
});
