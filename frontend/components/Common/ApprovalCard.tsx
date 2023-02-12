import React from 'react';
import { constantStrings } from 'utils/constants';
import { Button, Card, CardActions, CardContent, Collapse, Typography, useTheme } from '@mui/material';
import { alpha, darken } from '@mui/material/styles';
import Loader from 'components/Common/Loader';

interface ApprovalCardProps {
  approvalPending: boolean;
  approvalMessage: string;
  handleApprove: () => void;
  loading: boolean;
  customStyles?: any;
}

export default function ApprovalCard({
  approvalPending,
  approvalMessage,
  handleApprove,
  loading,
  customStyles = {}
}: ApprovalCardProps) {
  const theme = useTheme();

  return (
    <Collapse in={approvalPending} sx={customStyles}>
      <Card
        sx={{
          backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        }}
        variant="outlined"
      >
        <CardContent>
          <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 500 }}>
            {constantStrings.walletApprovalRequired}
          </Typography>
          <Typography sx={{ mt: 1, color: theme.palette.secondary.contrastText, fontWeight: 50 }}>
            {approvalMessage}
          </Typography>
        </CardContent>
        <CardActions sx={{ p: 2, pt: 0 }}>
          <Button
            variant="outlined"
            disabled={loading}
            sx={{
              color: theme.palette.primary.main,
              borderColor: darken(theme.palette.primary.main, 0.4),
              '&:hover': {
                color: theme.palette.primary.main,
                borderColor: darken(theme.palette.primary.main, 0.4)
              }
            }}
            onClick={handleApprove}
            fullWidth
          >
            {loading ? <Loader size={3} color="inherit" /> : constantStrings.approve}
          </Button>
        </CardActions>
      </Card>
    </Collapse>
  );
}
