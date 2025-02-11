import {
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";

import {
  ICourseDetail,
  ICourseLevelDetail,
} from "../types";

interface IInitialState {
  course: ICourseDetail | null;
  courseLevels: ICourseLevelDetail | null;
  loading: boolean;
}

const initialState: IInitialState = {
  course: null,
  courseLevels: null,
  loading: true,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourse: (
      state,
      action: PayloadAction<typeof state.course>,
    ) => {
      state.course = action.payload;
    },
    setCourseLevels: (
      state,
      action: PayloadAction<
        typeof state.courseLevels
      >,
    ) => {
      state.courseLevels = action.payload;
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
  setCourse,
  setCourseLevels,
  setLoading,
} = courseSlice.actions;
export const courseReducer = courseSlice.reducer;
