import { Paper, Typography, Stack, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState } from 'react';

import { ProjectType } from '../../../types/Project';
import { TasksList } from './TasksList';
import { ModalProjectEdit } from './modals/ModalProjectEdit';

interface ProjectsListItemProps {
  project: ProjectType;
}

export const ProjectsListItem = ({ project }: ProjectsListItemProps) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Paper sx={{ minWidth: '280px', maxWidth: '280px', padding: '0.4rem', opacity: '84%', bgcolor: 'secondary.light' }}>
      <Stack direction="column" spacing={2}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={4} height={40}>
          <Typography noWrap variant="h6" component="h3">
            {project.title}
          </Typography>
          <IconButton onClick={() => setOpenModal(true)}>
            <MoreHorizIcon />
          </IconButton>
        </Stack>
        <TasksList project_id={project._id} />
      </Stack>
      <ModalProjectEdit open={openModal} handleClose={() => setOpenModal(false)} id={project._id} title={project.title} />
    </Paper>
  );
};
