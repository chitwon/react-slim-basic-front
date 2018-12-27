import { PostData } from "../services/PostData";
export const SET_LOGIN = "login:googleCode";
export const DELETE_TOKEN = "login:deleteToken";
export const SET_HWS = "content:setHw";

/*
  create a promise to make session storage async 
*/
const asyncSessionStorage = {
  setItem: function(key, value) {
    return Promise.resolve()
      .then(function() {
        sessionStorage.setItem(key, value);
      })
      .catch(err => {
        console.log("error", err);
      });
  },
  getItem: function(key) {
    return Promise.resolve()
      .then(function() {
        return sessionStorage.getItem(key);
      })
      .catch(err => {
        console.log("error", err);
      });
  }
};

/* action to set the content reducer */
export const setHws = hws => {
  console.log("​hws ", hws);
  return {
    type: SET_HWS,
    payload: {
      hws: hws
    }
  };
};

/*
action to fetch data from the api. once complete
it will fire off another action to set reducer
*/
export const getHws = () => {
  return dispatch => {
    // wait until session data is loaded.
    asyncSessionStorage
      .getItem("userData")
      .then(result => {
        const parsed = JSON.parse(result);
        if (parsed) {
          const userObj = { token: parsed.token, email: parsed.user.email };
          // post the data to the backend api
          PostData("get_hw", userObj)
            .then(result => {
              // send the result to the component
              dispatch(setHws(result));
            })
            .catch(err => {
              console.log("Caught error --  ", err);
            });
        } else {
          console.log('user data not set');
        }
      })
      .catch(err => {
        console.log("error", err);
      });
  };
};

/* 
handleGoogleCode is used on login to handle the google code 
and fetch the backend api token. Then, if needed,
next can be another action complete after successful login
*/
export const handleGoogleCode = (postObj, next = null) => {
  return dispatch => {
    // Get the token from the backend api, and then get the desired data.
    // first the token from backend post url  /google-code
    PostData("google-code", postObj)
      .then(result => {
        // create an object from the response to store in browser session
        const obj = {
          token: result.mcToken,
          user: result.userInfo,
          givenName: result.userInfo.givenName
        };
        // use a promise to make sure session data is set before moving on!
        asyncSessionStorage
          .setItem("userData", JSON.stringify(obj))
          .then(function() {
            // now pass it to a reducer to load the token into the component
            dispatch(loadMcToken(obj.token));
            // if desired, dispatch another function to fetch some data from the api
            if (next) dispatch(next);
          })
          .catch(err => {
            console.log("error", err);
          });
      })
      .catch(err => {
        console.log("error", err);
      });
  };
};

/* set the loginReducer to be used by components */
export const loadMcToken = token => {
  return {
    type: SET_LOGIN,
    payload: {
      token: token
    }
  };
};

/* 
delete a token from local session to log out.
To-do. Make it more robust and secure by removing token from 
backend API. Right now the token stored in the DB will simply expire
*/
export const deleteToken = {
  type: DELETE_TOKEN
};
