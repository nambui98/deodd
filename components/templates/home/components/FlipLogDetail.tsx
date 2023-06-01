import { Box, Stack, Typography } from "@mui/material";
import { StatusGame, useGameContext } from "contexts/GameContext";
import { LeftIcon } from "utils/Icons";
import { Convert } from "utils/convert";
import { Format } from "utils/format";

export default function FlipLogDetail({ isShowing }: { isShowing?: boolean }) {
  const { gameResult, setStatusGame } = useGameContext();
  const isEven = gameResult?.coinSide === 0 ? (gameResult.isWinner ? true : false) : (gameResult?.isWinner ? false : true)

  return (
    <Stack gap={3} mt={{ xl: -5, md: -1, xs: 0 }} px={{ xs: 0, lg: 10, xl: 20 }} display={isShowing ? 'flex' : 'none'}>
      <Stack direction={'row'} columnGap={2} sx={{ cursor: 'pointer' }} onClick={() => setStatusGame(StatusGame.FLIP)}>

        <LeftIcon stroke="#fff" />
        <Typography variant="body2" fontWeight={500}>Back</Typography>
      </Stack>
      <Typography variant="h2" fontSize={"1.5rem"} fontWeight={700} color={"#fff"} alignSelf={"flex-start"} textTransform={"capitalize"}>flipping log detail</Typography>
      <Box
        display={"grid"}
        gridTemplateColumns={"1fr 5.6fr 1fr"}
        rowGap={3}
      >
        <Typography variant="body2" >Step</Typography>
        <Typography variant="body2" >Activities Log</Typography>
        <Typography variant="body2" textAlign={"right"}>BNB</Typography>
        {/* <Empty /> */}
        <>
          <Typography variant="body2">1</Typography>
          <Typography variant="body2" color={"secondary.100"} lineHeight={'20px'}>
            You choose [{gameResult?.coinSide === 0 ? 'Head' : 'Tail'}] for [{Format.formatMoney(gameResult?.amount ?? 0)} BNB]
          </Typography>
          <Stack rowGap={1}>

            <Typography variant="body2" textAlign={"right"} color={"secondary.main"}>-{Format.formatMoney(gameResult?.amount ?? 0)}</Typography>
            <Typography variant="body2" textAlign={"right"} color={"secondary.main"}>-{Format.formatMoney((gameResult?.serviceFeePercent ?? 0) * (gameResult?.amount ?? 0))}</Typography>
          </Stack>


        </>
        <>
          <Typography variant="body2">2</Typography>
          <Typography variant="body2" color={"secondary.100"} lineHeight={'20px'}>

            Request is sent to <Typography fontSize={'inherit'} sx={{ textDecoration: 'underline', textDecorationColor: '#55C8FC', textUnderlineOffset: 2 }} color="#55C8FC" component={'a'} href="https://oracle.binance.com/docs/category/vrf/" target="_blank" > Binance Oracle VRF </Typography>(Verifiable Random Function)
          </Typography>
          <Typography variant="body2" textAlign={"right"} color={"secondary.main"}></Typography>


        </>
        <>
          <Typography variant="body2">3</Typography>
          <Typography variant="body2" color={"secondary.100"} lineHeight={'20px'}>
            VRF is generating random number
          </Typography>
          <Typography variant="body2" textAlign={"right"} color={"secondary.main"}></Typography>


        </>
        <>
          <Typography variant="body2">4</Typography>
          <Typography variant="body2" color={"secondary.100"} lineHeight={'20px'}>
            Generating completed! Your random number is
            <Typography fontSize={'inherit'} component={'a'} sx={{ textDecoration: 'underline', textDecorationColor: 'secondary.main', textUnderlineOffset: 2 }} href={`https://testnet.bscscan.com/tx/${gameResult?.fulfilled_txn?.replace("\\", '0')}`} target="_blank" color="secondary.main"> {Convert.convertWalletAddress(gameResult?.vrfRn ?? '0', 4, 5)} </Typography>
            <br />
            VRF is sending result to DeODD Management System
          </Typography>
          <Typography variant="body2" textAlign={"right"} color={"secondary.main"}>-{Format.formatMoney(gameResult?.vrfRbFeeBNB ?? 0)}</Typography>
        </>
        <>
          <Typography variant="body2">5</Typography>
          <Typography variant="body2" color={"secondary.100"} lineHeight={'20px'}>
            The result is sent successfully to DeODD Management System. Processing your number...
            <br />
            According to the mechanism:
            <br />
            You number is <Typography component={'span'} color="secondary.main" fontSize={'inherit'}> {isEven ? 'even' : 'odd'}</Typography>, which corresponds to <Typography component={'span'} color='secondary.main' fontSize={'inherit'}>{isEven ? 'Head' : 'Tail'}</Typography>
            <br />
            It’s determined {gameResult?.isWinner ? '' : 'NOT'} to match your selection
          </Typography>
          <Typography variant="body2" textAlign={"right"} color={"secondary.main"}></Typography>
        </>
        {
          gameResult?.isWinner &&
          <>
            <Typography variant="body2">6</Typography>
            <Typography variant="body2" color={"secondary.100"} lineHeight={'20px'}>
              DeODD Management System sends the reward directly to your wallet.
            </Typography>
            <Typography variant="body2" textAlign={"right"} color={"secondary.main"}>+{Format.formatMoney(gameResult.amount * 2)}</Typography>
          </>
        }

        <>
          <Typography variant="body2">{gameResult?.isWinner ? 7 : 6}</Typography>
          <Typography variant="body2" color={"secondary.100"} lineHeight={'20px'}>
            DeODD Management System finalizes the result and sends to client.
          </Typography>
          <Typography variant="body2" textAlign={"right"} color={"secondary.main"}></Typography>
        </>
        {/* {dummyData.map(item => <RowItem key={item.step} step={item.step} activities={item.log} fee={item.fee} />)} */}
      </Box>
      <Typography variant="body2" lineHeight={"1.25rem"} textAlign={'center'} color={"secondary.100"}>-End-</Typography>
    </Stack>
  );
}