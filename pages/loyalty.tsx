import { Container } from "@mui/material";
import LoyaltyLayout from "@/templates/loyalty/LoyaltyLayout";
// import { Container } from "../styles/common";

const LoyaltyPage: React.FC = () => {
    // return (
    //     <Typography variant='h2' mx="auto" mt={4} textAlign={'center'}>
    //         Coming soon
    //     </Typography>
    // );

    return (
        <Container sx={{ mb: 10, p: { xs: 0, md: 3 } }}>
            <LoyaltyLayout />
        </Container>
    );
}

export default LoyaltyPage;


