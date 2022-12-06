import { Container, Box, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Lottie from 'react-lottie-player';

import lottieJson from '../common/assets/not-found.json';

export const NotFound = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box component={Lottie} loop animationData={lottieJson} play height={500} />
      <Typography
        sx={{
          typography: {
            lg: 'h5',
            sx: 'h6',
          },
          textAlign: 'center',
        }}
      >
        The page you are looking for doesn't exist.
      </Typography>
      <Link
        component={RouterLink}
        to="/"
        sx={{
          color: 'primary.main',
          textDecoration: 'none',
          fontSize: '1.6rem',
        }}
      >
        Go to home
      </Link>
    </Container>
  );
};
