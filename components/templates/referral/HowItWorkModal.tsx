import { useState } from "react";
import { Stack, Typography, Box } from "@mui/material";
import { NotiIcon } from "utils/Icons";
import { ButtonMain } from "components/ui/button";
import { HowRef2EarnWorkImage } from "utils/Images";
import MyImage from "components/ui/image";
import MyModal from "components/common/Modal";

export default function HowItWorkModal() {
  const [open, setOpen] = useState(false);
  function handleOpen() { setOpen(true) };
  function handleClose() { setOpen(false) };
  return (
    <Box>
      <Stack mt={5} direction={'row'} justifyContent={'center'} alignItems={'center'}>
        <Box onClick={handleOpen} sx={{ cursor: "pointer", fontSize: 0 }} >
          <NotiIcon />
        </Box>
        <Typography ml={1} variant='body2' textAlign={'center'} onClick={handleOpen} sx={{ cursor: "pointer" }} >
          How it works
        </Typography>
      </Stack>

      <MyModal
        aria-labelledby="how-ref-works-modal"
        open={open}
        setOpen={setOpen}
        sx={{
          boxShadow: "0px 0px 40px rgba(112, 113, 179, 0.3)",
          width: "min(46rem, 100vw - 1.5rem)",
        }}
      >
        <Stack
          gap={3}
          alignItems={"center"}
          sx={{
            maxHeight: "calc(100vh - 12rem)",
            overflow: "hidden",
            backgroundColor: "primary.200",
            borderRadius: "8px",
          }}>
          <Typography variant="h2" fontWeight={700}>How it works</Typography>

          <Stack sx={{ gap: { xs: 0, sm: 2, md: 3 }, maxHeight: "38.25rem", overflowY: "auto" }}>
            <Stack gap={2} width={1}>
              <Typography variant="h3" textTransform={"uppercase"} fontWeight={600} color={"secondary.main"} >how to refer</Typography>
              <Typography variant="body2" fontWeight={400} lineHeight={"1.25rem"}>
                STEP 1: Copy your referral link <br />
                STEP 2: Send it to your friends <br />
                STEP 3: Enjoy the game and receive profit from each time your friends flipped <br />
                STEP 4: Invite more friends! <br />
                Remember: It’s not valid to refer player who already had a flip or used another ref link before
              </Typography>
            </Stack>
            <Stack gap={2} width={1}>
              <MyImage src={HowRef2EarnWorkImage} width={"100%"} height={295} alt="How ref2earn works" />
              <Typography variant="h3" textTransform={"uppercase"} fontWeight={600} color={"secondary.main"} >profit from referral</Typography>
              <Typography variant="body2" fontWeight={400} lineHeight={"1.25rem"}>
                -For each flip, players will pay a small amount of fee, which is called service fee <br />
                -From that,a certain portion will be deducted and turn into profit for referrer <br />
                -For each friend that you directly referred, you will have 365 days to receive referral reward from their flips and their friends’ flips (if any). <br />
                Thenceforth, there is no more share from them.
              </Typography>
            </Stack>
          </Stack>

          <ButtonMain
            active={true}
            sx={{ width: 1, minHeight: "3.375rem", fontWeight: 600 }}
            title={"Got it"}
            onClick={handleClose}
          />
        </Stack>
      </MyModal>
    </Box >
  );
}