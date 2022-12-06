import { createSlice, createAsyncThunk, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { ProjectType } from '../../types/Project';

type InitialState = {
  loading: boolean;
  error: string;
  items: ProjectType[];
};

const initialState: InitialState = {
  loading: false,
  error: '',
  items: [],
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

// selectors

export default projectsSlice.reducer;
export const {} = projectsSlice.actions;
