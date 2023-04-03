import ContentData from "@/templates/referral/ContentData";
import ContentNoData from "@/templates/referral/ContentNoData";
import { Box, Container, Typography } from "@mui/material";
import { useWalletContext } from "contexts/WalletContext";
import { useState } from "react";

type Props = {};

function referral({ }: Props) {
    const { walletIsConnected } = useWalletContext();
    console.log(walletIsConnected);

    return (
        <Box>
            <Box bgcolor={"background.paper"} p={"35px 0px"}>
                <Container>
                    <Typography variant="h2" textTransform={"uppercase"}>
                        Ref 2 earn
                    </Typography>
                </Container>
            </Box>
            <Box>{walletIsConnected ? <ContentData /> : <ContentNoData />}</Box>
        </Box>
    );
}

export default referral;
