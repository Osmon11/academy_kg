import {
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";

import {
  IComment,
  ICourseDetail,
  ICourseLevelDetail,
} from "../types";

interface IInitialState {
  course: ICourseDetail | null;
  courseLevels: ICourseLevelDetail | null;
  comments: IComment[];
  loading: boolean;
}

const initialState: IInitialState = {
  course: null,
  courseLevels: null,
  comments: [],
  loading: false,
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
    setComments: (
      state,
      action: PayloadAction<
        typeof state.comments
      >,
    ) => {
      state.comments = action.payload;
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
  setComments,
  setLoading,
} = courseSlice.actions;
export const courseReducer = courseSlice.reducer;
