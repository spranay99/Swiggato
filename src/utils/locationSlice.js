import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    loc: {
      lid: 1,
      latitude: 19.0759837,
      longitude: 72.8776559,
      city: "Mumbai",
      state: "Maharashtra, India",
    },
  },
  reducers: {
    currentLocation: (state, action) => {
      state.loc = action.payload;
    },
  },
});

export const { currentLocation } = locationSlice.actions;
export default locationSlice.reducer;
