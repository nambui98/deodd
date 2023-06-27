import { useState, useEffect } from "react";
import MyModal from "components/common/Modal";
import { Colors } from "constants/index";
import { ButtonLoading, ButtonMain } from "components/ui/button";
import { Typography } from "@mui/material";

type UnstakeModalType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function UnstakeModal({ open, setOpen }: UnstakeModalType) {
  const [stage, setStage] = useState(1);

  useEffect(() => {
    if (open) {
      setStage(1);
    }
  }, [open]);

  return (
    <MyModal
      open={open}
      setOpen={setOpen}
      haveIconClosed={stage === 3}
      iconProps={{ width: 24, color: Colors.secondary }}
      sx={{
        maxWidth: 352,
        backgroundColor: "background.paper",
      }}
    >
      {stage === 1 && <Typography variant="body2" textAlign={"center"} mb={3}>This current period is still on-going.
        You are not able to receive profit if you unstake right now. <br />
        Please wait till the end of this period to claim reward!</Typography>}
      {stage === 2 && <Typography variant="body2" textAlign={"center"} mb={3}>Do you sure want to unstake all the NFT?
        All the profit of this period will be degenerated to 0
        Comeback
        Yes</Typography>}
      {stage === 3 && <Typography variant="body2" textAlign={"center"} mb={3}>Unstake successfully</Typography>}

      <ButtonLoading
        fullWidth
        sx={{
          py: 2,
          px: 5,
          fontSize: "1rem",
          textTransform: 'none',
          fontWeight: 600,
          lineHeight: "1.375rem",
          backgroundColor: "primary.300",
          mb: 2,
        }}
        onClick={() => { setOpen(false) }}
      >

        {stage === 1 ? "Cancel" : stage === 2 ? "Comback" : "Confirm"}
      </ButtonLoading>
      {stage !== 3 && <ButtonLoading
        fullWidth
        sx={{
          py: 2,
          px: 5,
          fontSize: "1rem",
          fontWeight: 600,
          textTransform: 'none',
          lineHeight: "1.375rem",
          backgroundColor: "primary.300",
          color: "primary.main",
          borderColor: "primary.main",
        }}
        onClick={() => {
          if (stage < 3) {
            setStage(prev => prev + 1)
          } else {
            setOpen(false);
          }
        }}
      >

        {stage === 1 ? "Unstake anyway" : "Yes"}
      </ButtonLoading>}
    </MyModal>
  );
}

export default UnstakeModal;
