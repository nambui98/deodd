import { Button, ButtonProps, styled } from "@mui/material";
import { useColorModeContext } from "../../../contexts/ColorModeContext";
import { propsTheme } from "../../../pages/homepage";
import { TEXT_STYLE } from "../../../styles/common";

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
    bordercolor: !darkMode ? active ? '#fc753f' : '#e9eaef' : active ? '#fef156' : '#5a6178',
    color: !darkMode ? active ? '#fc753f' : '#e9eaef' : active ? '#fef156' : '#5a6178',
    pointerevents: disable === undefined || !disable ? 'auto' : 'none',
    ...customStyle
  }} color="secondary" variant="outlined" disabled={disable}>{title}</Button>
}
export const ButtonSecond: React.FC<IProps & ButtonProps> = ({ children, onClick, active, sx, disable }) => {
  return <Button onClick={onClick} color="secondary" variant="outlined" disabled={disable} sx={sx}>{children}</Button>
}
// export const ButtonIcon: React.FC<ButtonProps & { children: React.Component }> = (props) => {
//   const { children } = props;
//   return <Button  {...props}>
//     {children}
//   </Button>
// }
const Wrap = styled(Button)((props: propsTheme) => ({
  filter: props.themeLight ? 'none' : 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.25))',
  ...TEXT_STYLE(16, 700),
  textAlign: 'center',
  cursor: 'pointer',
  textTransform: 'uppercase',
}))