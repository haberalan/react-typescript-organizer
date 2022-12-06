import { LoadingButton } from '@mui/lab';
import { Modal, Fade, Paper, Typography, Backdrop, Stack, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useEffect, useState } from 'react';

import { useValidation } from '../../../hooks/useValidation';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { selectUser } from '../../../../store/user/userSlice';
import { fetchCreateTask, fetchDeleteTask, fetchUpdateTask } from '../../../../store/tasks/tasksSlice';
import { TaskType } from '../../../../types/Task';

interface ModalTaskEditProps {
  item: TaskType;
  open: boolean;
  handleClose: () => void;
}

export const ModalTaskEdit = ({ open, handleClose, item }: ModalTaskEditProps) => {
  // Title validation
  const textValidation = (val: string) => val.trim().length > 3 && val.trim().length < 50;
  const {
    value: enteredText,
    setValue: setEnteredText,
    touched: touchedText,
    setTouched: setTouchedText,
    valid: validText,
  } = useValidation({ validation: textValidation });

  // Hierarchy validation
  const [hierarchy, setHierarchy] = useState<string | number>(item.hierarchy);

  // Handle submit
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validText) {
      setLoading(true);
      setEnteredText('');
      setTouchedText(false);
      handleClose();
      await dispatch(
        fetchUpdateTask({ token: user.token, id: item._id, project_id: item.project_id, item: { text: enteredText, hierarchy: Number(hierarchy) } })
      );

      setLoading(false);
    }
  };

  // Handle delete
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDelete = async () => {
    setLoadingDelete(true);
    await dispatch(fetchDeleteTask({ token: user.token, id: item._id }));
    setLoadingDelete(false);
  };

  useEffect(() => {
    setEnteredText(item.text);
  }, [setEnteredText, item]);

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
              Edit this task
            </Typography>
            <TextField
              margin="normal"
              sx={{ width: '270px' }}
              required
              label="Title"
              value={enteredText}
              onChange={(e) => setEnteredText(e.target.value)}
              onBlur={() => setTouchedText(true)}
              error={touchedText && !validText}
              helperText={touchedText && !validText && 'Text is not valid.'}
            />
            <FormControl>
              <InputLabel id="hierarchy-select-label">Hierarchy</InputLabel>
              <Select
                labelId="hierarchy-select-label"
                id="hierarchy-select"
                value={hierarchy}
                label="Hierarchy"
                onChange={(e) => setHierarchy(e.target.value)}
                sx={{
                  width: '270px',
                }}
              >
                <MenuItem value="0">None</MenuItem>
                <MenuItem value="1">Primary</MenuItem>
                <MenuItem value="2">Secondary</MenuItem>
                <MenuItem value="3">Tertiary</MenuItem>
              </Select>
            </FormControl>
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
                disabled={!validText}
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
