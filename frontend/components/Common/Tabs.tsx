import { Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';

interface StyledTabProps {
  label: string;
}

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
))(({ theme }) => ({
  backgroundColor: theme.unreal.tab.backgroundColor,
  border: `1px solid ${theme.unreal.tab.borderColor}`,
  padding: theme.typography.pxToRem(6),
  borderRadius: theme.typography.pxToRem(32),
  '& .MuiTabs-flexContainer': {
    columnGap: theme.spacing(1)
  },
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: '100%'
  },
  '& .MuiTabs-indicatorSpan': {
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.typography.pxToRem(32)
  }
}));

const StyledTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.pxToRem(15),
  borderRadius: theme.typography.pxToRem(32),
  zIndex: 1,
  '&.Mui-selected': {
    color: theme.palette.primary.contrastText
  },
  '&.Mui-focusVisible': {
    // backgroundColor: 'rgba(100, 95, 228, 0.32)'
  }
}));

export { StyledTab, StyledTabs };
