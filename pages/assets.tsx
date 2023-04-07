import ContentAssets from '@/templates/assets/ContentAssets';
import { Box, Container, Typography } from '@mui/material';

function assets() {

    return (
        <Box>
            <Box bgcolor={"background.paper"} p={"35px 0px"}>
                <Container>
                    <Typography variant='h2' textTransform={'uppercase'}>
                        Assets
                    </Typography>
                </Container>
            </Box>
            <ContentAssets />
        </Box >
    )
}

export default assets