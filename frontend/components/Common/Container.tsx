import { Grid } from '@mui/material';
import HeroTitle from './HeroTitle';

export default function Container({ title, subtitle, children }: any) {
  return (
    <Grid className="MuiGrid-item--container" xs container item direction="column" mx="auto" mt={5} pb={2}>
      <Grid item>
        <HeroTitle title={title} subtitle={subtitle} />
      </Grid>
      <Grid container item xs direction="column">
        {children}
      </Grid>
    </Grid>
  );
}
