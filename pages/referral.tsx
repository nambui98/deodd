import Content from "@/templates/referral/Content";
import { Box, Container, Typography } from "@mui/material";
import Loader from "components/common/Loader";
import { Suspense } from "react";

type Props = {};

function referral({ }: Props) {
    return (
        <Box>
            <Suspense fallback={<Loader isLoadingProps={true} />}>
                <Box bgcolor={"background.paper"} p={"35px 0px"}>
                    <Container>
                        <Typography variant="h2" textTransform={"uppercase"}>
                            Ref 2 earn
                        </Typography>
                    </Container>
                </Box>
                <Content />
            </Suspense>

        </Box>
    );
}

export default referral;
