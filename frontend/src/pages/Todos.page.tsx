import { Typography, Box, Container } from '@mui/material';
import { useEffect, useCallback, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../common/hooks/useRedux';
import { fetchGetProjects } from '../store/projects/projectsSlice';
import { selectUser } from '../store/user/userSlice';
import { ProjectsList } from '../common/components/todos/ProjectsList';
import { fetchGetTasks } from '../store/tasks/tasksSlice';

export const Todos = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  const [loading, setLoading] = useState(false);

  const fetchProjectsAndTasks = useCallback(() => {
    setLoading(true);
    dispatch(fetchGetProjects({ token: user.token }));
    dispatch(fetchGetTasks({ token: user.token }));
    setLoading(false);
  }, [dispatch, user.token]);

  useEffect(() => {
    fetchProjectsAndTasks();
  }, [fetchProjectsAndTasks]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundImage: 'url(https://4kwallpapers.com/images/wallpapers/blue-mountains-foggy-mountain-range-landscape-scenery-5k-4480x2520-5939.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container sx={{ display: 'flex', flexDirection: 'column', marginTop: '4rem', gap: '2rem' }}>
        <Typography variant="h3" sx={{ alignSelf: 'center', fontWeight: '700' }} color="primary.dark">
          Todos
        </Typography>
        <ProjectsList loading={loading} />
      </Container>
    </Box>
  );
};
