import { Grid, IconButton, Stack, Paper, Typography, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link as RouterLink } from 'react-router-dom';
import React, { useState } from 'react';

import { useValidation } from '../common/hooks/useValidation';
import { useAppDispatch, useAppSelector } from '../common/hooks/useRedux';
import { selectUser, updateUser } from '../store/user/userSlice';
import { ModalDeleteUser } from '../common/components/settings/ModalDeleteUser';

export const Settings = () => {
  // Current Password validation
  const currentPasswordValidation = (val: string) => val.length > 8 && val.length < 100;
  const {
    value: enteredCurrentPassword,
    setValue: setEnteredCurrentPassword,
    touched: touchedCurrentPassword,
    setTouched: setTouchedCurrentPassword,
    valid: validCurrentPassword,
    reset: resetCurrentPassword,
  } = useValidation({ validation: currentPasswordValidation });

  // New Password validation
  const newPasswordValidation = (val: string) =>
    val.length >= 8 &&
    val.length < 50 &&
    // eslint-disable-next-line
    /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(val) &&
    /[a-z]/.test(val) &&
    /[A-Z]/.test(val) &&
    /[0-9]/.test(val);

  const {
    value: enteredNewPassword,
    setValue: setEnteredNewPassword,
    touched: touchedNewPassword,
    setTouched: setTouchedNewPassword,
    valid: validNewPassword,
    reset: resetNewPassword,
  } = useValidation({ validation: newPasswordValidation });

  // Submit
  const dispatch = useAppDispatch();
  const [submited, setSubmited] = useState(false);

  const user = useAppSelector(selectUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validCurrentPassword && validNewPassword) {
      setSubmited(false);
      const res = await dispatch(
        updateUser({
          currentPassword: enteredCurrentPassword,
          newPassword: enteredNewPassword,
          token: user.token,
        })
      );
      if (res.meta.requestStatus === 'rejected') {
        resetCurrentPassword();
        resetNewPassword();
      }
      setSubmited(true);
    }
  };

  // Delete account
  const [openModal, setOpenModal] = useState(false);

  return (
    <Grid
      container
      sx={{
        height: '100vh',
        width: '100%',
        backgroundImage: 'url(https://4kwallpapers.com/images/wallpapers/blue-mountains-foggy-mountain-range-landscape-scenery-5k-4480x2520-5939.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          sx={{
            padding: '1rem',
            width: '500px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4rem',
          }}
        >
          <Typography variant="h4" color="primary.dark">
            Settings
          </Typography>
          <Stack component="form" onSubmit={handleSubmit} direction="column" alignItems="center">
            <Typography variant="h5" color="primary.main">
              Change password
            </Typography>
            <TextField
              margin="normal"
              sx={{ width: '270px' }}
              required
              label="Current Password"
              type="password"
              value={enteredCurrentPassword}
              onChange={(e) => setEnteredCurrentPassword(e.target.value)}
              onBlur={() => setTouchedCurrentPassword(true)}
              error={touchedCurrentPassword && !validCurrentPassword}
              helperText={touchedCurrentPassword && !validCurrentPassword && 'Password is not valid.'}
            />
            <TextField
              margin="normal"
              sx={{ width: '270px' }}
              required
              label="New password"
              type="password"
              value={enteredNewPassword}
              onChange={(e) => setEnteredNewPassword(e.target.value)}
              onBlur={() => setTouchedNewPassword(true)}
              error={touchedNewPassword && !validNewPassword}
              helperText={touchedNewPassword && !validNewPassword && 'Password is not valid.'}
            />
            {user.error && submited && (
              <Typography mt={1} color="error">
                {user.error}
              </Typography>
            )}
            {!user.error && submited && (
              <Typography mt={1} color="success">
                Successfully changed password!
              </Typography>
            )}
            <LoadingButton
              type="submit"
              size="large"
              loading={user.loading}
              disabled={!validCurrentPassword || !validNewPassword}
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
              Change
            </LoadingButton>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" alignSelf="stretch">
            <IconButton color="error" onClick={() => setOpenModal(true)}>
              <DeleteIcon />
            </IconButton>
            <ModalDeleteUser open={openModal} handleClose={() => setOpenModal(false)} />
            <Button
              size="large"
              component={RouterLink}
              to="/dashboard"
              sx={{
                color: 'inherit',
              }}
            >
              Go back
            </Button>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};
