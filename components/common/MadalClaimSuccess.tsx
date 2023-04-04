import { Stack, Typography } from '@mui/material'
import { ButtonTertiary } from 'components/ui/button'
import { useSiteContext } from 'contexts/SiteContext'
import MyModal from './Modal'

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