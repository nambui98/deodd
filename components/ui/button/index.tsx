import { Button, ButtonProps } from "@mui/material";
import React from 'react';
import { useColorModeContext } from "../../../contexts/ColorModeContext";
// import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { Colors } from "constants/index";

interface IProps {
  title: any
  customStyle?: any
  onClick: () => any
  active: boolean
  disable?: boolean
}

export const ButtonMain: React.FC<IProps> = ({ title, customStyle, onClick, active, disable }) => {
  const { darkMode } = useColorModeContext();
  return <Button onClick={onClick} sx={{
    minHeight: 1,
    borderColor: !darkMode ? active ? '#fc753f' : '#e9eaef' : active ? '#fef156' : '#5a6178',
    color: !darkMode ? active ? '#fc753f' : '#e9eaef' : active ? '#fef156' : '#5a6178',
    pointerEvents: disable === undefined || !disable ? 'auto' : 'none',
    textTransform: 'uppercase',
    fontSize: 16,
    ...customStyle
  }} color="secondary" variant="outlined" disabled={disable} > {title} </Button>
}
// type ButtonProps2 = React.ButtonHTMLAttributes<HTMLButtonElement>;
export const ButtonTertiary: React.FC<ButtonProps> = (props) => {
  return <Button {...props} color="secondary" variant="outlined" > {props.children} </Button>
}
export const ButtonSecond: React.FC<IProps & ButtonProps> = ({ children, onClick, active, sx, disable }) => {
  return <Button onClick={onClick} color="secondary" variant="outlined" disabled={disable} sx={sx} > {children} </Button>
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
    }
    }
    variant="outlined"
  >
    {props.children}
  </LoadingButton>
}

