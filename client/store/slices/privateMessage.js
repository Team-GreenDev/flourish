import { createSlice } from '@reduxjs/toolkit';

// A slice of the store is created with this function
const slice = createSlice({
  name: 'privateMessage',
  initialState: {
    thread: [],
    loading: true,
    clickedPrivateMessage: 0,
  },
  // actions => action handlers
  reducers: {
    // sets loading to true, can utilize a loading spinner on the frontend with this boolean
    privateMessageRequested: (privateMessage, action) => {
      privateMessage.loading = true;
    },
    // loading set to false, ending the loading spinner because request failed
    privateMessageRequestFailed: (privateMessage, action) => {
      privateMessage.loading = false;
    },
    // sets current user
    setPrivateMessage: (privateMessage, action) => {
      privateMessage.thread = action.payload;
      privateMessage.clickedPrivateMessage += 1;
    },
  },
});

export const { setPrivateMessage } = slice.actions;

export default slice.reducer;
