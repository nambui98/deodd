import { ContentRef } from '@/templates/ref/Content';
import { Box, Container, Typography } from '@mui/material';

function Ref() {
    return (
        <Box mt={10}>

            <Box>
                <ContentRef />
            </Box>
        </Box>
    )
}
// Ref.getInitialProps = async () => {
//     const res = await fetch('https://api.github.com/repos/vercel/next.js')
//     const json = await res.json()
//     return { stars: json.stargazers_count }
// }
export default Ref