import { TextField, Link, Typography, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';

import { useValidation } from '../common/hooks/useValidation';
import { useAppDispatch, useAppSelector } from '../common/hooks/useRedux';
import { signupUser, selectUser } from '../store/user/userSlice';

export const Signup = () => {
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
  const passwordValidation = (val: string) =>
    val.length >= 8 &&
    val.length < 50 &&
    // eslint-disable-next-line
    /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(val) &&
    /[a-z]/.test(val) &&
    /[A-Z]/.test(val) &&
    /[0-9]/.test(val);

  const {
    value: enteredPassword,
    setValue: setEnteredPassword,
    touched: touchedPassword,
    setTouched: setTouchedPassword,
    valid: validPassword,
    reset: resetPassword,
  } = useValidation({ validation: passwordValidation });

  // Confirm Password Validation
  const confirmPasswordValidation = (val: string) => validPassword && enteredPassword === val;
  const {
    value: enteredConfirmPassword,
    setValue: setEnteredConfirmPassword,
    touched: touchedConfirmPassword,
    setTouched: setTouchedConfirmPassword,
    valid: validConfirmPassword,
    reset: resetConfirmPassword,
  } = useValidation({ validation: confirmPasswordValidation });

  // Submit
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validEmail && validPassword) {
      setSubmitted(true);
      const res = await dispatch(
        signupUser({
          email: enteredEmail,
          password: enteredPassword,
        })
      );
      if (res.meta.requestStatus === 'rejected') {
        resetEmail();
        resetPassword();
        resetConfirmPassword();
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
        <TextField
          margin="normal"
          sx={{ width: '270px' }}
          required
          label="Confirm Password"
          type="password"
          value={enteredConfirmPassword}
          onChange={(e) => setEnteredConfirmPassword(e.target.value)}
          onBlur={() => setTouchedConfirmPassword(true)}
          error={touchedConfirmPassword && !validConfirmPassword}
          helperText={touchedConfirmPassword && !validConfirmPassword && 'Passwords are not same.'}
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
          disabled={!validEmail || !validPassword || !validConfirmPassword}
          sx={{
            padding: '0 0.8rem',
            mt: 3,
            mb: 2,
            fontSize: '1.2rem',
            bgcolor: 'primary.main',
            color: 'secondary.light',
            borderRadius: '10px',
            transition: 'all 0.1s ease-in-out',
            boxShadow: '0px 4px 0px 0px #244f5d',
            '&:hover': {
              bgcolor: 'primary.dark',
              transform: 'translateY(1px)',
              boxShadow: '0px 3px 0px 0px #244f5d',
            },
            '&:disabled': {
              color: 'secondary.dark',
              bgcolor: 'primary.dark',
              transform: 'translateY(1px)',
              boxShadow: '0px 3px 0px 0px #244f5d',
            },
          }}
        >
          Signup
        </LoadingButton>
      </Stack>
      <Stack direction="column" alignItems="center" spacing={4}>
        <Link component={RouterLink} to="/auth/login" variant="body2" sx={{ textDecoration: 'none' }}>
          Already have an account? Login
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
