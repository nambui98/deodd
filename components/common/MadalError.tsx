import { Stack, Typography } from '@mui/material'
import { ButtonTertiary } from 'components/ui/button'
import { useSiteContext } from 'contexts/SiteContext'
import { CloseIcon } from 'utils/Icons'
import MyModal from './Modal'



export default function MadalError() {
    const { isError, setIsError } = useSiteContext();
    const { titleError } = useSiteContext();
    return (
        <MyModal open={isError} setOpen={setIsError}>
            <Stack my={2} alignItems={'center'}>
                <CloseIcon />
                <Typography variant='h2' mt={3} textAlign={'center'}>{titleError || 'Something went wrong, please try again!</Typography'}</Typography>
                <ButtonTertiary sx={{ width: "100%", mt: 3, py: "18px" }} onClick={() => setIsError(false)}>
                    <Typography variant='h3'>Try again</Typography>
                </ButtonTertiary>
            </Stack>
        </MyModal>
    )
}