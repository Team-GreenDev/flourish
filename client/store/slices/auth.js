import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../api';

// This is a easy way to use an id that just increments in the action handler
// let lastId = 0;

// A slice of the store is created with this function
const slice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: {},
    loading: true,
    loggedIn: false,
  },
  // actions => action handlers
  reducers: {
    // sets loading to true, can utilize a loading spinner on the frontend with this boolean
    authRequested: (auth, action) => {
      auth.loading = true;
    },
    // loading set to false, ending the loading spinner because request failed
    authRequestFailed: (auth, action) => {
      auth.loading = false;
    },
    // Reassigns the plant list to the payload received from the axios request
    // loading set to false, ending the loading spinner because request succeeded
    userLoggedIn: (auth, action) => {
      auth.currentUser = action.payload;

      auth.loading = false;
      auth.loggedIn = true;
    },
    // adds a plant from the payload by pushing it to the current list in state
    userLoggedOut: (auth, action) => {
      auth.currentUser = {};
      auth.loading = false;
      auth.loggedIn = false;
    },
    // sets current user
    setCurrentUser: (auth, action) => {
      auth.currentUser = action.payload;
      auth.loggedIn = true;
    },
  },
});

const {
  authRequested,
  authRequestFailed,
  userLoggedIn,
  userLoggedOut,
} = slice.actions;

export const { setCurrentUser } = slice.actions;

export default slice.reducer;

// ACTION CREATORS
const url = '/api/auth';

// In the case of onStart, onSuccess, and onError:
// use strings for the value of the next action, do not use the actual func as callbacks
// The action object should be serializable (should be able to store it)
// so we must pass the action.type which is a string
export const login = (userInfo) => apiCallBegan({
  url: 'api/users/',
  method: 'POST',
  data: userInfo,
  onStart: authRequested.type,
  onSuccess: userLoggedIn.type,
  onError: authRequestFailed.type,
});

export const logout = () => apiCallBegan({
  url,
  onStart: authRequested.type,
  onSuccess: userLoggedOut.type,
  onError: authRequestFailed.type,
});

// SELECTOR FUNCTIONS - takes the state and returns the computed state
// We can't change the state here but we can make functions that will give us
// a specific or filtered part of the state.
// Below is a function that filters the state based on the salary
// of the employees from the dummy data
