import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../api';

// A slice of the store is created with this function
const slice = createSlice({
  name: 'seeds',
  initialState: {
    count: 0,
    loading: false,
  },
  // actions => action handlers
  reducers: {
    // sets loading to true, can utilize a loading spinner on the frontend with this boolean
    seedsRequested: (seeds, action) => {
      seeds.loading = true;
    },
    // loading set to false, ending the loading spinner because request failed
    seedsRequestFailed: (seeds, action) => {
      seeds.loading = false;
    },
    // Reassigns the seeds list to the payload received from the axios request
    // loading set to false, ending the loading spinner because request succeeded
    seedCountReceived: (seeds, action) => {
      seeds.count = action.payload[0].total_like;
      seeds.loading = false;
    },
  },
});

const {
  seedsRequested,
  seedsRequestFailed,
  seedCountReceived,
} = slice.actions;

export default slice.reducer;

// ACTION CREATORS
// In the case of onStart, onSuccess, and onError:
// use strings for the value of the next action, do not use the actual func as callbacks
// The action object should be serializable (should be able to store it)
// so we must pass the action.type which is a string

// Load all of the people that are following me
export const loadSeeds = (currentUserId) => apiCallBegan({
  url: `/api/seeds/${currentUserId}`,
  onStart: seedsRequested.type,
  onSuccess: seedCountReceived.type,
  onError: seedsRequestFailed.type,
});

// SELECTOR FUNCTIONS - takes the state and returns the computed state
// We can't change the state here but we can make functions that will give us
// a specific or filtered part of the state.
