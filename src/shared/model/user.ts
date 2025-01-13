import {
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";

import { IProfile } from "../types";

interface IInitialState {
  profile: IProfile | null;
  loading: boolean;
}

const initialState: IInitialState = {
  profile: null,
  loading: false,
};

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
    setLoading: (
      state,
      action: PayloadAction<typeof state.loading>,
    ) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setUserProfile,
  clearUserProfile,
  setLoading,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
