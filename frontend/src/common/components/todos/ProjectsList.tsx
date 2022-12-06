import { Stack, Button, Collapse } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { useState } from 'react';

import { selectProjects } from '../../../store/projects/projectsSlice';
import { useAppSelector } from '../../hooks/useRedux';
import { ModalProjectNew } from './modals/ModalProjectNew';
import { ProjectsListItem } from './ProjectsListItem';
import { SkeletonProject } from '../ui/SkeletonProject';

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

interface ProjectsListProps {
  loading: boolean;
}

export const ProjectsList = ({ loading }: ProjectsListProps) => {
  const [openModal, setOpenModal] = useState(false);

  const projects = useAppSelector(selectProjects);

  return (
    <>
      <Stack component={TransitionGroup} minHeight={460} direction="row" spacing={2} alignItems="start" justifyContent="flex-start" sx={styles}>
        {!loading &&
          projects.items.map((project) => (
            <Collapse key={project._id}>
              <ProjectsListItem project={project} />
            </Collapse>
          ))}
        {loading && (
          <>
            <SkeletonProject />
            <SkeletonProject />
            <SkeletonProject />
          </>
        )}
      </Stack>
      <ModalProjectNew open={openModal} handleClose={() => setOpenModal(false)} />
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
    </>
  );
};
