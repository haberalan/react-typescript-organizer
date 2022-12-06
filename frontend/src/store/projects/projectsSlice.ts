import { createSlice, createAsyncThunk, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { ProjectType } from '../../types/Project';
import { deleteTasks } from '../tasks/tasksSlice';

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

export const fetchGetProjects = createAsyncThunk('project/get', async (payload: { token: string }, thunkAPI) => {
  const res = await fetch(process.env.REACT_APP_API + 'project/all', {
    method: 'GET',
    headers: {
      Authorization: `Baerer ${payload.token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    return thunkAPI.rejectWithValue(data.error);
  }

  return data;
});

export const fetchCreateProject = createAsyncThunk('project/create', async (payload: { token: string; title: string }, thunkAPI) => {
  const { title } = payload;

  const res = await fetch(process.env.REACT_APP_API + 'project/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Baerer ${payload.token}`,
    },
    body: JSON.stringify({ title }),
  });

  const data = await res.json();

  if (!res.ok) {
    return thunkAPI.rejectWithValue(data.error);
  }

  return data;
});

export const fetchUpdateProject = createAsyncThunk('project/update', async (payload: { token: string; id: string; title: string }, thunkAPI) => {
  const { title, id } = payload;

  const res = await fetch(process.env.REACT_APP_API + 'project/update/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Baerer ${payload.token}`,
    },
    body: JSON.stringify({ title }),
  });

  const data = await res.json();

  if (!res.ok) {
    return thunkAPI.rejectWithValue(data.error);
  }

  return {
    ...data,
    title,
  };
});

export const fetchDeleteProject = createAsyncThunk('project/delete', async (payload: { token: string; id: string }, thunkAPI) => {
  const { id } = payload;

  const res = await fetch(process.env.REACT_APP_API + 'project/delete/' + id, {
    method: 'DELETE',
    headers: {
      Authorization: `Baerer ${payload.token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    return thunkAPI.rejectWithValue(data.error);
  }

  return data;
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<ProjectType[]>) => {
      state.items = action.payload;
    },
    addProject: (state, action: PayloadAction<ProjectType>) => {
      state.items.unshift(action.payload);
    },
    updateProject: (state, action: PayloadAction<ProjectType>) => {
      state.items = state.items.filter((item) => item._id !== action.payload._id);
      state.items.unshift(action.payload);
    },
    deleteProject: (state, action: PayloadAction<ProjectType>) => {
      state.items = state.items.filter((item) => item._id !== action.payload._id);

      deleteTasks({ project_id: action.payload._id });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetProjects.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(fetchGetProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(fetchGetProjects.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';

      projectsSlice.caseReducers.setProjects(state, action);
    });
    builder.addCase(fetchCreateProject.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(fetchCreateProject.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';

      projectsSlice.caseReducers.addProject(state, action);
    });
    builder.addCase(fetchUpdateProject.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(fetchUpdateProject.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';

      console.log(action);
      projectsSlice.caseReducers.updateProject(state, action);
    });
    builder.addCase(fetchDeleteProject.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(fetchDeleteProject.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';

      projectsSlice.caseReducers.deleteProject(state, action);
    });
  },
});

export const selectProjects = createSelector(
  (state: RootState) => state.projects,
  (projects) => projects
);

export const selectProjectsLoading = createSelector(
  (state: RootState) => state.projects.loading,
  (loading) => loading
);

export default projectsSlice.reducer;
export const { setProjects, addProject, updateProject, deleteProject } = projectsSlice.actions;
