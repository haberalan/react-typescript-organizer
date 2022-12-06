import { Box, Stack, Typography } from '@mui/material';
import Lottie from 'react-lottie-player';
import { useAppSelector } from '../common/hooks/useRedux';
import { selectUser } from '../store/user/userSlice';

import lottieJson from '../common/assets/home-secondary.json';

export const Dashboard = () => {
  const user = useAppSelector(selectUser);

  return (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <Box component={Lottie} loop animationData={lottieJson} play height={500} />
      <Typography variant="h4" color="primary.dark">
        Welcome <strong>{user.user?.email}</strong>
      </Typography>
    </Stack>
  );
};
