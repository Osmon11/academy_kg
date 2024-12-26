import {
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";

import { IProfile } from "../types";

const initialState: { profile: IProfile | null } =
  { profile: null };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile: (
      state,
      action: PayloadAction<typeof state.profile>,
    ) => {
      state.profile = action.payload;
    },
    clearUserProfile(state) {
      state.profile = null;
    },
  },
});

export const {
  setUserProfile,
  clearUserProfile,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
