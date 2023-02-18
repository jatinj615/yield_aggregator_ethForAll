import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export default function PortfolioIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 25 24">
      <path d="M0.828613 2C0.828613 0.895432 1.72404 0 2.82861 0H14.4002C14.9306 0 15.4393 0.210714 15.8144 0.585786L20.0286 4.8L24.2428 9.01421C24.6179 9.38929 24.8286 9.89799 24.8286 10.4284V22C24.8286 23.1046 23.9332 24 22.8286 24H11.257C10.7266 24 10.2179 23.7893 9.84283 23.4142L5.62861 19.2L1.4144 14.9858C1.03933 14.6107 0.828613 14.102 0.828613 13.5716V2Z" />
    </SvgIcon>
  );
}
