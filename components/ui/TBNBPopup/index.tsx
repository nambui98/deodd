import { useState } from "react";
import { Typography, Stack, Box, styled } from "@mui/material";
import MyModal from "components/common/Modal";
import { Colors } from "constants/index";
import { ButtonSecondRemex } from "../button";
import { BnbIcon } from "utils/Icons";

const LinkButton = (props: any) => (
  <ButtonSecondRemex sx={{
    backgroundColor: props.bgColor,
    color: "text.primary",
    border: "none",
    textTransform: "none",
    px: 5,
    py: 1,
    ":hover": {
      backgroundColor: props.bgColor,
      color: "text.primary",
      border: "none",
    }
  }}>
    {props.children}
  </ButtonSecondRemex >
)

export default function TBNBPopup() {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(true);
  }

  return (
    <>
      <ButtonSecondRemex onClick={handleOpen} sx={{
        backgroundColor: "secondary.main",
        boxShadow: "0px 2px 16px rgba(254, 241, 86, 0.5)",
        color: "primary.200",
        textTransform: "none",
        px: 1.5,
        py: 1.25,
        width: 1,
        svg: {
          border: "none",
          stroke: "transparent",
        },
        ":hover": {
          color: "primary.200",
          svg: {
            stroke: "transparent",
            border: "none"
          },
          boxShadow: "0px 2px 10px rgba(254, 241, 86, 0.5)",

        }
      }}>
        <BnbIcon width={20} />
        <Typography variant="body2" fontWeight={400} lineHeight={"1.25rem"} ml={1}>
          Get tBNB now
        </Typography>
      </ButtonSecondRemex>

      <MyModal
        open={open}
        setOpen={setOpen}
        haveIconClosed
        iconProps={{
          width: 24,
          color: Colors.secondary,
        }}
        sx={{
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Stack gap={3} justifyContent={"center"} alignItems={"center"}>
          <Typography variant="h2" fontWeight={700} lineHeight={"2rem"}>How to get BNB testnet</Typography>
          <Typography variant="body2" fontWeight={400} lineHeight={"1.25rem"}>There are 2 ways you can retrieve tBNB to join Testnet:</Typography>
          <Stack direction={"row"} gap={3}>
            <a href="https://discord.com/invite/bnbchain" target="_blank" rel="noreferrer">
              <LinkButton bgColor="#647ACE">
                <Typography variant="body2" fontWeight={400} lineHeight={"1.25rem"}>
                  Via Discord
                </Typography>
              </LinkButton>
            </a>
            <Stack alignItems={'center'}>
              <a href="https://faucet.quicknode.com/binance-smart-chain/bnb-testnet" target="_blank" rel="noreferrer">
                <LinkButton bgColor={"#1A92E8"}>
                  <Typography variant="body2" fontWeight={400} lineHeight={"1.25rem"}>
                    Via Twitter
                  </Typography>
                </LinkButton>
              </a>
              <Typography variant="caption" color="dark.60" mt={1}>(ETH deposit required)</Typography>

            </Stack>

          </Stack>
          <Typography variant="body2" fontWeight={400} lineHeight={"1.25rem"}>For detail guideline,{" "}
            <Box component={"span"} sx={{ textDecoration: "underline" }}>
              <a href="https://medium.com/@deodd.io/how-to-get-tbnb-to-join-deodd-testnet-2d4bacdddbb6" target="_blank" rel="noreferrer">
                click here
              </a>
            </Box>
          </Typography>
        </Stack>
      </MyModal>
    </>
  );
}