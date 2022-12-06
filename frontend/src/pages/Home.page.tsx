import { Container, Button, Typography, Link, Stack, Box, Grid } from '@mui/material';
import Lottie from 'react-lottie-player';
import { Link as RouterLink } from 'react-router-dom';

import lottieJson1 from '../common/assets/home-primary.json';
import lottieJson2 from '../common/assets/home-secondary.json';
import { useAppSelector } from '../common/hooks/useRedux';
import { selectUser } from '../store/user/userSlice';

export const Home = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <Container>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
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
          <Button
            component={RouterLink}
            to={user.token ? '/dashboard' : '/auth/login'}
            size="large"
            sx={{
              padding: '0 0.8rem',
              fontSize: {
                xs: '1.2rem',
                sm: '1.6rem',
              },
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
            }}
          >
            {user.token ? 'Dashboard' : 'Login'}
          </Button>
        </Stack>
        <Grid container alignItems="center" mt={10} spacing={2}>
          <Grid item xs={12} lg={6} mt={10}>
            <Typography
              component="h2"
              sx={{
                typography: {
                  xs: 'h5',
                  sm: 'h3',
                },
                textAlign: {
                  xs: 'center',
                  lg: 'left',
                },
              }}
            >
              We were waiting for you!
            </Typography>
            <Typography
              component="p"
              color="secondary.dark"
              sx={{
                typography: {
                  xs: 'subtitle2',
                  sm: 'h6',
                  lg: 'h5',
                },
                textAlign: {
                  xs: 'center',
                  lg: 'left',
                },
              }}
            >
              You will change your life with this organization app.
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box component={Lottie} loop animationData={lottieJson1} play height={400} />
          </Grid>
        </Grid>
      </Container>
      <Stack bgcolor="secondary.light" mt={20} justifyContent="center" alignItems="center" spacing={6} p={8}>
        <Typography
          component="h3"
          sx={{
            textAlign: 'center',
            typography: {
              xs: 'h6',
              sm: 'h5',
              lg: 'h4',
            },
          }}
        >
          It is easier than you think!
        </Typography>
        <Typography
          component="p"
          sx={{
            textAlign: 'justify',
            width: {
              xs: '100%',
              sm: '50%',
            },
            typography: {
              xs: 'subtitle2',
              sm: 'h6',
              lg: 'h5',
            },
          }}
        >
          Have you ever felt a lack of organization and that the day is slipping through your hands? Suddenly you discover some subscription that you have been
          paying for a year? With this app, none of the above things will happen again. At least as long as you don't forget about us!
        </Typography>
      </Stack>
      <Stack direction="column" justifyContent="center" alignItems="center" mt={10} spacing={2}>
        <Box component={Lottie} loop animationData={lottieJson2} play height={400} />
        <Typography
          component="h3"
          sx={{
            textAlign: 'center',
            typography: {
              xs: 'h6',
              sm: 'h5',
              lg: 'h4',
            },
          }}
        >
          Try it is free and always will be!
        </Typography>
        <Button
          component={RouterLink}
          to="/auth/signup"
          size="large"
          sx={{
            padding: '0 0.8rem',
            fontSize: {
              xs: '1.2rem',
              sm: '1.6rem',
            },
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
          }}
        >
          Signup
        </Button>
      </Stack>
      <Stack mt={10} alignItems="center">
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
          <Typography variant="h5" component="p">
            &copy; 2022 Alan Haber
          </Typography>
        </Link>
      </Stack>
    </>
  );
};
