import * as React from 'react';
import type { NextPage } from 'next';
import { StyledTab, StyledTabs } from 'components/Common/Tabs';
import { Box, useTheme } from '@mui/material';

const DemoTabs: NextPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        height: '100vh',
        padding: '1rem'
      }}
    >
      <StyledTabs sx={{ width: 'fit-content' }} value={value} onChange={handleChange} aria-label="styled tabs example">
        <StyledTab label="BUY" />
        <StyledTab label="SELL" />
        <StyledTab label="ADD LP" />
        <StyledTab label="REMOVE LP" />
      </StyledTabs>
    </Box>
  );
};

export default DemoTabs;
