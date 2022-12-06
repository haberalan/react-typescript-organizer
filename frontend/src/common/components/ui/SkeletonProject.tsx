import { Paper, Stack, Skeleton } from '@mui/material';

const SkeletonTask = () => {
  return (
    <Paper sx={{ padding: '0.2rem 0.4rem' }}>
      <Stack direction="column" spacing={1}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ height: '30px' }}>
          <Skeleton width={160} sx={{ bgcolor: 'primary.light' }} />
        </Stack>
        <Skeleton width={100} sx={{ bgcolor: 'primary.light' }} />
      </Stack>
    </Paper>
  );
};

export const SkeletonProject = () => {
  return (
    <Paper sx={{ minWidth: '280px', maxWidth: '280px', padding: '0.4rem', opacity: '84%', bgcolor: 'secondary.light' }}>
      <Stack direction="column" spacing={2}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={4} height={40}>
          <Skeleton width={200} sx={{ bgcolor: 'primary.light' }} />
        </Stack>
        <Stack maxHeight={300} spacing={2}>
          <SkeletonTask />
          <SkeletonTask />
          <SkeletonTask />
        </Stack>
      </Stack>
    </Paper>
  );
};
