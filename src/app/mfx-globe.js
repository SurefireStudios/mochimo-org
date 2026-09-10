
import { lazy, Suspense } from 'react';
import { Box } from '@mui/material';

const NetworkGlobe = lazy(() => import('./component/NetworkGlobe'));

export default function Network ({ type }) {
  const boxSX = {
    top: 0,
    left: 0,
    right: 0,
    height: '100vh',
    overflow: 'hidden',
    position: 'absolute'
  };

  return (
    <Box sx={boxSX}>
      <Suspense fallback={null}>
        <NetworkGlobe mfx />
      </Suspense>
    </Box>
  );
}
