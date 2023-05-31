import { Box } from "@mui/material";
import CoinAnimation from "components/common/CoinAnimation";
import { Suspense, lazy } from "react";
const Content = lazy(() => import("../components/templates/referral/Content"));
type Props = {};

function referral({ }: Props) {
    return (
        <Box mt={{ xs: 2, md: 10 }}>
            <Suspense fallback={<CoinAnimation width={100} height={100} />}>
                <Content />
            </Suspense>
        </Box>
    );
}


export default referral;
