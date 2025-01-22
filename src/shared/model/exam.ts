import {
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";

import {
  IExamQuestions,
  IQuestion,
} from "../types";

interface IInitialState {
  examQuestions: IExamQuestions | null;
  loading: boolean;
  results: (IQuestion & {
    skipped: boolean;
    correctAnswer: boolean;
  })[];
}

const initialState: IInitialState = {
  examQuestions: null,
  loading: false,
  results: [],
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
    setResults: (
      state,
      action: PayloadAction<typeof state.results>,
    ) => {
      state.results = action.payload;
    },
  },
});

export const {
  setExamQuestions,
  setExamLoading,
  setResults,
} = examSlice.actions;
export const examReducer = examSlice.reducer;
