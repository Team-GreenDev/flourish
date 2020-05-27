import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../api';

// A slice of the store is created with this function
const slice = createSlice({
  name: 'follow',
  initialState: {
    followers: [],
    following: [],
    loading: false,
  },
  // actions => action handlers
  reducers: {
    // sets loading to true, can utilize a loading spinner on the frontend with this boolean
    followRequested: (follow, action) => {
      follow.loading = true;
    },
    // loading set to false, ending the loading spinner because request failed
    followRequestFailed: (follow, action) => {
      follow.loading = false;
    },
    // Reassigns the follow list to the payload received from the axios request
    // loading set to false, ending the loading spinner because request succeeded
    followersReceived: (follow, action) => {
      follow.followers = action.payload.map(user => user[0]);
      follow.loading = false;
    },
    // Reassigns the follow list to the payload received from the axios request
    // loading set to false, ending the loading spinner because request succeeded
    followingReceived: (follow, action) => {
      follow.following = action.payload.map(user => user[0]);
      follow.loading = false;
    },
    userFollowed: (follow, action) => {
      // fill in later
      follow.loading = false;
    },
    UserUnfollowed: (follow, action) => {
      // fill in later
      follow.loading = false;
    },
  },
});

const {
  followRequested,
  followRequestFailed,
  followersReceived,
  followingReceived,
  userFollowed,
  UserUnfollowed,
} = slice.actions;

export default slice.reducer;

// ACTION CREATORS
const url = '/api/followers';

// In the case of onStart, onSuccess, and onError:
// use strings for the value of the next action, do not use the actual func as callbacks
// The action object should be serializable (should be able to store it)
// so we must pass the action.type which is a string

// Load all of the people that are following me
export const loadFollowers = (currentUserId) => apiCallBegan({
  url: `/api/followers/user/${currentUserId}`,
  onStart: followRequested.type,
  onSuccess: followersReceived.type,
  onError: followRequestFailed.type,
});

// Load all of the people I am following
export const loadFollowing = (currentUserId) => apiCallBegan({
  url: `/api/followers/following/${currentUserId}`,
  onStart: followRequested.type,
  onSuccess: followingReceived.type,
  onError: followRequestFailed.type,
});


export const followUser = (ids) => apiCallBegan({
  url,
  method: 'POST',
  data: ids,
  onStart: followRequested.type,
  onSuccess: userFollowed.type,
  onError: followRequestFailed.type,
});

export const unfollowUser = (ids) => apiCallBegan({
  url: '/api/followers/unfollow',
  method: 'PATCH',
  data: ids,
  onStart: followRequested.type,
  onSuccess: UserUnfollowed.type,
  onError: followRequestFailed.type,
});

// SELECTOR FUNCTIONS - takes the state and returns the computed state
// We can't change the state here but we can make functions that will give us
// a specific or filtered part of the state.
