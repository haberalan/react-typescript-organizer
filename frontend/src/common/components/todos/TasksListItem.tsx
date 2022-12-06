import { Paper, Stack, Typography, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState } from 'react';
import { TaskType } from '../../../types/Task';
import { ModalTaskEdit } from './modals/ModalTaskEdit';

interface TasksListItemProps {
  item: TaskType;
}

const colors = ['transparent', '#ef233c', '#e76f51', '#80b918'];

export const TasksListItem = ({ item }: TasksListItemProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [showEditBtn, setShowEditBtn] = useState(false);

  const handleEnter = () => setShowEditBtn(true);

  const handleLeave = () => setShowEditBtn(false);

  return (
    <Paper sx={{ padding: '0.2rem 0.4rem', borderTop: `3px solid ${colors[item.hierarchy]}` }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Stack direction="column" spacing={1}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ height: '30px' }}>
          <Typography noWrap>{item.text}</Typography>
          <IconButton
            size="small"
            sx={{ display: `${showEditBtn ? '' : 'none'}` }}
            onClick={() => {
              setOpenModal(true);
              handleLeave();
            }}
          >
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </Stack>
        {item.date && <Typography>{item.date.toString()}</Typography>}
      </Stack>

      <ModalTaskEdit open={openModal} handleClose={() => setOpenModal(false)} item={item} />
    </Paper>
  );
};
