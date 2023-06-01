import { Avatar, Box, Collapse, List, Stack, Typography } from "@mui/material";
import {
    useQuery
} from "@tanstack/react-query";
import CoinAnimation from "components/common/CoinAnimation";
import { BigNumber } from "ethers";
import { DeoddService } from "libs/apis";
import { Suspense, createRef, lazy } from "react";
import { ScrollContainer } from 'react-indiana-drag-scroll';
import { TransitionGroup } from "react-transition-group";
import { checkAvatar } from "utils/checkAvatar";
import { Convert } from "utils/convert";
import { Format } from "utils/format";

const ListUserFlip = lazy(() => import("./ListUserFlip"));
type dataUserRecent = {
    id: number;
    avatarId: number | undefined;
    username: string;
    timeAgo: string;
    isWin: boolean;
    amount: string | number;
    streak: number;
    wallet: string;
    nodeRef: any;
};
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

