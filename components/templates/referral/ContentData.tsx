import {
    Box,
    Container,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import { TypeTab } from "components/common/Tabs";
import { ButtonFourth, ButtonLoading } from "components/ui/button";
import MyImage from "components/ui/image";
import { Colors } from "constants/index";
import { useSiteContext } from "contexts/SiteContext";
import { useWalletContext } from "contexts/WalletContext";
import { BigNumber, ethers } from "ethers";
import { DeoddService } from "libs/apis";
import { useMemo, useState } from "react";
import { BnbIcon } from "utils/Icons";
import { AvatarImage, BnbImage, CoinEmptyImage } from "utils/Images";
import { Convert } from "utils/convert";
import { Format } from "utils/format";
import ShareLink from "./ShareLink";
import { checkAvatar } from "utils/checkAvatar";
import { format } from "date-fns";

type Props = {
    dataAvailable: any | undefined;
    dataExpired: any | undefined;
    link: string;
    reload: Function;
};
function createData(avatar: number | undefined, name: string, expire: string, profit: BigNumber) {
    debugger
    return {
        avatar: checkAvatar(avatar),
        name,
        expire: format(new Date(expire), 'dd/MM/yyyy'),
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
                        item.avatarIdChild,
                        item.userNameReferred ? item.userNameReferred : "(" + Convert.convertWalletAddress(item.userWalletReferred, 5, 5) + ")",
                        // format(new Date(2014, 1, 11), 'yyyy-MM-dd'),
                        item.expiredDateForFather,
                        item.profitFather
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
                        item.avatarIdChild,
                        item.userNameReferred ? item.userNameReferred : "(" + Convert.convertWalletAddress(item.userWalletReferred, 5, 5) + ")",
                        item.expiredDateForFather,
                        item.profitFather
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
            const res = await DeoddService.claimReferral(walletAddress);
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
                                        dataAvailable?.claimedReward ?? 0
                                    )}
                                </Typography>
                                <BnbIcon width={20} height={20} fill={Colors.secondaryDark} />
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
                                                            src={`/assets/images/${row.avatar}.png`}
                                                        />
                                                        <Typography variant="caption">
                                                            {row.name}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography variant="caption" color="secondary.100">
                                                        {row.expire}
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
                                                        <BnbIcon width={20} height={20} fill={Colors.secondaryDark} />
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
                            {Format.formatMoney(
                                dataAvailable?.availableReward ?? 0
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
                                {Format.formatMoney(
                                    dataAvailable?.totalReward ?? 0
                                )}
                            </Typography>
                            <BnbIcon width={20} height={20} fill={Colors.secondaryDark} />
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
                            <BnbIcon width={20} height={20} fill={Colors.secondaryDark} />
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
                                (dataAvailable?.availableReward || 0).toString()
                            ).lte(BigNumber.from(0))
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
