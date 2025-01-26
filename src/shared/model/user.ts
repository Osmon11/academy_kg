import {
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";

import { ELanguage } from "../config/enum";
import { IProfile } from "../types";

interface IInitialState {
  profile: IProfile | null;
  loading: boolean;
  language: ELanguage;
}

const initialState: IInitialState = {
  profile: null,
  loading: false,
  language: ELanguage.RU,
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
    setProfileLoading: (
      state,
      action: PayloadAction<typeof state.loading>,
    ) => {
      state.loading = action.payload;
    },
    setLanguage: (
      state,
      action: PayloadAction<
        typeof state.language
      >,
    ) => {
      state.language = action.payload;
    },
  },
});

export const {
  setUserProfile,
  clearUserProfile,
  setProfileLoading,
  setLanguage,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
