import { useEffect, useState } from "react";
import MyModal from "components/common/Modal";
import { Colors, DefaultRewardPool, SharePerNFT } from "constants/index";
import { Box, Stack, Typography, InputBase } from "@mui/material";
import { ButtonFourth } from "components/ui/button";
import { BnbIcon, InfoCircle2Icon } from "utils/Icons";
import { EnumNFT, TypeNFT } from "libs/types";
import { useQuery } from "@tanstack/react-query";
import { DeoddService } from "libs/apis";
import { Utils } from "@/utils/index";
import { Format } from "utils/format";
import { BigNumber, ethers } from "ethers";
import FormatNumber from "components/common/FormatNumber";

type StakingCalculatorType = {
  open: boolean;
  setOpen: Function;
  nftSelected?: TypeNFT | null,
  currentPool: any
}

function StakingCalculator({ open, setOpen, nftSelected, currentPool }: StakingCalculatorType) {
  console.log(currentPool);

  const [duration, setDuration] = useState<number>(1)
  // const { data, refetch: caculateEstProfit } = useQuery({
  //   queryKey: ["caculateEstProfit"],
  //   enabled: !!nftSelected && open,
  //   queryFn: () => DeoddService.caculateEstProfit({ typeNft: nftSelected!.type as EnumNFT, duration: duration }),
  //   select: (data: any) => {
  //     if (data.status === 200) {
  //       return data.data;
  //     } else {
  //       return undefined
  //     }
  //   },
  // });
  // useEffect(() => {
  //   if (duration) {
  //     caculateEstProfit();
  //   }
  // }, [caculateEstProfit, duration])

  // console.log(data);

  return (
    <MyModal
      open={open}
      setOpen={setOpen}
      haveIconClosed
      iconProps={{ width: 24, color: Colors.secondary }}
      sx={{
        backgroundColor: "background.paper",
        maxWidth: 544,
      }}
    >
      <Stack sx={{
      }}>
        <Typography variant="h2" sx={{
          fontWeight: 700,
          lineHeight: "2rem",
          alignSelf: "center",
        }}>Calculator</Typography>
        <Typography variant="body2" sx={{
          mb: 2,
        }}>
          Staked for
        </Typography>
        <Stack sx={{ flexDirection: "row", gap: 1, mb: 5 }}>
          <ButtonFourth active={duration === 1} onClick={() => { setDuration(1) }} label="1 Day" />
          <ButtonFourth active={duration === 7} onClick={() => { setDuration(7) }} label="7 Days" />
          <ButtonFourth active={duration === 30} onClick={() => { setDuration(30) }} label="30 Days" />
        </Stack>
        <Typography variant="body2" sx={{ mb: 1 }}>Total Reward Pool</Typography>
        <InputBase
          endAdornment={
            <BnbIcon width={20} height={20} color={Colors.primaryDark} />
          }
          inputComponent={FormatNumber as any}
          value={DefaultRewardPool}
          sx={{
            pointerEvents: 'none',
            backgroundColor: "primary.300",
            borderRadius: "0.5rem",
            px: 3,
            py: 2,
            mb: 3,
            input: {
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 400,
              ":focus::placeholder": {
                opacity: 0.2,
              }
            },
            "svg": {
              ml: 1,
            }
          }}
          fullWidth />
        <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Typography variant="body2">EST. Profit</Typography>
          <Stack sx={{ flexDirection: "row", gap: 1, mb: 3 }}>
            <Typography variant="body2">{
              nftSelected &&
              Format.formatMoney(Utils.calculatorProfit(nftSelected, 1, duration))
            }</Typography>
            <BnbIcon width={20} color={Colors.primaryDark} />
          </Stack>
        </Stack>
        <Stack sx={{
          flexDirection: "row",
          gap: 1,
          alignItems: "flex-start",
        }}>
          <Box>
            <InfoCircle2Icon width={20} />
          </Box>
          <Typography variant="body2">Estimated profit = Total Reward Pool * %share per NFT * NFT Amount * Staked Days / Season duration</Typography>
        </Stack>
      </Stack>
    </MyModal>
  );
}

export default StakingCalculator;
