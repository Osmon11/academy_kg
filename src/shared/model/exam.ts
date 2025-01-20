import {
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";

import { IExamQuestions } from "../types";

interface IInitialState {
  examQuestions: IExamQuestions | null;
  loading: boolean;
}

const initialState: IInitialState = {
  examQuestions: null,
  loading: false,
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setExamQuestions: (
      state,
      action: PayloadAction<
        typeof state.examQuestions
      >,
    ) => {
      state.examQuestions = action.payload;
    },
    setExamLoading: (
      state,
      action: PayloadAction<typeof state.loading>,
    ) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setExamQuestions,
  setExamLoading,
} = examSlice.actions;
export const examReducer = examSlice.reducer;
