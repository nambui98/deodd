import { CountdownTimer } from "./CountdownTimer";
import { Stack } from "@mui/material";
import { MoneyBagImage, GoldenHourSidebarImage } from 'utils/Images';
import MyImage from "../image";
import { useSiteContext } from 'contexts/SiteContext';

export default function GoldenHourIcon() {
  const { isGoldenHour } = useSiteContext();

  return (
    <Stack gap={1} alignItems={"center"}>
      {isGoldenHour
        ? <MyImage src={GoldenHourSidebarImage} width={32} height={32} alt="Golden Hour icon" overflow="hidden" borderRadius="8px" boxShadow={"0px 2px 24px rgba(254, 241, 86, 0.8)"} />
        : <MyImage src={MoneyBagImage} width={32} height={32} alt="Money bag icon" />
      }
      <Stack bgcolor={isGoldenHour ? "text.secondary" : "#26BC7F"} px={0.75} py={0.25} borderRadius={"4px"}>
        <CountdownTimer color={isGoldenHour ? "primary.200" : "#fff"} fontWeight={500} fontSize={"0.625rem"} lineHeight={"0.875rem"} />
      </Stack>
    </Stack>
  );
}