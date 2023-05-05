import {
    Box,
    Button,
    Container,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import MyTabs, { TypeTab } from "components/common/Tabs";
import { DiscordIcon, TelegramIcon, TwiterIcon } from "components/common/icons";
import { ButtonFourth, ButtonLoading, ButtonTertiary } from "components/ui/button";
import { Colors } from "constants/index";
import { useSiteContext } from "contexts/SiteContext";
import { useWalletContext } from "contexts/WalletContext";
import { BigNumber, ethers } from "ethers";
import { DeoddService } from "libs/apis";
import {
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
} from "next-share";
import { useEffect, useMemo, useState } from "react";
import { BnbIcon, CopyIcon, FacebookIcon, NotiIcon } from "utils/Icons";
import { AvatarImage, BnbImage, CoinEmptyImage } from "utils/Images";
import { Convert } from "utils/convert";
import { Format } from "utils/format";
import ShareLink from "./ShareLink";
import MyImage from "components/ui/image";

type Props = {
    dataAvailable: any | undefined;
    dataExpired: any | undefined;
    link: string;
    reload: Function;
};
function createData(name: string, expire: string, profit: BigNumber) {
    return {
        name: Convert.convertWalletAddress(name, 5, 5),
        expire,
        profit: Format.formatMoneyFromBigNumberEther(profit),
    };
}
function ContentData({ dataAvailable, dataExpired, link, reload }: Props) {
    const [valueTab, setValueTab] = useState<number>(1);

    const { walletAddress, bnbBalance } = useWalletContext();
    const {
        setIsSuccess,
        setTitleSuccess,
        setIsLoading,
        setIsError,
        setTitleError,
    } = useSiteContext();
    let rowsAvailable = useMemo(
        () =>
            dataAvailable && dataAvailable?.referralEarningRoleFatherList
                ? dataAvailable?.referralEarningRoleFatherList.map((item: any) =>
                    createData(
                        item.userNameReferred + "(" + item.userWalletReferred + ")",
                        item.expiredDateForFather,
                        item.rewardFatherClaimed
                    )
                )
                : [],
        [dataAvailable]
    );
    let rowsExpired = useMemo(
        () =>
            dataExpired && dataExpired?.referralEarningRoleFatherList
                ? dataExpired?.referralEarningRoleFatherList.map((item: any) =>
                    createData(
                        item.userNameReferred + "(" + item.userWalletReferred + ")",
                        item.expiredDateForFather,
                        item.rewardFatherClaimed
                    )
                )
                : [],
        [dataExpired]
    );
    let rows = valueTab === 1 ? rowsAvailable : rowsExpired;

    const listTabs: TypeTab[] = [
        {
            id: 1,
            title: "Avaiable",
            value: `(${rowsAvailable.length})`,
        },
        {
            id: 2,
            title: "Expired",
            value: `(${rowsExpired.length})`,
        },
    ];

    const handleClaim = async () => {
        try {
            setIsLoading(true);
            const res = await DeoddService.ClaimReferral(walletAddress);
            setIsLoading(false);
            if (res.data.data && res.status === 200) {
                setTitleSuccess("Claimed successfully");
                setIsSuccess(true);
                reload();
            } else {
                setIsError(true);
                setTitleError(res.data.meta.error_message);
            }
        } catch (error) {
            setIsLoading(false);
            setIsError(true);
            setTitleError("Something went wrong!");
        }
    };
    console.log(
        bnbBalance)
    console.log(

        // BigNumber.from(0.08)
    )


    return (
        <Container>
            <Stack
                direction={{ xs: "column-reverse", md: "row" }}
                mt={2}
                columnGap={4}
            >
                <Box
                    flexGrow={1}
                    mt={{ xs: 2, md: 0 }}
                    flexShrink={1}
                    flexBasis={"60%"}
                >
                    <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <ButtonFourth active={valueTab === 1} onClick={() => setValueTab(1)} label={
                            `Available (${rowsAvailable.length})`
                        } />
                        <Box ml={1}>
                            <ButtonFourth active={valueTab === 2} onClick={() => setValueTab(2)} label={
                                `Expired (${rowsExpired.length})`
                            } />
                        </Box>
                        <Stack
                            direction={"row"}
                            py={"14px"}
                            flex={1}
                            borderColor={"secondary.100"}
                            justifyContent={"flex-end"}
                        >
                            <Typography variant="body2">Claimed</Typography>
                            <Stack
                                direction={"row"}
                                ml={1}
                                columnGap={1}
                                alignItems={"center"}
                            >
                                <Typography variant="body2" color="secondary.main">
                                    {Format.formatMoneyFromBigNumberEther(
                                        dataAvailable?.claimedReward
                                    )}
                                </Typography>
                                <BnbIcon fill={Colors.secondaryDark} />
                            </Stack>
                        </Stack>
                    </Stack>
                    <Box mt={1}>
                        <TableContainer
                            sx={{
                                backgroundColor: "transparent",
                                borderRadius: 2,
                                position: "relative",
                                maxHeight: "500px",
                                backgroundImage: "none",
                                boxShadow: "none",
                            }}
                            component={Paper}
                        >
                            <Table
                                stickyHeader
                                sx={{
                                    ".MuiDataGrid-root": {
                                        borderRadius: "50px",
                                    },
                                    ".MuiDataGrid-columnHeaders": {
                                        display: "none",
                                    },
                                    ".MuiTableRow-root": {
                                        "&:first-child": {
                                            ".MuiTableCell-root": {
                                                "&:first-child": {
                                                    borderRadius: "8px 0 0 0",
                                                },
                                                "&:last-child": {
                                                    borderRadius: "0 8px 0 0",
                                                },
                                            },
                                        },
                                    },
                                }}
                                aria-label="simple table"
                            >
                                <TableHead>
                                    <TableRow sx={{ "td, th": { border: 0, py: 1 } }}>
                                        <TableCell sx={{ px: 0 }}>Users</TableCell>
                                        <TableCell align="right">Expire Date</TableCell>
                                        <TableCell align="right">Profit</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody
                                    sx={{
                                        bgcolor: "background.paper",
                                    }}
                                >
                                    {rows.length > 0 &&
                                        rows.map((row: any, index: number) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{
                                                    "td, th": { border: 0, py: 1 },
                                                }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    <Stack
                                                        direction={"row"}
                                                        columnGap={1}
                                                        alignItems={"center"}
                                                    >
                                                        <MyImage
                                                            width={24}
                                                            height={24}
                                                            alt=""
                                                            src={AvatarImage}
                                                        />
                                                        <Typography variant="caption">
                                                            {row.name}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography variant="caption" color="secondary.100">
                                                        {row.expire.replaceAll("-", "/")}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Stack
                                                        direction={"row"}
                                                        justifyContent={"flex-end"}
                                                        columnGap={1}
                                                        alignItems={"center"}
                                                    >
                                                        <Typography
                                                            variant="caption"
                                                            color="secondary.main"
                                                        >
                                                            {" "}
                                                            {row.profit}
                                                        </Typography>
                                                        <BnbIcon fill={Colors.secondaryDark} />
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            {rows.length <= 0 && (
                                <Box py={12.5} bgcolor={'primary.100'} borderRadius={2} display={"block"} textAlign={"center"}>
                                    <img width={144} src={CoinEmptyImage} alt="" />
                                    <Typography fontSize={16} color={"secondary.100"} mt={5}>
                                        There is no one here
                                    </Typography>
                                </Box>
                            )}
                        </TableContainer>
                    </Box>
                    <Box display={{ xs: "block", md: "none" }}>
                        <ShareLink link={link} />
                    </Box>
                </Box>
                <Box flexGrow={1} flexShrink={1} flexBasis={"40%"}>
                    <Typography
                        variant="body2"
                        textAlign={"center"}
                        mt={2}
                    >
                        Available to claim
                    </Typography>
                    <Stack
                        mt={1}
                        direction={"row"}
                        columnGap={1}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >
                        <Typography variant="h3" fontSize={"48px"}>
                            {Format.formatMoneyFromBigNumberEther(
                                dataAvailable?.unclaimedReward
                            )}
                        </Typography>
                        <MyImage src={BnbImage} width={40} alt="" height={40} />
                    </Stack>
                    <Stack
                        direction={"row"}
                        mt={2}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Typography variant="body2" >
                            Total Reward
                        </Typography>
                        <Stack direction={"row"} columnGap={1} alignItems={"center"}>
                            <Typography variant="body2">
                                {Format.formatMoneyFromBigNumberEther(
                                    dataAvailable?.claimedReward
                                )}
                            </Typography>
                            <BnbIcon />
                        </Stack>
                    </Stack>
                    <Stack
                        direction={"row"}
                        my={2}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Typography variant="body2" >
                            Claim Fee
                        </Typography>
                        <Stack direction={"row"} columnGap={1} alignItems={"center"}>
                            <Typography variant="body2">
                                {Format.formatMoney(dataAvailable?.claimFee ?? 0)}{" "}
                            </Typography>
                            <BnbIcon />
                        </Stack>
                    </Stack>
                    <Typography variant="caption" color="secondary.100">
                        The fee collected on behalf of blockchain
                        <br />
                        No more gas fee required
                    </Typography>

                    <ButtonLoading
                        onClick={handleClaim}
                        disabled={
                            ethers.utils.parseEther(
                                (dataAvailable?.claimedReward || 0).toString()
                            ).lte(BigNumber.from(0)) ||
                            bnbBalance.lte(
                                ethers.utils.parseEther((dataAvailable?.claimFee || 0).toString())
                            )
                        }
                        sx={{
                            px: 5, py: 2, mt: 3,
                            borderRadius: 2,
                            width: '100%',
                            textTransform: 'none',
                            '&:disabled': {
                                bgcolor: 'secondary.900',
                                color: 'primary.300'
                            }
                        }}
                        loading={false}>
                        <Typography variant='body2' fontSize={16} fontWeight={600} >
                            Claim reward
                        </Typography>
                    </ButtonLoading>
                    <Box display={{ xs: "none", md: "block" }}>
                        <ShareLink link={link} />
                    </Box>
                </Box>
            </Stack>
        </Container >
    );
}

export default ContentData;
