import { createSlice } from '@reduxjs/toolkit';

// A slice of the store is created with this function
const slice = createSlice({
  name: 'photo',
  initialState: {
    currentPhoto: {},
    plantIdData: {},
    photoInForm: {},
    loading: true,
  },
  // actions => action handlers
  reducers: {
    // sets loading to true, can utilize a loading spinner on the frontend with this boolean
    photoRequested: (photo, action) => {
      photo.loading = true;
    },
    // loading set to false, ending the loading spinner because request failed
    photoRequestFailed: (photo, action) => {
      photo.loading = false;
    },
    // loading set to false, ending the loading spinner because request failed
    photoRequestSucceeded: (photo, action) => {
      photo.loading = false;
    },
    // sets current user
    setCurrentPhoto: (photo, action) => {
      photo.currentPhoto = action.payload;
    },
    // sets current user
    setPhotoInForm: (photo, action) => {
      photo.photoInForm = action.payload;
    },
    // sets current user
    setPlantIdData: (photo, action) => {
      photo.plantIdData = action.payload;
    },
  },
});

export const { setCurrentPhoto, setPhotoInForm, setPlantIdData } = slice.actions;

export default slice.reducer;
