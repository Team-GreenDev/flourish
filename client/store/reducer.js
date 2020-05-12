import { combineReducers } from 'redux';
import plantsReducer from './plants';

// Future reducers can be imported above like plantsReducer
// then added as a key value to the combineReducers
// combineReducers is then passed into the creation of the store in configureStore
export default combineReducers({
  plants: plantsReducer,
});
