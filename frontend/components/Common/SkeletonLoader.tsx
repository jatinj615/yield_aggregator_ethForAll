import React, { ReactNode } from 'react';
import Skeleton, { SkeletonProps } from '@mui/material/Skeleton';
import { SxProps } from '@mui/material';

interface ISkeletonLoaderProps {
  children?: ReactNode;
  height?: number | string;
  sx?: SxProps;
  variant?: SkeletonProps['variant'];
  width?: number | string;
}

export default function SkeletonLoader({ children, ...restProps }: ISkeletonLoaderProps) {
  return <Skeleton {...restProps}>{children}</Skeleton>;
}
