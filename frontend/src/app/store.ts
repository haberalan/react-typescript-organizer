import { configureStore } from '@reduxjs/toolkit';

// Reducers
import userReducer from '../store/user/userSlice';
import projectReducer from '../store/projects/projectsSlice';
import taskReducer from '../store/tasks/tasksSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectReducer,
    tasks: taskReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
