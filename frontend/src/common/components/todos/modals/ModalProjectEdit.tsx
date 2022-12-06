import { LoadingButton } from '@mui/lab';
import { Modal, Fade, Paper, Typography, Backdrop, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

import { useValidation } from '../../../hooks/useValidation';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { fetchDeleteProject, fetchUpdateProject } from '../../../../store/projects/projectsSlice';
import { selectUser } from '../../../../store/user/userSlice';

interface ModalProjectEditProps {
  id: string;
  title: string;
  open: boolean;
  handleClose: () => void;
}

export const ModalProjectEdit = ({ id, title, open, handleClose }: ModalProjectEditProps) => {
  // Title validation
  const titleValidation = (val: string) => val.trim().length > 3 && val.trim().length < 50;
  const {
    value: enteredTitle,
    setValue: setEnteredTitle,
    touched: touchedTitle,
    setTouched: setTouchedTitle,
    valid: validTitle,
    reset: resetTitle,
  } = useValidation({ validation: titleValidation });

  // Handle submit
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validTitle) {
      setLoading(true);
      const res = await dispatch(fetchUpdateProject({ token: user.token, id, title: enteredTitle }));
      if (res.meta.requestStatus === 'rejected') {
        resetTitle();
      } else {
        handleClose();
      }

      setLoading(false);
    }
  };

  // Handle delete
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDelete = async () => {
    setLoadingDelete(true);
    await dispatch(fetchDeleteProject({ token: user.token, id }));
    setLoadingDelete(false);
  };

  useEffect(() => {
    setEnteredTitle(title);
  }, [setEnteredTitle, title]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 200,
      }}
    >
      <Fade in={open}>
        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={4}>
            <Typography variant="h4" component="h2">
              Edit project
            </Typography>
            <TextField
              margin="normal"
              sx={{ width: '270px' }}
              required
              label="Title"
              value={enteredTitle}
              onChange={(e) => setEnteredTitle(e.target.value)}
              onBlur={() => setTouchedTitle(true)}
              error={touchedTitle && !validTitle}
              helperText={touchedTitle && !validTitle && 'Title is not valid.'}
            />
            <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
              <LoadingButton
                size="large"
                loading={loadingDelete}
                variant="contained"
                color="error"
                onClick={handleDelete}
                sx={{
                  padding: '0 0.8rem',
                  mt: 3,
                  mb: 2,
                  fontSize: '1.2rem',
                  color: 'secondary.light',
                  borderRadius: '10px',
                  transition: 'all 0.1s ease-in-out',
                  boxShadow: '0px 4px 0px 0px #244f5d',
                  '&:hover': {
                    bgcolor: 'error.dark',
                    transform: 'translateY(1px)',
                    boxShadow: '0px 3px 0px 0px #244f5d',
                  },
                }}
              >
                Delete
              </LoadingButton>
              <LoadingButton
                type="submit"
                size="large"
                loading={loading}
                disabled={!validTitle}
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
                Edit
              </LoadingButton>
            </Stack>
          </Stack>
        </Paper>
      </Fade>
    </Modal>
  );
};
