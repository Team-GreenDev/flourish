import axios from 'axios';
import * as actions from '../api';
import {  DEPLOYED_URL, NGROK_URL } from 'react-native-dotenv';

// This middleware handles all api calls

// If the action.type is apiCallBegan then it will utilize this piece of middleware
// Otherwise the action will skip this middleware
const api = (store) => (next) => (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  // These are variable destructured from the action's payload for an axios request
  const {
    url,
    method,
    data,
    onSuccess,
    onError,
    onStart,
  } = action.payload;

  // onStart is to utilize a loading wheel feature while waiting for an api response
  // if on start is true, the onStart action will be dispatched
  // In the case of plants.js it dispatches the action plantsRequested
  // The value in the plants slice "loading" is set to true which should be utilized on the
  // front end to render a loading wheel until it is set to false again
  if (onStart) {
    store.dispatch({
      type: onStart,
    });
  }

  // We call next is here to see the apiCallBegan logged in the redux devTools
  next(action);

  // The request is finally made here to the baseURL which we will change to our server
  // Right now it is set to a dummy REST api to test for get and post calls
  // url is the endpoint that we want to send a request to in our server
  // method is get by default but can be set to another type
  // data is the object that the request is sending to the server
  axios.request({
    baseURL: DEPLOYED_URL || NGROK_URL || 'http://localhost:8080',
    url,
    method,
    data,
  })
    .then((res) => {
      // General success dispatches the data from the successful api call
      store.dispatch(actions.apiCallSuccess(res.data));

      // Specific success dispatch, which is dispatched with the response data from api call
      // When using plant.js, plantsReceived is dispatched which sets plants.loading to false
      // and also sends res.data as its payload
      if (onSuccess) {
        store.dispatch({
          type: onSuccess,
          payload: res.data,
        });
      }
    })
    .catch((error) => {
      // General error dispatch, sending the error message as its payload
      store.dispatch(actions.apiCallFailed(error.message));

      // Specific error dispatch with the error.message from api call
      // In the case of plant.js, this also sets plants.loading to false and
      // sends the error.message as its payload
      if (onError) {
        store.dispatch({
          type: onError,
          payload: error.message,
        });
      }
    });
};

export default api;
