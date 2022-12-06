import { LoadingButton } from '@mui/lab';
import { Modal, Fade, Paper, Typography, Backdrop, Stack, TextField } from '@mui/material';
import { useState } from 'react';

import { useValidation } from '../../../hooks/useValidation';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { fetchCreateProject } from '../../../../store/projects/projectsSlice';
import { selectUser } from '../../../../store/user/userSlice';

interface ModalProjectNewProps {
  open: boolean;
  handleClose: () => void;
}

export const ModalProjectNew = ({ open, handleClose }: ModalProjectNewProps) => {
  // Title validation
  const titleValidation = (val: string) => val.trim().length > 3 && val.trim().length < 50;
  const {
    value: enteredTitle,
    setValue: setEnteredTitle,
    touched: touchedTitle,
    setTouched: setTouchedTitle,
    valid: validTitle,
  } = useValidation({ validation: titleValidation });

  // Handle submit
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validTitle) {
      setLoading(true);
      setEnteredTitle('');
      setTouchedTitle(false);
      handleClose();
      await dispatch(fetchCreateProject({ token: user.token, title: enteredTitle }));

      setLoading(false);
    }
  };

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
              Add new project
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
              Add
            </LoadingButton>
          </Stack>
        </Paper>
      </Fade>
    </Modal>
  );
};
