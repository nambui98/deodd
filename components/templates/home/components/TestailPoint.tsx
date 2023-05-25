import { useState } from "react";
import { Typography, Stack, Box, TypographyProps, Divider } from "@mui/material";
import { BnbIcon } from "utils/Icons";
import { TestailCoinImage } from "utils/Images";
import MyModal from "components/common/Modal";
import MyImage from "components/ui/image";
import { Colors } from "constants/index";

const testailPointData = [
  {
    betAmount: 0.01,
    normalLose: 1,
    normalWin: 3,
    goldenHourLose: 1,
    goldenHourWin: 5,
  },
  {
    betAmount: 0.02,
    normalLose: 2,
    normalWin: 5,
    goldenHourLose: 3,
    goldenHourWin: 9,
  },
  {
    betAmount: 0.04,
    normalLose: 4,
    normalWin: 7,
    goldenHourLose: 5,
    goldenHourWin: 13,
  },
  {
    betAmount: 0.07,
    normalLose: 6,
    normalWin: 10,
    goldenHourLose: 8,
    goldenHourWin: 19,
  },
  {
    betAmount: 0.10,
    normalLose: 9,
    normalWin: 14,
    goldenHourLose: 12,
    goldenHourWin: 26,
  },
  {
    betAmount: 0.13,
    normalLose: 13,
    normalWin: 19,
    goldenHourLose: 17,
    goldenHourWin: 35,
  },
  {
    betAmount: 0.16,
    normalLose: 17,
    normalWin: 24,
    goldenHourLose: 22,
    goldenHourWin: 44,
  },
  {
    betAmount: 0.19,
    normalLose: 25,
    normalWin: 33,
    goldenHourLose: 31,
    goldenHourWin: 60,
  },
];

function TableText({ children, ...props }: { children: any } & TypographyProps) {
  return (
    <Typography fontSize={"0.875rem"} lineHeight={"1.25rem"} fontWeight={400} {...props}>{children}</Typography>
  );
}

function RowItem(props: {
  betAmount: number;
  normalLose: number;
  normalWin: number;
  goldenHourLose: number;
  goldenHourWin: number;
  lastItem: boolean;
}) {
  return (
    <>
      <Stack direction="row" gap={1}>
        <TableText textAlign={"right"} width={36}>{props.betAmount.toFixed(2)}</TableText>
        <BnbIcon width={"1rem"} color={Colors.primaryDark}></BnbIcon>
      </Stack>
      <TableText>+{props.normalLose}</TableText>
      <TableText>+{props.normalWin}</TableText>
      <TableText>+{props.goldenHourLose}</TableText>
      <TableText>+{props.goldenHourWin}</TableText>
      {props.lastItem ? null : <Divider sx={{ gridColumn: "auto / span 5", backgroundColor: "primary.100" }} />}
    </>
  );
}

export default function TestailPoint() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box position={"absolute"} right={0}>
      <Stack direction={"row"} gap={1}>
        <Stack alignItems={"flex-end"}>
          <Typography sx={{ cursor: "pointer" }} onClick={() => setOpen(true)} fontSize={"0.75rem"} lineHeight={"1rem"} color={"secondary.100"}>Testail Point</Typography>
          <Typography sx={{ cursor: "pointer" }} onClick={() => setOpen(true)} fontSize={"1rem"} lineHeight={"1.375rem"} fontWeight={600}>124</Typography>
        </Stack>
        <MyImage sx={{ cursor: "pointer" }} onClick={() => setOpen(true)} src={TestailCoinImage} alt="Testail coin image" width={40} height={40} />
      </Stack>

      <MyModal
        open={open}
        setOpen={setOpen}
        haveIconClosed
        iconProps={{ width: 24, color: Colors.secondary }}
        sx={{
          maxHeight: "calc(100vh - 10rem)",
          overflow: "hidden",
          width: "min(27.5rem, 100vw - 1.5rem)",
        }}
      >
        <Typography fontSize={"1.5rem"} lineHeight={"2rem"} fontWeight={700} color="text.primary" textAlign={"center"} mb={3.2}>Testail Point</Typography>

        <Box display={"grid"} gridTemplateColumns={"1.2fr 0.8fr 1fr 0.8fr auto"} gap={1}>
          {/* Table Header */}
          < TableText gridColumn={"2 / span 2"} mb={1}>Normal hour</TableText>
          <TableText gridColumn={"auto / span 2"}>Golden hour</TableText>
          <TableText mb={1}>Bet amount</TableText>
          <TableText textTransform={"uppercase"} color={"secondary.400"}>lose</TableText>
          <TableText textTransform={"uppercase"} color={"#26BC7F"}>win</TableText>
          <TableText textTransform={"uppercase"} color={"secondary.400"}>lose</TableText>
          <TableText textTransform={"uppercase"} color={"#26BC7F"}>win</TableText>
          {/* Table Body */}
          {testailPointData.map((item, index) => {
            return (
              <RowItem
                key={index}
                betAmount={item.betAmount}
                normalLose={item.normalLose}
                normalWin={item.normalWin}
                goldenHourLose={item.goldenHourLose}
                goldenHourWin={item.goldenHourWin}
                lastItem={index == testailPointData.length - 1 ? true : false}
              />
            );
          })}
        </Box>
      </MyModal >
    </Box >
  );
}