import { useTheme } from '@mui/material';
import Image from 'next/image';
import UnrealLogoLight from 'assets/svg/unreal-light.svg';
import UnrealLogoDark from '/assets/svg/unreal-dark.svg';

const LogoComponent = () => {
  const theme = useTheme();

  if (theme.palette.mode === 'light') {
    return <Image src={UnrealLogoLight} alt="unreal app logo in light theme" height="40px" width="195px" />;
  } else {
    return <Image src={UnrealLogoDark} alt="unreal app logo in dark theme" height="40px" width="195px" />;
  }
};

export default LogoComponent;
