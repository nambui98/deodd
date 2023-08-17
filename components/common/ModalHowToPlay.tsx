import React, { useState } from 'react'
import MyModal from './Modal'
import { Stack, Typography, styled } from '@mui/material'
import { Colors } from 'constants/index'

type Props = {
    open: boolean,
    handleClose: VoidFunction
}

const ModalHowToPlay = () => {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <>

            <Typography variant='h3' sx={{ cursor: 'pointer' }} color="white" fontWeight={600} onClick={() => { setOpen(true) }}>How to play</Typography>
            <MyModal open={open} sx={{ width: "min(100vw - 1rem, 34rem)" }} haveIconClosed iconProps={{ width: 24, color: Colors.secondary }} setOpen={setOpen}>
                <Stack gap={3} maxHeight={"calc(100vh - 15rem)"}>
                    <Title>
                        How to play
                    </Title>
                    <ParagraphRegular>
                        Users need to follow these steps: <br />
                        Step 1: Visit the official DeODD website <br />
                        Step 2: Connect your Metamask Wallet (*). <br />
                        Step 3: Set your nickname (or display name) and choose an avatar from available options. <br />
                        Step 4: Pick either Heads or Tails <br />
                        Step 5: Select your bet amount with your BNB. <br />
                        Step 6: Click &ldquo;FLIP NOW&rdquo;. <br />
                        Step 7: Wait a few seconds and get the result. <br />
                    </ParagraphRegular>
                    <Typography variant='body2' color="white" fontWeight={400} fontSize={"0.75rem"} lineHeight={'1rem'}>
                        (*) Metamask Wallet: provides users with a secure and convenient way to manage their digital assets and interact with Dapps without the need for a separate wallet or complicated technical knowledge. Visit https://metamask.io/ and add the wallet to your Chrome, follow the instructions to create a wallet.
                    </Typography>
                </Stack>
            </MyModal>

        </>
    )
}

export default ModalHowToPlay
const Title = styled(Typography)(({ theme }) => ({
    fontSize: "1.5rem",
    lineHeight: "2rem",
    textAlign: "center",
    color: theme.palette.text.primary,
    fontWeight: 700,
}))
const ParagraphRegular = styled(Typography)(({ theme }) => ({
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    color: theme.palette.text.primary,
    fontWeight: 400,
})) 
