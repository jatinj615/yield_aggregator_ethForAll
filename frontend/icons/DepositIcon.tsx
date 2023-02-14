import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export default function DepositIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 27 24">
      <path d="M9.86612 17.7058C9.72611 17.1634 9.21626 16.7794 8.65633 16.7962C8.5712 16.7987 8.48575 16.8 8.4 16.8C3.76081 16.8 0 13.0392 0 8.4C0 3.76081 3.76081 0 8.4 0C12.312 0 15.5994 2.67419 16.5339 6.29424C16.6739 6.83664 17.1837 7.22062 17.7437 7.20384C17.8288 7.20128 17.9142 7.2 18 7.2C22.6392 7.2 26.4 10.9608 26.4 15.6C26.4 20.2392 22.6392 24 18 24C14.088 24 10.8006 21.3258 9.86612 17.7058Z" />
    </SvgIcon>
  );
}
