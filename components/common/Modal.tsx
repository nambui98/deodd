import { Box, Modal, Typography, styled } from '@mui/material'
import React, { ReactNode } from 'react'

type Props = {
    open: boolean,
    setOpen: Function,
    title: string,
    children: ReactNode
}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #7071b3',
    boxShadow: 24,
    px: 2,
    py: 1,
    borderRadius: "8px"
};
export default function MyModal({ open, setOpen, title, children }: Props) {
    const handleClose = () => setOpen(false);
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="body2" color={"secondary.100"}>
                    {title}
                </Typography>
                <Box id="modal-modal-description">
                    {children}
                </Box>
            </Box>
        </Modal>
    )
}
// const BoxBody = styled(Box)({
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     boxShadow: '0px 0px 40px rgba(112, 113, 179, 0.3)',
//     background: 'background.paper',
//     borderRadius: 8,
//     padding: 24,
//     minWidth: 352
// })