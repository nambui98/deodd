import { useState } from "react";
import MyModal from "components/common/Modal";
import { Colors } from "constants/index";
import { Box, Stack, Typography, InputBase } from "@mui/material";
import { ButtonFourth } from "components/ui/button";
import { BnbIcon, InfoCircle2Icon } from "utils/Icons";

type StakingCalculatorType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function StakingCalculator({ open, setOpen }: StakingCalculatorType) {
  const [stakePeriod, setStakePeriod] = useState(1);

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
          <ButtonFourth active={stakePeriod === 1} onClick={() => { setStakePeriod(1) }} label="1 Day" />
          <ButtonFourth active={stakePeriod === 2} onClick={() => { setStakePeriod(2) }} label="7 Days" />
          <ButtonFourth active={stakePeriod === 3} onClick={() => { setStakePeriod(3) }} label="30 Days" />
        </Stack>
        <Typography variant="body2" sx={{ mb: 1 }}>Total Reward Pool</Typography>
        <InputBase
          // {...register("username", {
          //   onChange: (e) => {
          //     setValue("username", e.target.value.split(" ").join("").replaceAll(/[^a-zA-Z0-9!@#\$%\^\&\~\*\(\)_\+`\-=\[\]\\{}|;':",\.<>\/\?]/g, ''))
          //   }
          // })}
          endAdornment={
            <BnbIcon width={20} height={20} color={Colors.primaryDark} />
          }
          type="number"
          sx={{
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
            <Typography variant="body2">1.534</Typography>
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
