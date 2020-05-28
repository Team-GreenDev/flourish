import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../api';

// A slice of the store is created with this function
const slice = createSlice({
  name: 'messages',
  initialState: {
    list: [],
    loading: false,
    messageAdded: 0,
    recipientId: '',
  },
  // actions => action handlers
  reducers: {
    // sets loading to true, can utilize a loading spinner on the frontend with this boolean
    messagesRequested: (messages, action) => {
      messages.loading = true;
    },
    // loading set to false, ending the loading spinner because request failed
    messagesRequestFailed: (messages, action) => {
      messages.loading = false;
    },
    // Reassigns the messages list to the payload received from the axios request
    // loading set to false, ending the loading spinner because request succeeded
    messagesReceived: (messages, action) => {
      messages.list = action.payload;
      messages.loading = false;
    },
    messageAdded: (messages, action) => {
      // get messages when this number changes
      messages.messageAdded += 1;
    },
    // sets private message recipient id
    setRecipientId: (messages, action) => {
      messages.recipientId = action.payload;
    },
    // trigger a reload of messages when message thread is deleted
    messageThreadDeleted: (messages, action) => {
      // get messages when this number changes
      messages.messageAdded += 1;
    },
  },
});

const {
  messagesReceived,
  messageAdded,
  messagesRequested,
  messagesRequestFailed,
  messageThreadDeleted,
} = slice.actions;

export const { setRecipientId } = slice.actions;

export default slice.reducer;

// ACTION CREATORS
const url = '/api/messages';

// In the case of onStart, onSuccess, and onError:
// use strings for the value of the next action, do not use the actual func as callbacks
// The action object should be serializable (should be able to store it)
// so we must pass the action.type which is a string
export const loadMessages = () => apiCallBegan({
  url,
  onStart: messagesRequested.type,
  onSuccess: messagesReceived.type,
  onError: messagesRequestFailed.type,
});

export const addMessage = (message) => apiCallBegan({
  url,
  method: 'POST',
  data: message,
  // on success this action will update (add to) the store
  // so that it reflects the correct data in the database
  onSuccess: messageAdded.type,
});

export const deleteMessageThread = (ids) => apiCallBegan({
  url,
  method: 'PATCH',
  data: ids,
  onStart: messagesRequested.type,
  onSuccess: messageThreadDeleted.type,
  onError: messagesRequestFailed.type,
});

// SELECTOR FUNCTIONS - takes the state and returns the computed state
// We can't change the state here but we can make functions that will give us
// a specific or filtered part of the state.
// Below is a function that filters the state based on the salary
// of the employees from the dummy data
export const getMessagesByRecipientId = (state, id) => (
  state.messages.list.filter((message) => message.recipient_id === id)
);
