import { Box, Modal, styled } from "@mui/material"
import { useWalletContext } from "../../contexts/WalletContext";
import { propsTheme } from "../../pages/homepage";
import { useColorModeContext } from "../../contexts/ColorModeContext";

interface IProps {
  status: boolean;
  body: any
  handleClose: () => any
  customWidth?: any
}

export const Popup: React.FC<IProps> = ({ status, body, handleClose, customWidth }) => {
  const { darkMode } = useColorModeContext()
  return (
    <Modal
      open={status}
      onClose={handleClose}
      sx={{ border: 'none' }}
    >
      <BoxBody themelight={!darkMode} sx={customWidth ? customWidth : {}}>
        {body}
      </BoxBody>
    </Modal>
  )
}

const BoxBody = styled(Box)((props: propsTheme) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: '0px 0px 40px rgba(112, 113, 179, 0.3)',
  background: props.themelight ? '#FFFFFF' : '#181536',
  borderRadius: 8,
  padding: 24,
  minWidth: 352
}))