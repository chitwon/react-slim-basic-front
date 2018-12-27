import { combineReducers, createStore, applyMiddleware } from "redux";
import { SET_LOGIN, DELETE_TOKEN, SET_HWS } from "./actions";
/* use thunk so actions can contain async functions */
import thunk from "redux-thunk";

/* reducer to handle logged in status */
const loginReducer = (state = null, { type, payload }) => {
  switch (type) {
    case SET_LOGIN: {
      return payload.token;
    }

    case DELETE_TOKEN: {
      sessionStorage.removeItem("userData");
      return null;
    }

    default:
      return state;
  }
};

/* 
reducer to handle backend API content. 
Example, user specific data stored in a DB 
*/
const contentReducer = (state = null, { type, payload }) => {
  switch (type) {
    case SET_HWS: {
      return payload.hws;
    }
    default:
      return state;
  }
};

const allReducers = combineReducers({
  reducedLogin: loginReducer,
  reducedContent: contentReducer
});

const store = createStore(
  allReducers,
  // some defaults
  {
    reducedLogin: sessionStorage.getItem("userData"),
    reducedContent: null
  },
  applyMiddleware(thunk)
);

export default store;
