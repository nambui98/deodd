import { Box } from "@mui/material";
import CoinAnimation from "components/common/CoinAnimation";
import { Suspense, lazy } from "react";

const ListUserFlip = lazy(() => import("./ListUserFlip"));

export default function FlipHistoriesRecent() {


    return (
        <Box
            sx={{
                position: "relative",
                "&:before": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    zIndex: 1,
                    top: 0,
                    bottom: 0,
                    width: "1px",
                    background:
                        "radial-gradient(50% 50% at 50% 50%, #FEF156 0%, rgba(254, 241, 86, 0) 100%)",
                },
                "&:after": {
                    content: '""',
                    position: "absolute",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: "1px",
                    background:
                        "radial-gradient(50% 50% at 50% 50%, #FEF156 0%, rgba(254, 241, 86, 0) 100%)",
                },
            }}
        >
            <Suspense fallback={<CoinAnimation mx="auto" width={50} height={50} />}>
                <ListUserFlip />
            </Suspense>
        </Box>

    );
}

