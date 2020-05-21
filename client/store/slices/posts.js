import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../api';

// A slice of the store is created with this function
const slice = createSlice({
  name: 'posts',
  initialState: {
    list: [],
    loading: false,
    postAdded: 0,
  },
  // actions => action handlers
  reducers: {
    // sets loading to true, can utilize a loading spinner on the frontend with this boolean
    postsRequested: (posts, action) => {
      posts.loading = true;
    },
    // loading set to false, ending the loading spinner because request failed
    postsRequestFailed: (posts, action) => {
      posts.loading = false;
    },
    // Reassigns the post list to the payload received from the axios request
    // loading set to false, ending the loading spinner because request succeeded
    postsReceived: (posts, action) => {
      posts.list = action.payload;
      posts.loading = false;
    },
    // adds a post from the payload by pushing it to the current list in state
    postAdded: (posts, action) => {
      posts.postAdded += 1;
    },
    // Increase the like count
    postLiked: (posts, action) => {
      // incrementing postAdded in order to trigger update
      posts.postAdded += 1;
    },
    // Decrease the like count
    postUnliked: (posts, action) => {
      // decrementing postAdded in order to trigger update
      posts.postAdded -= 1;
    },
  },
});

const {
  postsReceived,
  postAdded,
  postsRequested,
  postsRequestFailed,
  postLiked,
  postUnliked,
} = slice.actions;

export default slice.reducer;

// ACTION CREATORS
const url = '/api/posts';

// In the case of onStart, onSuccess, and onError:
// use strings for the value of the next action, do not use the actual func as callbacks
// The action object should be serializable (should be able to store it)
// so we must pass the action.type which is a string
export const loadPosts = () => apiCallBegan({
  url,
  onStart: postsRequested.type,
  onSuccess: postsReceived.type,
  onError: postsRequestFailed.type,
});

export const addPost = (post) => apiCallBegan({
  url,
  method: 'POST',
  data: post,
  // on success this action will update (add to) the store
  // so that it reflects the correct data in the database
  onSuccess: postAdded.type,
});

export const likePost = (post) => apiCallBegan({
  url: `/api/posts/${post.id}`,
  method: 'POST',
  onStart: postsRequested.type,
  onError: postsRequestFailed.type,
  onSuccess: postLiked.type,
});

export const unlikePost = (post) => apiCallBegan({
  url: `/api/posts/${post.id}`,
  method: 'PATCH',
  onStart: postsRequested.type,
  onError: postsRequestFailed.type,
  onSuccess: postUnliked.type,
});

// SELECTOR FUNCTIONS - takes the state and returns the computed state
// We can't change the state here but we can make functions that will give us
// a specific or filtered part of the state.
// Below is a function that filters the state based on the salary
// of the employees from the dummy data
export const getPostByUserId = (state, id) => (
  state.posts.list.filter((post) => post.user_id === id)
);
