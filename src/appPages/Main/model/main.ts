import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 };

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } =
  mainSlice.actions;
export const mainReducer = mainSlice.reducer;
