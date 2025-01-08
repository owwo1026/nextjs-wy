'use client';

import { Alert, CircularProgress, Stack } from '@mui/material';
import Verify from './Verify';
import { Suspense, useState } from 'react';

export default function VerificationPage() {
  const [error, setError] = useState('');
  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        sx={{
          pt: 4,
        }}
      >
        {!error && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
      </Stack>
      <Suspense fallback={<></>}>
        <Verify setError={setError} />
      </Suspense>
    </>
  );
}
