import React from 'react'
import MyModal from './Modal'
import { Stack, Typography } from '@mui/material'
import { CloseIcon } from 'utils/Icons'
import { useSiteContext } from 'contexts/SiteContext'
import { ButtonMain, ButtonTertiary } from 'components/ui/button'



export default function MadalClaimSuccess() {
    const { isSuccess, titleSuccess, setIsSuccess } = useSiteContext();
    return (
        <MyModal open={isSuccess} setOpen={setIsSuccess}>
            <Stack my={2} alignItems={'center'}>
                <Typography variant='h2' mt={3} textAlign={'center'}>{titleSuccess || 'Claimed successfully'}</Typography>
                <ButtonTertiary sx={{ width: "100%", mt: 3, py: "18px" }} onClick={() => setIsSuccess(false)}>
                    <Typography variant='h3'>OKAY</Typography>
                </ButtonTertiary>
            </Stack>
        </MyModal>
    )
}