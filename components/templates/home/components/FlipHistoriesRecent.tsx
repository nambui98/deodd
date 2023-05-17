import { Avatar, Box, Collapse, List, Stack, Typography } from "@mui/material";
import {
    useQuery
} from "@tanstack/react-query";
import { BigNumber } from "ethers";
import { DeoddService } from "libs/apis";
import { createRef } from "react";
import { ScrollContainer } from 'react-indiana-drag-scroll';
import { TransitionGroup } from "react-transition-group";
import { Avatar2Image } from "utils/Images";
import { checkAvatar } from "utils/checkAvatar";
import { Convert } from "utils/convert";
import { Format } from "utils/format";
type Props = {};
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
    const { data: dataRecent } = useQuery({
        queryKey: ["getRecentFlipping"],
        queryFn: DeoddService.getRecentFlipping,
        select: (data) =>

            data.data.data.map(
                (item: {
                    flipId: any;
                    wallet: string;
                    amount: BigNumber | undefined;
                    time: any;
                    flipChoice: any;
                    flipResult: any;
                    userName: any;
                    avatarId: number | undefined;
                    currentStreak: number
                }) => {
                    let isWin = item.flipResult === 1;
                    let data: dataUserRecent = {
                        id: item.flipId,
                        avatarId: item.avatarId,
                        wallet: item.wallet,
                        amount: Format.formatMoneyFromBigNumberEther(item.amount),
                        isWin: isWin,
                        timeAgo: Convert.convertTimeStamp(item.time),
                        username: item.userName,
                        streak: item.currentStreak,
                        nodeRef: createRef(),
                    };
                    return data;
                }
            ),
        refetchInterval: 5000,
    });

    return (

        <Box
            // overflow={"hidden"}

            sx={{
                position: "relative",
                // cursor: '',
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

            <ScrollContainer>
                <List component={Stack} flexDirection="row">
                    <TransitionGroup component={Stack} flexDirection="row" columnGap={1}>
                        {dataRecent?.map((item: dataUserRecent, index: number) => (
                            <Collapse
                                addEndListener={(e) => (e.style.opacity = "1")}
                                timeout={1500}
                                in={true}
                                key={item.id}
                                sx={{
                                    "&.MuiCollapse-horizontal": {
                                        opacity: 0,
                                        transition: ".5s all",
                                        "&.MuiCollapse-entered": {
                                            opacity: 1,
                                        },
                                    },
                                }}
                                easing={{ enter: "200ms", exit: "1000s" }}
                                orientation="horizontal"
                            >
                                <Box ref={item.nodeRef} className="item">
                                    <UserActivity user={item} />
                                </Box>
                            </Collapse>
                        ))}
                    </TransitionGroup>
                </List>
            </ScrollContainer>
        </Box>

    );
}

function UserActivity({ user }: { user: dataUserRecent }) {
    return (
        <Box
            className="userRecent"
            bgcolor={"primary.100"}
            position={"relative"}
            border={"1px solid"}
            borderColor={"secondary.300"}
            borderRadius={2}
            px={2}
            py={1}
        >
            <Stack direction={"row"} gap={1}>
                <Avatar
                    sx={{ width: 32, height: 32 }}
                    alt="Remy Sharp"
                    src={`/assets/images/${checkAvatar(user.avatarId)}.png`}
                />
                <Stack alignItems={"baseLine"} columnGap={1}>
                    <Typography variant="body2" fontWeight={500} lineHeight={"20px"}>
                        {user.username
                            ? user.username
                            : Convert.convertWalletAddress(user.wallet, 6, 3)}
                    </Typography>
                    <Typography
                        whiteSpace={"normal"}
                        flexGrow={1}
                        lineHeight={"20px"}
                        variant="body2"
                        sx={{ whiteSpace: "nowrap" }}
                        fontWeight={400}
                        color="secondary.100"
                    >
                        flipped
                        <Typography
                            component={"span"}
                            color={"secondary.main"}
                            lineHeight={"20px"}
                            fontWeight={400}
                            variant="body2"
                        >
                            {" "}
                            {user.amount}{" "}
                        </Typography>
                        and
                        {user.isWin ? (
                            <Typography
                                component={"span"}
                                color={"secondary.main"}
                                lineHeight={"20px"}
                                fontWeight={400}
                                variant="body2"
                            >
                                {" "}
                                doubled{" "}
                            </Typography>
                        ) : (
                            <Typography
                                component={"span"}
                                color={"secondary.400"}
                                lineHeight={"20px"}
                                fontWeight={400}
                                variant="body2"
                            >
                                {" "}
                                slipped{" "}
                            </Typography>
                        )}
                    </Typography>
                    <Typography
                        variant="caption"
                        fontWeight={400}
                        color="secondary.100"
                        lineHeight={"20px"}
                    >
                        {user.timeAgo}
                    </Typography>
                </Stack>
            </Stack>
            {user.streak > 1 && (
                <Box
                    position={"absolute"}
                    top={0}
                    right={0}
                    bgcolor={"secondary.main"}
                    px={0.5}
                    sx={{ borderRadius: "0px 8px" }}
                >
                    <Typography
                        variant="caption"
                        fontSize={10}
                        fontWeight={500}
                        color="primary.200"
                    >
                        {user.streak} streak
                    </Typography>
                </Box>
            )}
        </Box>
    );
}
