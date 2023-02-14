import { SyntheticEvent, useEffect, useState } from 'react';
import { Grid, Link as MUILink } from '@mui/material';
import Link from 'next/link';
import { StyledTab, StyledTabs } from 'components/Common/Tabs';

interface ActionFilterProps {
  onSelected: (arg1) => void;
  showAddLiquidity: boolean;
  showRemoveLiquidity: boolean;
  showSell: boolean;
  isTermComplete: boolean;
  isOwnershipPool: boolean;
  goToPoolID: string;
}

const selectedValue = (showAddLiquidity, showRemoveLiquidity, isTermComplete, showSell) => {
  if (showRemoveLiquidity || isTermComplete) {
    return 'Remove LP';
  } else if (showAddLiquidity) {
    return 'Add LP';
  } else if (showSell) {
    return 'Sell';
  } else {
    return 'Buy';
  }
};

export default function ActionFilter({
  onSelected,
  showAddLiquidity,
  showRemoveLiquidity,
  showSell,
  isTermComplete,
  isOwnershipPool,
  goToPoolID
}: ActionFilterProps) {
  const [selected, setSelected] = useState(
    selectedValue(showAddLiquidity, showRemoveLiquidity, isTermComplete, showSell)
  );
  const list = isTermComplete ? ['Remove LP'] : ['Buy', 'Sell', 'Add LP', 'Remove LP'];

  const handleChange = (e: SyntheticEvent<Element, Event>, item: number) => {
    setSelected(list[item]);
  };

  useEffect(() => {
    onSelected(selected);
  }, [selected]);

  useEffect(() => {
    setSelected(selectedValue(showAddLiquidity, showRemoveLiquidity, isTermComplete, showSell));
  }, [showAddLiquidity, showRemoveLiquidity, isTermComplete, showSell]);

  const value = list.indexOf(selected) !== -1 ? list.indexOf(selected) : 0;

  return (
    <>
      <Grid item>
        <StyledTabs
          sx={{ width: 'fit-content' }}
          value={value}
          onChange={handleChange}
          aria-label="styled tabs action filter"
        >
          {list.map((item, index) => (
            <StyledTab key={index} label={item} />
          ))}
        </StyledTabs>
      </Grid>
      <Grid item>
        <Link href={goToPoolID ? `/pool/${goToPoolID}` : '/pools'} passHref>
          <MUILink underline="none">{isOwnershipPool ? 'Go to Yield Pool' : 'Go to Ownership Pool'}</MUILink>
        </Link>
      </Grid>
    </>
  );
}
