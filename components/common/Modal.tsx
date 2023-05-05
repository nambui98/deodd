import { Box, BoxProps, Modal, Typography, styled } from '@mui/material'
import React, { ReactNode } from 'react'
import { CloseSquareIcon2 } from 'utils/Icons'

type Props = BoxProps & {
    open: boolean,
    setOpen: Function,
    haveIconClosed?: boolean,
    title?: string,
    children: ReactNode
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    bgcolor: 'primary.200',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
    px: 3,
    py: 3,
    borderRadius: "8px"
};

export default function MyModal({ open, setOpen, title, haveIconClosed, children, sx }: Props) {
    const handleClose = () => setOpen(false);
    return (
        <Modal
            open={open}
            onClose={handleClose}
            disableScrollLock
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                '& .MuiModal-backdrop': {
                    backgroundColor: "#5f5c5c1d"
                }
            }}
        >
            <Box sx={{ ...style, ...sx } as any}>
                <Typography id="modal-modal-title" variant="body2" color={"secondary.100"}>
                    {title}
                </Typography>
                <Box id="modal-modal-description">
                    {children}
                </Box>
                {
                    haveIconClosed && <Box sx={{ cursor: 'pointer' }} onClick={handleClose} position={'absolute'} top={'16px'} right={'16px'}>
                        <CloseSquareIcon2 />
                    </Box>

                }
            </Box>

        </Modal >
    )
}
