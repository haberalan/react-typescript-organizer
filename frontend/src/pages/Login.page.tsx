import { TextField, Link, Typography, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';

import { useValidation } from '../common/hooks/useValidation';
import { useAppDispatch, useAppSelector } from '../common/hooks/useRedux';
import { loginUser, selectUser } from '../store/user/userSlice';

export const Login = () => {
  // Email validation
  const emailValidation = (val: string) => val.trim().length > 3 && val.trim().length < 50 && val.trim().includes('@');
  const {
    value: enteredEmail,
    setValue: setEnteredEmail,
    touched: touchedEmail,
    setTouched: setTouchedEmail,
    valid: validEmail,
    reset: resetEmail,
  } = useValidation({ validation: emailValidation });

  // Password validation
  const passwordValidation = (val: string) => val.length > 8 && val.length < 100;
  const {
    value: enteredPassword,
    setValue: setEnteredPassword,
    touched: touchedPassword,
    setTouched: setTouchedPassword,
    valid: validPassword,
    reset: resetPassword,
  } = useValidation({ validation: passwordValidation });

  // Submit
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validEmail && validPassword) {
      setSubmitted(true);
      const res = await dispatch(
        loginUser({
          email: enteredEmail,
          password: enteredPassword,
        })
      );
      if (res.meta.requestStatus === 'rejected') {
        resetEmail();
        resetPassword();
      }
    }
  };

  return (
    <>
      <Stack component="form" onSubmit={handleSubmit} sx={{ mt: 1 }} justifyContent="center" alignItems="center" direction="column">
        <TextField
          margin="normal"
          sx={{ width: '270px' }}
          required
          label="Email Address"
          value={enteredEmail}
          onChange={(e) => setEnteredEmail(e.target.value)}
          onBlur={() => setTouchedEmail(true)}
          error={touchedEmail && !validEmail}
          helperText={touchedEmail && !validEmail && 'Email is not valid.'}
        />
        <TextField
          margin="normal"
          sx={{ width: '270px' }}
          required
          label="Password"
          type="password"
          value={enteredPassword}
          onChange={(e) => setEnteredPassword(e.target.value)}
          onBlur={() => setTouchedPassword(true)}
          error={touchedPassword && !validPassword}
          helperText={touchedPassword && !validPassword && 'Password is not valid.'}
        />
        {user.error && submitted && (
          <Typography mt={1} color="error">
            {user.error}
          </Typography>
        )}
        <LoadingButton
          type="submit"
          size="large"
          loading={user.loading}
          disabled={!validEmail || !validPassword}
          sx={{
            padding: '0 0.8rem',
            mt: 3,
            mb: 2,
            fontSize: '1.2rem',
            bgcolor: 'secondary.light',
            borderRadius: '10px',
            transition: 'all 0.1s ease-in-out',
            boxShadow: '0px 4px 0px 0px #244f5d',
            '&:hover': {
              transform: 'translateY(2px)',
              boxShadow: '0px 2px 0px 0px #244f5d',
            },
            '&:disabled': {
              transform: 'translateY(2px)',
              boxShadow: '0px 2px 0px 0px #244f5d',
            },
          }}
        >
          Login
        </LoadingButton>
      </Stack>
      <Stack direction="column" alignItems="center" spacing={4}>
        <Link component={RouterLink} to="/auth/signup" variant="body2" sx={{ textDecoration: 'none' }}>
          Don't have an account? Signup
        </Link>
        <Link
          href="https://github.com/haberalan"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              color: 'primary.dark',
            },
          }}
        >
          <Typography variant="subtitle1" component="p">
            &copy; 2022 Alan Haber
          </Typography>
        </Link>
      </Stack>
    </>
  );
};
