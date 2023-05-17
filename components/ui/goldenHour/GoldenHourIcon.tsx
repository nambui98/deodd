import { CountdownTimer } from "./CountdownTimer";
import { Stack } from "@mui/material";
import { MoneyBagImage } from 'utils/Images';
import MyImage from "../image";

export default function GoldenHourIcon() {
  return (
    <Stack gap={1} alignItems={"center"}>
      <MyImage src={MoneyBagImage} width={32} height={32} alt="Money bag icon" />
      <Stack bgcolor={"#26BC7F"} px={0.75} py={0.25} borderRadius={"4px"}>
        <CountdownTimer color={"#fff"} fontWeight={500} fontSize={"0.625rem"} lineHeight={"0.875rem"} />
      </Stack>
    </Stack>
  );
}