
import BottomContent from "@/templates/loyalty/BottomContent";
import TopContent from "@/templates/loyalty/TopContent";
import { Box, Container, Typography } from "@mui/material";
// import { Container } from "../styles/common";

const LoyaltyPage: React.FC = () => {
    return (
        <Typography variant='h2' mx="auto" mt={4} textAlign={'center'}>
            Coming soon
        </Typography>
    );

    return (<Box mb={10}>
        <Box bgcolor={"background.paper"} p={"35px 0px"}>
            <Container>
                <Typography variant='h2' textTransform={'uppercase'}>
                    loyalty
                </Typography>
            </Container>
        </Box>
        <Container>
            <TopContent />
            <BottomContent />
        </Container>
    </Box>
    );
}

export default LoyaltyPage;


