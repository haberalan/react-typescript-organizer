import { Grid, Box, Avatar, Typography, Paper, Link, Stack } from '@mui/material';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import Lottie from 'react-lottie-player';

import lottieJson from '../common/assets/additional-primary.json';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export const AuthLayout = () => {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid item xs={12} md={5} lg={3} component={Paper} elevation={6} square>
        <Stack direction="column" justifyContent="center" alignItems="center" mt={2}>
          <Link
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                color: 'primary.dark',
              },
            }}
          >
            <Typography
              component="h1"
              sx={{
                typography: {
                  xs: 'h4',
                  sm: 'h3',
                },
              }}
            >
              Organizer
            </Typography>
          </Link>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Outlet />
          </Box>
        </Stack>
      </Grid>
      <Grid
        item
        xs={false}
        sx={{
          display: {
            xs: 'none',
            md: 'flex',
          },
          justifyContent: 'center',
          alignItems: 'center',
        }}
        md={7}
        lg={9}
      >
        <Box component={Lottie} loop animationData={lottieJson} play height={450} />
      </Grid>
    </Grid>
  );
};
