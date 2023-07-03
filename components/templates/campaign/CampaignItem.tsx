import { Box, Stack, Typography } from "@mui/material"
import Link from 'next/link'
type TypeItem = {
    title: string,
    time: string,
    href: string,
    image: string,
}
const CampaignItem: React.FC<TypeItem> = ({ title, time, image, href }) => {
    return <Link href={"/campaign/" + href} style={{ width: "100%", display: 'block' }}>
        <Stack direction={'row'} justifyContent={"space-between"}>
            <Typography variant='h3' >
                {title}
            </Typography>
            {/* <Typography variant='caption' color={'error.100'}>
                End in: {time}
            </Typography> */}
        </Stack>
        <Stack mt={1} sx={{
            borderRadius: 2,
            border: '2px solid transparent',
            transition: '.3s all',
            '&:hover': {
                border: '2px solid',
                borderColor: 'secondary.main',
            }
        }}>
            <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={image} alt="" />
        </Stack>
    </Link>
}
export default CampaignItem;