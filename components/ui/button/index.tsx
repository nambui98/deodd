import { Button, ButtonProps, Typography } from "@mui/material";
import React from 'react';
import { useColorModeContext } from "../../../contexts/ColorModeContext";
// import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { Colors } from "constants/index";

interface IProps extends ButtonProps {
  title: any
  active: boolean
}

export const ButtonMain: React.FC<IProps> = ({ title, sx, active, ...props }) => {
  return <Button sx={{
    minHeight: 1,
    borderColor: active ? '#fef156' : '#5a6178',
    color: active ? '#fef156' : '#5a6178',
    fontSize: 16,
    textTransform: 'none',
    fontWeight: 400,
    borderWidth: 1,
    '&:hover': {

      borderWidth: 1,
    },
    ...sx
  }} color="secondary" variant="outlined" {...props}> {title} </Button>
}
// type ButtonProps2 = React.ButtonHTMLAttributes<HTMLButtonElement>;
export const ButtonTertiary: React.FC<ButtonProps> = (props) => {
  return <Button {...props} color="secondary" variant="contained"  > {props.children} </Button>
}
export const ButtonSecond: React.FC<IProps & ButtonProps> = ({ children, onClick, active, sx, ...props }) => {
  return <Button onClick={onClick} color="secondary" variant="outlined" sx={sx} {...props} > {children} </Button>
}
export const ButtonSecondRemex: React.FC<ButtonProps> = (props) => {
  return <Button {...props} color="secondary" variant="contained" > {props.children} </Button>
}
export const ButtonSecondRemex2: React.FC<ButtonProps> = (props) => {
  return <Button {...props} color="secondary" variant="contained" sx={{
    svg: {
      stroke: ''
    }
  }
  } > {props.children} </Button>
}
export const ButtonLoading: React.FC<LoadingButtonProps> = (props) => {
  return <LoadingButton
    {...props}
    sx={{
      width: '100%',
      borderRadius: 2, py: 2, border: '1px solid', color: 'secondary.main', '&:hover': {
        backgroundColor: "secondary.main",
        border: '1px solid',
        borderColor: "secondary.main"
      }, ...props.sx
    }
    }

    variant="outlined"
  >
    {props.children}
  </LoadingButton>
}
export const ButtonLoadingShadow: React.FC<LoadingButtonProps & { active: boolean }> = ({ active, ...props }) => {
  return <LoadingButton
    {...props}
    sx={{
      width: '100%',
      borderRadius: 2,
      py: '13px',
      px: 0,
      transition: ".3s all",
      color: active ? 'secondary.main' : 'primary.main',
      boxShadow: active ? '0px 2px 16px rgba(254, 241, 86, 0.5)' : 'none',
      backgroundColor: "primary.100",
      border: '1px solid transparent',
      borderColor: active ? "secondary.main" : 'transparent',
      svg: {
        fill: active ? Colors.secondaryDark : "#fff"
      },
      '&:hover, &:active, &:focus, &:focus-within': {
        color: 'secondary.main',
        backgroundColor: "primary.100",
        border: '1px solid',
        borderColor: "secondary.main",
        svg: {
          fill: Colors.secondaryDark
        }
      },
      ...props.sx
    }
    }
    variant="outlined"
  >
    {props.children}
  </LoadingButton>
}

export const ButtonFourth: React.FC<ButtonProps & { active: boolean, label: string }> = ({ active, label, ...props }) => {
  return <Button
    variant="outlined"
    sx={{
      bgcolor: active ? "secondary.300" : 'primary.200',
      border: "1px solid",
      color: active ? 'white' : 'dark.60',
      borderColor: active ? "secondary.main" : 'primary.200',
      textTransform: "none",
      fontSize: 14,
      py: 1,
      px: 2,
      '&:hover': {
        border: "1px solid",
      }
    }}
    {...props}
  >
    <Typography variant="body2" fontSize={14}>
      {
        label
      }
    </Typography>
  </Button>

}