import * as React from 'react';
import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Theme, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import ProgressBar from 'components/Common/ProgressBar';
import SkeletonLoader from 'components/Common/SkeletonLoader';

const PrimaryStyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: theme.spacing(2),
  fontWeight: theme.typography.fontWeightBold,
  textOverflow: 'ellipsis',
  wordWrap: 'break-word'
}));

const SecondaryStyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textOverflow: 'ellipsis',
  wordWrap: 'break-word'
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(8),
  height: theme.spacing(8)
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiListItemText-root': {
    height: theme.spacing(8),
    width: theme.spacing(35),
    marginLeft: `${theme.spacing(1)}px`,
    marginTop: `${theme.spacing(2)}px`,
    textOverflow: 'ellipsis',
    wordWrap: 'break-word'
  }
}));

const AvatarCell = (props: any): JSX.Element => {
  const { primaryText, secondaryText, percentComplete, imgUrl, loading } = props;
  const theme: Theme = useTheme();

  return (
    <Box>
      <ListItem sx={{ p: 0 }} alignItems="center">
        <ListItemAvatar sx={{ pr: theme.spacing(4) }}>
          {loading ? (
            <SkeletonLoader variant="circular">
              <StyledAvatar />
            </SkeletonLoader>
          ) : (
            <StyledAvatar alt={primaryText} src={imgUrl} />
          )}
        </ListItemAvatar>
        <StyledListItemText
          primary={
            <PrimaryStyledTypography>{loading ? <SkeletonLoader width="60%" /> : primaryText}</PrimaryStyledTypography>
          }
          secondary={
            <>
              <SecondaryStyledTypography>
                {loading ? <SkeletonLoader width={333} /> : secondaryText}
              </SecondaryStyledTypography>
              <Box sx={{ mt: 1.5 }}>
                {loading ? (
                  <SkeletonLoader />
                ) : (
                  <ProgressBar variant="determinate" value={percentComplete} theme={theme} />
                )}
              </Box>
            </>
          }
          secondaryTypographyProps={{ component: 'div' }}
        />
      </ListItem>
    </Box>
  );
};

export default AvatarCell;
