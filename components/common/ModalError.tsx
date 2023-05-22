import { Stack, Typography } from '@mui/material'
import { ButtonTertiary } from 'components/ui/button'
import { useSiteContext } from 'contexts/SiteContext'
import { CloseIcon } from 'utils/Icons'
import MyModal from './Modal'



export default function ModalError() {
    const { isError, setIsError } = useSiteContext();
    const { titleError } = useSiteContext();
    return (
        <MyModal open={isError} sx={{ width: 400 }} setOpen={setIsError}>
            <Stack my={2} alignItems={'center'}>
                <CloseIcon />
                <Typography variant='h3' mt={3} textAlign={'center'} lineHeight={1.5}>{titleError || 'Something went wrong, please try again!'}</Typography>
                <ButtonTertiary sx={{ width: "100%", mt: 3, py: "18px" }} onClick={() => setIsError(false)}>
                    <Typography variant='h3'>Try again</Typography>
                </ButtonTertiary>
            </Stack>
        </MyModal>
    )
}