import { combineReducers } from 'redux';
import plantsReducer from './slices/plants';
import usersReducer from './slices/users';
import postsReducer from './slices/posts';
import messagesReducer from './slices/messages';
import authReducer from './slices/auth';
import privateMessageReducer from './slices/privateMessage';

// Future reducers can be imported above like plantsReducer
// then added as a key value to the combineReducers
// combineReducers is then passed into the creation of the store in configureStore
export default combineReducers({
  plants: plantsReducer,
  users: usersReducer,
  posts: postsReducer,
  messages: messagesReducer,
  auth: authReducer,
  privateMessage: privateMessageReducer,
});
