import * as React from 'react';
import type { NextPage } from 'next';
import { Box, useTheme } from '@mui/material';
import MaxInput from 'components/Common/Maxinput';

const DemoTabs: NextPage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        height: '100vh',
        padding: '1rem',
        boxSizing: 'border-box'
      }}
    >
      <Box
        sx={{
          width: theme.typography.pxToRem(500)
        }}
      >
        <MaxInput
          id="demo"
          primaryText="For xYzvDAI"
          secondaryText="Balance: 0.0023 DAI"
          value="0"
          error={false}
          handleInput={() => {}}
          handleClickMaxBtn={() => {}}
        />
      </Box>
    </Box>
  );
};

export default DemoTabs;
