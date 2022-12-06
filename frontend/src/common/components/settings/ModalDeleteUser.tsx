import { LoadingButton } from '@mui/lab';
import { Modal, Fade, Paper, Typography, Backdrop, Stack } from '@mui/material';

import { deleteUser, selectUser } from '../../../store/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

interface ModalDeleteUserProps {
  open: boolean;
  handleClose: () => void;
}

export const ModalDeleteUser = ({ open, handleClose }: ModalDeleteUserProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleDelete = async () => {
    await dispatch(deleteUser({ token: user.token }));
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
              Are you sure?
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              You can't undo this action.
            </Typography>
            <LoadingButton color="error" variant="contained" onClick={handleDelete} loading={user.loading}>
              Delete account
            </LoadingButton>
          </Stack>
        </Paper>
      </Fade>
    </Modal>
  );
};
