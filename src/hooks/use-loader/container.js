'use client';

import { CircularProgress, Backdrop } from '@mui/material';
import { useLoader } from '@/hooks/use-loader/use-loader';

export default function GlobalLoader() {
  const { isLoading } = useLoader();

  return (
    <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
