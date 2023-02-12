import * as React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import ProgressBar from 'components/Common/ProgressBar';

function LinearProgressWithLabel({ message, value }: { message?: string; value?: number }) {
  const theme = useTheme();

  return (
    <>
      {message}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: message ? 5 : 2 }}>
        <Box sx={{ width: '100%', ml: message ? 1 : 9, mt: message ? -8 : -5 }}>
          <ProgressBar variant="determinate" value={value} theme={theme} />
        </Box>
        <Box sx={{ minWidth: 35, ml: 1, mt: message ? -8 : -5 }}>
          <Typography variant="body2">{`${Math.round(value)}%`}</Typography>
        </Box>
      </Box>
    </>
  );
}

export default LinearProgressWithLabel;
