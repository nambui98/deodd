import { Box, Typography, Stack } from "@mui/material";

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

export default function FlipLogDetail() {
  return (
    <Stack gap={3} alignItems={"center"}>
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
        {dummyData.map(item => <RowItem key={item.step} step={item.step} activities={item.log} fee={item.fee} />)}
      </Box>
      <Typography variant="body2" lineHeight={"1.25rem"} color={"secondary.100"}>-End-</Typography>
    </Stack>
  );
}