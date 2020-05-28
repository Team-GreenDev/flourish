import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../api';

// A slice of the store is created with this function
const slice = createSlice({
  name: 'comments',
  initialState: {
    currentPost: {},
    currentUser: {},
    currentComments: [],
    commentsAdded: 0,
    loading: true,
  },
  // actions => action handlers
  reducers: {
    // sets loading to true, can utilize a loading spinner on the frontend with this boolean
    commentScreenRequested: (comments, action) => {
      comments.loading = true;
    },
    // loading set to false, ending the loading spinner because request failed
    commentScreenRequestFailed: (comments, action) => {
      comments.loading = false;
    },
    // loading set to false, ending the loading spinner because request failed
    commentScreenRequestSucceeded: (comments, action) => {
      comments.loading = false;
    },
    commentsAdded: (comments, action) => {
      // get messages when this number changes
      comments.commentsgeAdded += 1;
    },
    // sets current user
    setCommentInfo: (comments, action) => {
      const { post, user, postComments } = action.payload;
      comments.currentPost = post;
      comments.currentUser = user;
      comments.currentComments = postComments;
      comments.loading = false;

    },
  },
});

export const {
  setCommentInfo,
  commentScreenRequestFailed,
  commentScreenRequestSucceeded,
  commentScreenRequested,
} = slice.actions;

export default slice.reducer;

// ACTION CREATORS

// In the case of onStart, onSuccess, and onError:
// use strings for the value of the next action, do not use the actual func as callbacks
// The action object should be serializable (should be able to store it)
// so we must pass the action.type which is a string
export const getPostComments = (id) => apiCallBegan({
  url: `/api/comments/post/${id}`,
  onStart: commentScreenRequested.type,
  onSuccess: commentScreenRequestSucceeded.type,
  onError: commentScreenRequestFailed.type,
});

// SELECTOR FUNCTIONS - takes the state and returns the computed state
// We can't change the state here but we can make functions that will give us
// a specific or filtered part of the state.
// Below is a function that filters the state based on the salary
// of the employees from the dummy data
export const getCommentsByPostId = (state, id) => (
  state.comments.currentComments.filter((comments) => comments.post_id === id)
);
