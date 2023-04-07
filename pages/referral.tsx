import ContentData from "@/templates/referral/ContentData";
import ContentNoData from "@/templates/referral/ContentNoData";
import { Box, Container, Typography } from "@mui/material";
import Loader from "components/common/Loader";
import { Donut } from "components/ui/donuts";
import { useWalletContext } from "contexts/WalletContext";
import useReferral from "hooks/useReferral";
import { Suspense, useMemo, useState } from "react";

type Props = { ckReferral: boolean };
export async function getStaticProps() {
    return {
        props: {
            ckReferral: false
        }, // will be passed to the page component as props
    }
}
function referral({ }: Props) {
    const { ckReferral, link, dataAvailable, dataExpired } = useReferral({ isNotGet: false });
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
                <Box>
                    {
                        ckReferral !== undefined &&
                        (ckReferral ?
                            <ContentData
                                dataAvailable={dataAvailable}
                                dataExpired={dataExpired}
                                link={link ?? ''}
                            /> : <ContentNoData link={link ?? ''} ckReferral={ckReferral} />)}

                </Box>
            </Suspense>

        </Box>
    );
}

export default referral;
