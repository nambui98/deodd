import { useState, useEffect } from "react";
import MyModal from "components/common/Modal";
import { Colors } from "constants/index";
import { ButtonMain } from "components/ui/button";
import { Typography } from "@mui/material";

type UnstakeModalType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function ApproveModal({ open, setOpen }: UnstakeModalType) {

  return (
    <MyModal
      open={open}
      setOpen={setOpen}
      haveIconClosed
      iconProps={{ width: 24, color: Colors.secondary }}
      sx={{
        maxWidth: 352,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h2" sx={{
        fontWeight: 700,
        lineHeight: "2rem",
        textAlign: "center",
        mb: 2,
      }}>Congrats!!!</Typography>
      <Typography variant="body2" sx={{ textAlign: "center", mb: 3 }}>
        Now you are an NFT Holder! <br />
        Hope you have some great time with DeODD!
      </Typography>
      {/* <Typography variant="h3" sx={{ textAlign: "center", fontWeight: 600, lineHeight: "1.375rem", mb: 3 }}>Something went wrong!
        Please try again
      </Typography> */}
      <ButtonMain
        active={true}
        title={"Confirm"}
        fullWidth
        sx={{
          py: 2,
          px: 5,
          fontSize: "1rem",
          fontWeight: 600,
          lineHeight: "1.375rem",
          backgroundColor: "primary.300",
          mb: 2,
        }}
        onClick={() => { setOpen(false) }}
      />
    </MyModal>
  );
}

export default ApproveModal;