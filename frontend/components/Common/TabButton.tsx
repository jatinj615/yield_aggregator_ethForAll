// * used for top bar navigation
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const TabButton = styled(Button)(({ theme }) => ({
  boxShadow: 'none',
  textTransform: 'none',
  borderRadius: '1.5rem',
  padding: '12px 16px'
  // backgroundColor: theme.palette.background.default,
  // '&:focus': {
  //   boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)'
  // }
}));

export default TabButton;
