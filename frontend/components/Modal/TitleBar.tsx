import { Grid } from '@mui/material';
import * as moment from 'moment';
import AvatarCell from 'components/atoms/AvatarCell';
import { getTimeRemaining, calcRemainingDaysFromBlock } from 'utils';
import { getCurrencyPath } from 'constants/currencyPaths';

export default function TitleBar({ underlyingTokenSymbol, poolTokenSymbol, epoch, loading }) {
  // TODO: Create and move to a moment utils
  const endDate = moment.unix(parseInt(epoch?.startTimestamp, 10) + parseInt(epoch?.stream?.durationSeconds, 10));
  const diff = endDate.diff(moment.unix(parseInt(epoch?.startTimestamp, 10)), 'days');

  return (
    <Grid mb={5} container item>
      <AvatarCell
        className="empty"
        percentComplete={getTimeRemaining(epoch?.startTimestamp, epoch?.stream?.durationSeconds)}
        primaryText={underlyingTokenSymbol + ' - ' + poolTokenSymbol}
        secondaryText={`${diff} Days - Ends on ${endDate.format('MMM DD, YYYY')} - ${calcRemainingDaysFromBlock(
          epoch?.startTimestamp,
          epoch?.stream?.durationSeconds
        )}`}
        imgUrl={getCurrencyPath(underlyingTokenSymbol)}
        loading={loading}
      />
    </Grid>
  );
}
