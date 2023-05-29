import { Box, Container, Typography } from "@mui/material";
import LoyaltyLayout from "@/templates/loyalty/LoyaltyLayout";
// import { Container } from "../styles/common";

const LoyaltyPage: React.FC = () => {
    // return (
    //     <Typography variant='h2' mx="auto" mt={4} textAlign={'center'}>
    //         Coming soon
    //     </Typography>
    // );

    return (<Box mb={10}>
        <Container>
            <LoyaltyLayout />
        </Container>
    </Box>
    );
}

export default LoyaltyPage;


