import * as React from 'react';
import { Box, Typography } from '@mui/material';

const TextCell = (props: any): JSX.Element => {
  const { texts = [] } = props;

  return (
    <Box>
      <Typography sx={{ textTransform: 'capitalize' }} variant="body1" align="center" component="div">
        {texts[0]}
      </Typography>
      <Typography sx={{ textTransform: 'capitalize' }} variant="subtitle2" align="center" component="div">
        {texts[1]}
      </Typography>
    </Box>
  );
};

export default TextCell;
