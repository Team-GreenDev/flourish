import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../api';

// This is a easy way to use an id that just increments in the action handler
// let lastId = 0;

// A slice of the store is created with this function
const slice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
  },
  // actions => action handlers
  reducers: {
    // sets loading to true, can utilize a loading spinner on the frontend with this boolean
    usersRequested: (users, action) => {
      users.loading = true;
    },
    // loading set to false, ending the loading spinner because request failed
    usersRequestFailed: (users, action) => {
      users.loading = false;
    },
    // Reassigns the plant list to the payload received from the axios request
    // loading set to false, ending the loading spinner because request succeeded
    usersReceived: (users, action) => {
      users.list = action.payload;
      users.loading = false;
    },
    // adds a plant from the payload by pushing it to the current list in state
    userAdded: (users, action) => {
      users.list.push(action.payload.data);
    },
  },
});

const {
  usersReceived,
  userAdded,
  usersRequested,
  usersRequestFailed,
} = slice.actions;

export default slice.reducer;

// ACTION CREATORS
const url = '/api/users';

// In the case of onStart, onSuccess, and onError:
// use strings for the value of the next action, do not use the actual func as callbacks
// The action object should be serializable (should be able to store it)
// so we must pass the action.type which is a string
export const loadUsers = () => apiCallBegan({
  url,
  onStart: usersRequested.type,
  onSuccess: usersReceived.type,
  onError: usersRequestFailed.type,
});

export const addUser = (user) => apiCallBegan({
  url,
  method: 'POST',
  data: user,
  // on success this action will update (add to) the store
  // so that it reflects the correct data in the database
  onSuccess: userAdded.type,
});

// SELECTOR FUNCTIONS - takes the state and returns the computed state
// We can't change the state here but we can make functions that will give us
// a specific or filtered part of the state.
// Below is a function that filters the state based on the salary
// of the employees from the dummy data
export const getUserById = (state, id) => (
  state.users.list.filter((user) => user.id === id)
);
