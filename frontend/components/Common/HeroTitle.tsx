import Typography from '@mui/material/Typography';

export default function HeroTitle({ title, subtitle }: any) {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>
      <Typography>{subtitle}</Typography>
    </>
  );
}
