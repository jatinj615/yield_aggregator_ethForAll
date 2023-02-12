import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, useTheme, Grid, Divider, Stack, Button, TextField, Typography } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& input': {
      fontSize: theme.typography.pxToRem(18),
      color: theme.palette.text.primary,
      lineHeight: theme.typography.pxToRem(21),
      letterSpacing: theme.typography.pxToRem(0.385075),
      padding: `${theme.spacing(1)} 0`,
      textAlign: 'right'
    },
    '& input[type=number]': {
      MozAppearance: 'textfield'
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      WebkitAppearance: 'none',
      margin: 0
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0
    },
    '& fieldset': {
      background: 'transparent',
      border: 'none',
      borderRadius: 0,
      padding: 0,
      width: theme.typography.pxToRem(150)
    },
    '&.Mui-focused fieldset': {
      outline: 'none'
    }
  }
}));

interface IMaxInputProps {
  id: string;
  primaryText?: string | JSX.Element;
  secondaryText?: string | JSX.Element;
  disabled?: boolean;
  value: string;
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
  handleInput: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  handleClickMaxBtn: React.MouseEventHandler<HTMLButtonElement>;
  customStyles?: any;
}

const MaxInput = ({
  id,
  primaryText,
  secondaryText,
  disabled = false,
  value,
  error = false,
  errorMessage,
  placeholder,
  handleInput,
  handleClickMaxBtn,
  customStyles = {},
  ...restProps
}: IMaxInputProps) => {
  const theme = useTheme();
  const ref = React.useRef<HTMLInputElement>();

  const handleWheel = (e: any) => {
    e.target.blur();
  };

  return (
    <>
      <Grid
        container
        p={3}
        alignItems="center"
        justifyContent="space-between"
        sx={{
          bgcolor: theme.unreal.maxinput.backgroundColor,
          position: 'relative',
          width: '100%',
          borderRadius: theme.typography.pxToRem(8),
          // on error show a different red color
          border: `2px solid ${error ? theme.palette.error.light : theme.unreal.maxinput.borderColor}`,
          ...customStyles
        }}
        onClick={() => {
          ref?.current?.focus();
        }}
      >
        <Grid item xs={5}>
          {/* Incase of an error we'll not show this block */}
          {error ? (
            <></>
          ) : (
            <Stack spacing={1}>
              <Box
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: theme.typography.fontWeightRegular,
                  fontSize: theme.typography.pxToRem(16),
                  lineHeight: theme.typography.pxToRem(18),
                  letterSpacing: theme.typography.pxToRem(0.385075)
                }}
              >
                {primaryText}
              </Box>
              <Box
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: theme.typography.fontWeightRegular,
                  fontSize: theme.typography.pxToRem(14),
                  lineHeight: theme.typography.pxToRem(16),
                  letterSpacing: theme.typography.pxToRem(0.385075)
                }}
              >
                {secondaryText}
              </Box>
            </Stack>
          )}
        </Grid>
        <Grid item xs={6}>
          <Stack direction="row">
            <StyledTextField
              id={`max-input-${id}`}
              type="number"
              placeholder={placeholder}
              disabled={disabled}
              error={error}
              variant="outlined"
              value={value}
              onChange={handleInput}
              onWheel={handleWheel}
              inputProps={{ min: 0 }}
              fullWidth
              {...restProps}
            />
            <Divider sx={{ ml: 2, mr: 1 }} orientation="vertical" variant="middle" flexItem />
            <Button id={`max-input-btn-${id}`} variant="text" disabled={disabled} onClick={handleClickMaxBtn}>
              MAX
            </Button>
          </Stack>
        </Grid>
        {
          // for errors show this icon
          error ? (
            <ErrorIcon
              sx={{
                position: 'absolute',
                left: 32,
                top: '50%',
                transform: 'translateY(-50%)',
                color: theme.palette.error.dark
              }}
            />
          ) : (
            <></>
          )
        }
      </Grid>
      {/* error text */}
      {error ? (
        <Typography
          variant="overline"
          display="block"
          gutterBottom
          sx={{
            color: theme.palette.error.main
          }}
        >
          {errorMessage}
        </Typography>
      ) : (
        <></>
      )}
    </>
  );
};

export default MaxInput;
