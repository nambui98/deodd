import { Box, Stack, Typography } from "@mui/material"
import Link from 'next/link'
type TypeItem = {
    title: string,
    time: string,
    image: string
}
const CampaignItem: React.FC<TypeItem> = ({ title, time, image }) => {
    return <Link href="/campaign/123">
        <Box display={'block'} mx={6} my={3} height={"1px"} bgcolor={"secondary.300"}></Box>
        <Stack direction={'row'} justifyContent={"space-between"}>
            <Typography variant='h3' textTransform={'uppercase'}>
                {title}
            </Typography>
            <Typography variant='caption' color={'error.100'}>
                End in: {time}
            </Typography>
        </Stack>
        <Box mt={1}>
            <img width={"544px"} src={image} alt="" />
        </Box>
    </Link>
}
export default CampaignItem;