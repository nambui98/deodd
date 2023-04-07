import { ContentRef } from '@/templates/ref/Content';
import { Box, Container, Typography } from '@mui/material';

type Props = {}

function ref({ }: Props) {
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

export default ref