// Main
import { Routes, Route, Navigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../common/hooks/useRedux';
import { selectUser, setUser } from '../store/user/userSlice';
import { useEffect, useState } from 'react';
import { UserType } from '../types/User';

// Theme
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';

// Components
import { ScrollToTop } from '../common/components/helpers/ScrollToTop';

// Pages
import { Home } from '../pages/Home.page';
import { AuthLayout } from '../pages/AuthLayout.page';
import { Login } from '../pages/Login.page';
import { Signup } from '../pages/Signup.page';
import { Settings } from '../pages/Settings.page';
import { DashboardLayout } from '../pages/DashboardLayout.page';
import { Dashboard } from '../pages/Dashboard.page';
import { Todos } from '../pages/Todos.page';

export const App = () => {
  const user = useAppSelector(selectUser);
  const [checked, setChecked] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const userLocalToken = JSON.parse(localStorage.getItem('REACT_TYPESCRIPT_ORGANIZER-token') as string);
    const userLocal = JSON.parse(localStorage.getItem('REACT_TYPESCRIPT_ORGANIZER-user') as string) as UserType;

    if (userLocal && userLocalToken) {
      dispatch(setUser({ token: userLocalToken, email: userLocal.email, updatedAt: userLocal.updatedAt }));
    }

    setChecked(true);
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollToTop />
      {checked && (
        <Routes>
          <Route index element={<Home />} />
          <Route path="auth" element={!user.token ? <AuthLayout /> : <Navigate to="/dashboard" replace />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="dashboard" element={user.token ? <DashboardLayout /> : <Navigate to="/auth/login" replace />}>
            <Route index element={<Dashboard />} />
            <Route path="todos" element={<Todos />} />
          </Route>
          <Route path="settings" element={user.token ? <Settings /> : <Navigate to="/auth/login" replace />} />
          <Route path="*" element={<p>not found</p>} />
        </Routes>
      )}
    </ThemeProvider>
  );
};
