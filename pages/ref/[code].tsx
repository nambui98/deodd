import { ContentRef } from '@/templates/ref/Content';
import { Box, Container, Typography } from '@mui/material';

function Ref() {
    return (
        <Box>
            <Box bgcolor={"background.paper"} p={"35px 0px"}>
                <Container>
                    <Typography variant="h2" textTransform={"uppercase"}>
                        Ref 2 earn
                    </Typography>
                </Container>
            </Box>
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