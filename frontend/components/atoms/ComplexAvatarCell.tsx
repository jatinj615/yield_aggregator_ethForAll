import React from 'react';
import { Box, Button, Avatar, ListItem, ListItemAvatar, ListItemText, Typography, useTheme } from '@mui/material';
import LinearProgressWithLabel from 'components/atoms/LinearProgress';
import TextCell from './TextCell';
import { intlFormatNumber } from 'utils';
import { numberConstants } from 'utils/constants';

const ComplexAvatarCell = (props: any): JSX.Element => {
  const { isOwnership, isForPools, apr, apy, primaryText, secondaryText, percentComplete, imgUrl, tertiaryText } =
    props;
  const theme = useTheme();

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
        <ListItem sx={{ padding: 0 }} alignItems="center">
          <ListItemAvatar>
            <Avatar
              sx={{ width: theme.spacing(7), height: theme.spacing(7), marginRight: theme.spacing(1) }}
              alt={primaryText}
              // TODO: Add a local image
              src={imgUrl}
            />
          </ListItemAvatar>
          <ListItemText
            sx={{
              height: theme.spacing(8),
              width: theme.spacing(7),
              marginLeft: `${theme.spacing(1)}px`,
              marginTop: `${theme.spacing(2)}px`
            }}
            primary={
              <Typography
                sx={{
                  color: theme.palette.text.primary,
                  fontSize: theme.spacing(2),
                  fontWeight: 'bold'
                }}
              >
                {primaryText}
              </Typography>
            }
            secondary={
              <Button
                sx={{ height: theme.spacing(3), borderRadius: theme.spacing(2) }}
                variant="contained"
                color="primary"
              >
                {secondaryText}
              </Button>
            }
          />
        </ListItem>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: '2%'
          }}
        >
          {isOwnership && !isForPools && (
            <>
              <span style={{ margin: '3%' }}>
                {' '}
                <TextCell texts={[`${intlFormatNumber(apr.dp(2, 1).toString(), 2)}%`, 'yearly']} />
              </span>
              <span style={{ margin: '3%' }}>
                {' '}
                <TextCell
                  texts={[
                    `${intlFormatNumber(apr.div(numberConstants.monthsPerYear).dp(2, 1).toString(), 2)}%`,
                    'monthly'
                  ]}
                />
              </span>
              <span style={{ margin: '3%' }}>
                {' '}
                <TextCell
                  texts={[`${intlFormatNumber(apr.div(numberConstants.daysPerYear).dp(2, 1).toString(), 2)}%`, 'daily']}
                />
              </span>
            </>
          )}
          {!isOwnership && !isForPools && (
            <span style={{ margin: '3%' }}>
              <TextCell texts={[apy]} />
            </span>
          )}
        </div>
      </Box>
      <LinearProgressWithLabel value={percentComplete} message={tertiaryText} />
    </>
  );
};

export default ComplexAvatarCell;
