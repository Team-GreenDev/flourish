import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducer';
import api from './middleware/api';

// This is where the instance of the store is created
// It is called in App.js and assigned to the variable store
export default function () {
  // The reducer is the first argument which is all of the reducers combined from reducer.js
  // all middleware is passed in an arry of middleware as the second argument
  // getDefaultMiddleware allows us to use redux devTools inside of react devTools
  return configureStore({ reducer, middleware: [...getDefaultMiddleware(), api] });
}
