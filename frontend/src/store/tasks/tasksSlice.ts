import { createSlice, createAsyncThunk, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { TaskType } from '../../types/Task';

type enteredTask = {
  text: string;
  hierarchy: Number;
  date?: Date;
};

type InitialState = {
  loading: boolean;
  error: string;
  items: TaskType[];
};

const initialState: InitialState = {
  loading: false,
  error: '',
  items: [],
};

export const fetchGetTasks = createAsyncThunk('task/get', async (payload: { token: string }, thunkAPI) => {
  const res = await fetch(process.env.REACT_APP_API + 'task/all', {
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

export const fetchCreateTask = createAsyncThunk('task/create', async (payload: { token: string; project_id: string; item: enteredTask }, thunkAPI) => {
  const { project_id, item } = payload;

  const res = await fetch(process.env.REACT_APP_API + 'task/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Baerer ${payload.token}`,
    },
    body: JSON.stringify({ project_id, ...item }),
  });

  const data = await res.json();

  if (!res.ok) {
    return thunkAPI.rejectWithValue(data.error);
  }

  return data;
});

export const fetchUpdateTask = createAsyncThunk(
  'task/update',
  async (payload: { token: string; id: string; project_id: string; item: enteredTask }, thunkAPI) => {
    const { project_id, item, id } = payload;

    const res = await fetch(process.env.REACT_APP_API + 'task/update/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Baerer ${payload.token}`,
      },
      body: JSON.stringify({ project_id, ...item }),
    });

    const data = await res.json();

    if (!res.ok) {
      return thunkAPI.rejectWithValue(data.error);
    }

    return {
      ...data,
      ...item,
    };
  }
);

export const fetchDeleteTask = createAsyncThunk('project/delete', async (payload: { token: string; id: string }, thunkAPI) => {
  const { id } = payload;

  const res = await fetch(process.env.REACT_APP_API + 'task/delete/' + id, {
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

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<TaskType[]>) => {
      state.items = action.payload;
    },
    addTask: (state, action: PayloadAction<TaskType>) => {
      state.items.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<TaskType>) => {
      state.items = state.items.filter((item) => item._id !== action.payload._id);
      state.items.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<TaskType>) => {
      state.items = state.items.filter((item) => item._id !== action.payload._id);
    },
    deleteTasks: (state, action: PayloadAction<{ project_id: string }>) => {
      state.items = state.items.filter((item) => item.project_id !== action.payload.project_id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetTasks.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(fetchGetTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(fetchGetTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';

      tasksSlice.caseReducers.setTasks(state, action);
    });
    builder.addCase(fetchCreateTask.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(fetchCreateTask.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';

      tasksSlice.caseReducers.addTask(state, action);
    });
    builder.addCase(fetchUpdateTask.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(fetchUpdateTask.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';

      console.log(action);
      tasksSlice.caseReducers.updateTask(state, action);
    });
    builder.addCase(fetchDeleteTask.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(fetchDeleteTask.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';

      tasksSlice.caseReducers.deleteTask(state, action);
    });
  },
});

const tasks = (state: RootState) => state.tasks;

export const selectTasks = createSelector([tasks], (projects) => projects);

export const selectTasksPerProject = createSelector([tasks, (tasks, project_id: string) => project_id], (tasks, project_id) =>
  tasks.items.filter((item) => item.project_id === project_id)
);

export const selectTasksLoading = createSelector(
  (state: RootState) => state.tasks.loading,
  (loading) => loading
);

export default tasksSlice.reducer;
export const { setTasks, addTask, updateTask, deleteTask, deleteTasks } = tasksSlice.actions;
