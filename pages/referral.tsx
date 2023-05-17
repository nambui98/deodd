import Content from "@/templates/referral/Content";
import { Box } from "@mui/material";

type Props = {};

function referral({ }: Props) {
    return (
        <Box mt={{ xs: 2, md: 10 }}>
            <Content />
        </Box>
    );
}


export default referral;
