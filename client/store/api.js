import { createAction } from '@reduxjs/toolkit';

// These variables are actually functions
// Their type, which is what is being passed into createAction, is accessed with apiCallBegan.type
// They are utilized to make it clear what action is being dispatched when to the store
export const apiCallBegan = createAction('api/CallBegan');
export const apiCallSuccess = createAction('api/CallSuccess');
export const apiCallFailed = createAction('api/CallFailed');
