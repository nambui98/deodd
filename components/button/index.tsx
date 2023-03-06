import { TEXT_STYLE } from "../../styles/common"
import { Box, BoxProps, ButtonProps, Stack, styled, Typography } from "@mui/material";
import { useWalletContext } from "../../contexts/WalletContext";
import { propsTheme } from "../../pages/homepage";

interface IProps {
  title: any
  customStyle?: any
  onClick: () => any
  active: boolean
  disable?: boolean
}

export const Button: React.FC<IProps> = ({title, customStyle, onClick, active, disable}) => {
  const {theme} = useWalletContext()
  return <Wrap themeLight={theme === 'light'} onClick={onClick} style={{
    borderColor: theme === 'light' ? active ? '#FC753F' : '#E9EAEF' : active ? '#FEF156' : '#5A6178',
    color: theme === 'light' ? active ? '#FC753F' : '#E9EAEF' : active ? '#FEF156' : '#5A6178',
    pointerEvents: disable === undefined || !disable ? 'auto' : 'none',
    ...customStyle
  }}>
    {title}
  </Wrap>
}

const Wrap = styled(Box)((props: propsTheme) => ({
  border: `2px solid ${props.themeLight ? '#FC753F' : '#FEF156'}`,
  filter: props.themeLight ? 'none' : 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.25))',
  borderRadius: 8,
  ...TEXT_STYLE(16, 700, '#FEF156'),
  textAlign: 'center',
  cursor: 'pointer',
  textTransform: 'uppercase',
  transition: '.3s',
  '&:hover': {
    color: props.themeLight ? '#FFFFFF !important' : 'rgb(28, 27, 62) !important',
    background: props.themeLight ? '#FC753F !important' : '#FEF156 !important',
  },
}))