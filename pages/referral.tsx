import ContentData from "@/templates/referral/ContentData";
import ContentNoData from "@/templates/referral/ContentNoData";
import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";

type Props = {};

function referral({ }: Props) {
    const [data, setData] = useState<any>({});
    return (
        <Box>
            <Box bgcolor={"background.paper"} p={"35px 0px"}>
                <Container>
                    <Typography variant="h2" textTransform={"uppercase"}>
                        Ref 2 earn
                    </Typography>
                </Container>
            </Box>
            <Box>{data ? <ContentData /> : <ContentNoData />}</Box>
        </Box>
    );
}

export default referral;
