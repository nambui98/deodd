import { Box, Typography, Stack } from "@mui/material";
import { StatusGame, useContractContext } from "contexts/ContractContext";
import { LeftIcon, RightIcon } from "utils/Icons";

// Dummy data. Delete later
const dummyData = [
  {
    step: 1,
    log: "You choose [Head] for [0.5 BNB]",
    fee: ""
  },
  {
    step: 2,
    log: "Request is sent to Binance Oracle VRF (Verifiable Random Function)",
    fee: 0.006
  },
  {
    step: 3,
    log: "VRF is generating random number",
    fee: ""
  },
  {
    step: 4,
    log: "Generating completed! Your random number is 111...888 VRF is sending result to DeODD Management System",
    fee: 0.006
  },
  {
    step: 5,
    log: "The result is sent successfully to deODD Management System. Processing your number... According to the mechanism: You number is even, which corresponds to Head It’s determined NOT to match your selection",
    fee: ""
  },
  {
    step: 6,
    log: "deODD Management System finalizes the result and sends to client.",
    fee: ""
  }
];

function RowItem({ step, activities, fee }: { step: number; activities: string; fee: number | string }) {
  return (
    <>
      <Typography variant="body2">{step}</Typography>
      <Typography variant="body2" color={"secondary.100"}>{activities}</Typography>
      <Typography variant="body2" textAlign={"right"} color={"secondary.main"}>{fee}</Typography>
    </>
  );
}

export default function FlipLogDetail({ isShowing }: { isShowing?: boolean }) {

  const { setStatusGame } = useContractContext();
  const Empty = () => <>
    <Typography></Typography>
    <Typography color="dark.60" textAlign={'center'}>Empty</Typography>
    <Typography></Typography>
  </>
  return (
    <Stack gap={3} mt={5} px={{ xs: 0, lg: 10, xl: 20 }} display={isShowing ? 'flex' : 'none'}>
      <Stack direction={'row'} columnGap={2} sx={{ cursor: 'pointer' }} onClick={() => setStatusGame(StatusGame.FLIP)}>

        <LeftIcon stroke="#fff" />
        <Typography variant="body2" fontWeight={500}>Back to flipping</Typography>
      </Stack>
      <Typography variant="h2" fontSize={"1.5rem"} fontWeight={700} color={"#fff"} alignSelf={"flex-start"} textTransform={"capitalize"}>flipping log detail</Typography>
      <Box
        display={"grid"}
        gridTemplateColumns={"1fr 5.6fr 1fr"}
        rowGap={3}
      >
        {/* Table Header */}
        <Typography variant="body2" >Step</Typography>
        <Typography variant="body2" >Activities Log</Typography>
        <Typography variant="body2" textAlign={"right"}>Fee (BNB)</Typography>
        {/* Table Body */}
        <Empty />
        {/* {dummyData.map(item => <RowItem key={item.step} step={item.step} activities={item.log} fee={item.fee} />)} */}
      </Box>
      <Typography variant="body2" lineHeight={"1.25rem"} textAlign={'center'} color={"secondary.100"}>-End-</Typography>
    </Stack>
  );
}