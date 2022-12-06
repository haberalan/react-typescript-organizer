import { createSlice, createAsyncThunk, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { UserType } from '../../types/User';

type InitialState = {
  loading: boolean;
  token: string;
  user: UserType | null;
  error: string;
};

const initialState: InitialState = {
  loading: false,
  token: '',
  user: null,
  error: '',
};

export const loginUser = createAsyncThunk('user/login', async (payload: { email: string; password: string }, thunkAPI) => {
  const { email, password } = payload;

  const res = await fetch(process.env.REACT_APP_API + 'user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return thunkAPI.rejectWithValue(data.error);
  }

  return data;
});

export const signupUser = createAsyncThunk('user/signup', async (payload: { email: string; password: string }, thunkAPI) => {
  const { email, password } = payload;

  const res = await fetch(process.env.REACT_APP_API + 'user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return thunkAPI.rejectWithValue(data.error);
  }

  return data;
});

export const updateUser = createAsyncThunk('user/update', async (payload: { currentPassword: string; newPassword: string; token: string }, thunkAPI) => {
  const { currentPassword, newPassword } = payload;

  const res = await fetch(process.env.REACT_APP_API + 'user/update', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Baerer ${payload.token}`,
    },
    body: JSON.stringify({ password: currentPassword, newPassword }),
  });

  const data = await res.json();

  if (!res.ok) {
    return thunkAPI.rejectWithValue(data.error);
  }

  return data;
});

export const deleteUser = createAsyncThunk('user/delete', async (payload: { token: string }, thunkAPI) => {
  const res = await fetch(process.env.REACT_APP_API + 'user/delete', {
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ token: string; email: string; updatedAt: Date }>) => {
      state.token = action.payload.token;
      state.user = {
        email: action.payload.email,
        updatedAt: action.payload.updatedAt,
      };

      localStorage.setItem('REACT_TYPESCRIPT_ORGANIZER-token', JSON.stringify(state.token));
      localStorage.setItem('REACT_TYPESCRIPT_ORGANIZER-user', JSON.stringify(state.user));
    },
    logoutUser: (state) => {
      state.token = '';
      state.user = null;

      localStorage.removeItem('REACT_TYPESCRIPT_ORGANIZER-token');
      localStorage.removeItem('REACT_TYPESCRIPT_ORGANIZER-user');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';

      userSlice.caseReducers.setUser(state, action);
    });
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';

      userSlice.caseReducers.setUser(state, action);
    });
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';

      userSlice.caseReducers.logoutUser(state);
    });
  },
});

export const selectUser = createSelector(
  (state: RootState) => state.user,
  (user) => user
);

export default userSlice.reducer;
export const { setUser, logoutUser } = userSlice.actions;
