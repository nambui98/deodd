import { Box, ButtonBase, MenuItem, Paper, Select, SelectChangeEvent, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { ButtonTertiary } from "../../ui/button";
import { ArrowLeftIcon, BnbIcon } from "utils/Icons";
import { BnbImage, CoinEmptyImage, MapIcon } from "utils/Images";
type rewardItem = {
    value: number,
    type: string,
}
function createData(
    name: string,
    rewards: rewardItem[] | undefined,
    claimTime: string | undefined,
) {
    return { name, rewards, claimTime };
}
const ClaimReward: React.FC<any> = () => {
    const [valueSelect, setValueSelect] = useState<string | undefined>('');
    const [isShowHistory, setIsShowHistory] = useState<boolean>(false)
    let rows = [
        createData('Win/Lose Streak Campaign', [
            {
                type: 'BNB',
                value: 2.523
            },
            {
                type: 'Bronze',
                value: 2
            },
            {
                type: 'Gold',
                value: 2
            },
            {
                type: 'Diamond',
                value: 3
            },
        ], '12/12/2022'),
        createData('Referral Campaign', [], undefined),
        createData('Volume of Bets Campaign', [{
            type: 'BNB',
            value: 2.523
        },], '12/12/2022'),
        createData('Win/Lose Streak Campaign', [], '12/12/2022'),
        createData('Win/Lose Streak Campaign', [], undefined),
    ];
    return <Box mt={3} p={3} width={544} borderRadius={3} bgcolor={"secondary.300"}>
        {
            isShowHistory ? <Box>
                <ButtonBase onClick={() => setIsShowHistory(false)}>
                    <ArrowLeftIcon style={{ stroke: "#Fff" }} />
                    <Typography variant="body2" ml={1}>Claim history</Typography>
                </ButtonBase>
                <TableContainer sx={{ mt: 2, backgroundColor: "transparent", backgroundImage: 'none', boxShadow: "none" }} component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ 'td, th': { border: 0, py: 1 } }}>
                                <TableCell sx={{ textTransform: "uppercase" }}>campaign</TableCell>
                                <TableCell sx={{ textTransform: "uppercase" }} align="right">Reward</TableCell>
                                <TableCell sx={{ textTransform: "uppercase" }} align="right">Claim time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.length > 0 && rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{
                                        'td, th': { border: 0, py: 1 }, 'th': {
                                            display: 'block'
                                        }
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.rewards?.map((reward) =>
                                        <Stack mt={1} direction={'row'} justifyContent={"flex-end"}>
                                            <Typography mr={.5}>{reward.value}</Typography>
                                            <img width={16} src={MapIcon[reward.type]} alt="" />
                                        </Stack>
                                    )}</TableCell>
                                    <TableCell sx={{ display: "block" }} align="right">{row.claimTime}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                    {
                        rows.length <= 0 &&
                        <Box mt={6} mb={12} display={'block'} textAlign={'center'}>
                            <img width={144} src={CoinEmptyImage} alt="" />
                            <Typography fontSize={16} color={"secondary.100"} mt={2}>Nothing here</Typography>
                        </Box>
                    }

                </TableContainer>
            </Box> :
                <>
                    <Stack direction={'row'} justifyContent={"space-between"} alignItems={"center"}>
                        <Typography variant='body2' textTransform={'uppercase'}>
                            deODD Campaign Claim Portal
                        </Typography>
                        <ButtonBase onClick={() => setIsShowHistory(true)}>
                            <Typography variant='body2' color="secondary.main">
                                History
                            </Typography>
                        </ButtonBase>
                    </Stack>
                    <Box mt={5}>
                        <Select
                            value={valueSelect}
                            placeholder='Select-'
                            onChange={(event: SelectChangeEvent) => { setValueSelect(event.target.value) }}
                            displayEmpty
                            sx={styleInput}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem disabled value={""}>
                                <Typography color={"secondary.100"}>Select-</Typography>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <Box py={"103px"}>
                            {
                                valueSelect ?
                                    <Stack justifyContent={'center'} alignItems={'center'}>
                                        <Typography>Your reward</Typography>
                                        <Stack direction={'row'} mt={3}>

                                            <Typography variant="h3" fontSize={"48px"}>2,523</Typography>
                                            <img width={"40px"} src={BnbImage} alt="" />
                                        </Stack>
                                    </Stack>
                                    :

                                    <Typography variant='body2' textAlign={'center'} color={"secondary.200"}> Select campaign to show your reward</Typography>
                            }
                        </Box>
                        <ButtonTertiary disabled={!valueSelect} sx={{ width: "100%", py: "16px" }}> <Typography variant='button' >CLAIM REWARD</Typography></ButtonTertiary>
                    </Box >
                </>
        }

    </Box >
}
const styleInput = {
    backgroundColor: "background.paper", border: '0px solid', borderColor: 'background.paper', '.MuiOutlinedInput-notchedOutline': {
        border: 'none'
    },
    width: "100%",
    fontSize: 16,
    'div': {
        py: "12px",
        fontSize: 16,
    }

}
export default ClaimReward;