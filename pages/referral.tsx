import Content from "@/templates/referral/Content";
import { Box } from "@mui/material";
import Loader from "components/common/Loader";
import { Suspense } from "react";

type Props = {};

function referral({ }: Props) {
    return (
        <Box mt={{ xs: 2, md: 10 }}>
            {/* <Suspense fallback={<Loader isLoadingProps={true} />}> */}
            <Content />
            {/* </Suspense> */}
        </Box>
    );
}

export default referral;
