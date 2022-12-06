import { Box, Stack, Button, Collapse } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { useState } from 'react';

import { selectTasksPerProject } from '../../../store/tasks/tasksSlice';
import { useAppSelector } from '../../hooks/useRedux';
import { ModalTaskNew } from './modals/ModalTaskNew';

import { TasksListItem } from './TasksListItem';

const styles = {
  overflowY: 'auto',
  padding: '0rem 0.2rem 0.2rem 0',

  '&::-webkit-scrollbar': {
    height: '6px',
    width: '6px',
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

interface TasksListProps {
  project_id: string;
}

export const TasksList = ({ project_id }: TasksListProps) => {
  const [openModal, setOpenModal] = useState(false);

  const tasks = useAppSelector((state) => selectTasksPerProject(state, project_id));

  return (
    <Stack maxHeight={300} spacing={2} sx={styles}>
      <Stack component={TransitionGroup} spacing={2}>
        {tasks.map((task) => (
          <Collapse key={task._id}>
            <TasksListItem item={task} />
          </Collapse>
        ))}
      </Stack>
      <ModalTaskNew open={openModal} handleClose={() => setOpenModal(false)} project_id={project_id} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button sx={{ color: 'primary.dark' }} onClick={() => setOpenModal(true)}>
          ADD TASK
        </Button>
      </Box>
    </Stack>
  );
};
