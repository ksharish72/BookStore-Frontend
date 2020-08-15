import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];
const initialState = {};

const configureStore = (state = initialState) => {
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );
};

export default configureStore;
