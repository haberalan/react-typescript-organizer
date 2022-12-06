import { Stack, Button } from '@mui/material';
import { useState } from 'react';

import { selectProjects, selectProjectsLoading } from '../../../store/projects/projectsSlice';
import { selectTasksLoading } from '../../../store/tasks/tasksSlice';
import { useAppSelector } from '../../hooks/useRedux';
import { SkeletonProject } from '../ui/SkeletonProject';
import { ModalProjectNew } from './modals/ModalProjectNew';
import { ProjectsListItem } from './ProjectsListItem';

const styles = {
  overflowX: 'auto',
  marginTop: '2rem',
  paddingBottom: '4rem',

  '&::-webkit-scrollbar': {
    height: '10px',
    width: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    bgcolor: 'primary.dark',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: '3px',
    bgcolor: 'secondary.main',
  },
  '&::-webkit-scrollbar-corner': {
    display: 'none',
  },
};

export const ProjectsList = () => {
  const [openModal, setOpenModal] = useState(false);

  const projectsLoading = useAppSelector(selectProjectsLoading);
  const tasksLoading = useAppSelector(selectTasksLoading);

  const projects = useAppSelector(selectProjects);

  return (
    <>
      <Stack minHeight={460} direction="row" spacing={2} alignItems="start" justifyContent="flex-start" sx={styles}>
        {projectsLoading && tasksLoading && <SkeletonProject />}
        {projectsLoading && tasksLoading && <SkeletonProject />}
        {projectsLoading && tasksLoading && <SkeletonProject />}
        {!projectsLoading && !tasksLoading && projects.items.map((project) => <ProjectsListItem key={project._id} project={project} />)}
        <ModalProjectNew open={openModal} handleClose={() => setOpenModal(false)} />
      </Stack>
      {!projectsLoading && !tasksLoading && (
        <Button
          variant="contained"
          sx={{
            alignSelf: 'center',
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
          }}
          onClick={() => setOpenModal(true)}
        >
          ADD PROJECT
        </Button>
      )}
    </>
  );
};
