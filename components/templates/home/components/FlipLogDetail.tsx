import { Box, Stack, Typography } from "@mui/material";
import { UrlBlockExplorer } from "constants/index";
import { StatusGame, useGameContext } from "contexts/GameContext";
import { LeftIcon } from "utils/Icons";
import { Convert } from "utils/convert";
import { Format } from "utils/format";

export default function FlipLogDetail({ isShowing }: { isShowing?: boolean }) {
  const { gameResult, setStatusGame } = useGameContext();
  const isEven = gameResult?.coinSide === 0 ? (gameResult.isWinner ? true : false) : (gameResult?.isWinner ? false : true)

  return (
    <Stack gap={{ xs: 3, md: 5 }} display={isShowing ? 'flex' : 'none'} mt={{ xl: -5, md: -1, xs: 0 }} px={{ xs: 0, lg: 10, xl: 20 }} >
      <Stack gap={3}  >
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
          <>
            <Typography variant="body2">1</Typography>
            <Typography variant="body2" component={'span'} color={"secondary.100"} lineHeight={'20px'}>
              You choose
              &nbsp;
              <Typography component={'span'} fontSize={'inherit'} color="secondary.main">{gameResult?.coinSide === 0 ? 'Head' : 'Tail'}</Typography> for
              &nbsp;
              <Typography component={'span'} fontSize={'inherit'} color="secondary.main">{Format.formatMoney(gameResult?.amount ?? 0)} BNB</Typography>
            </Typography>
            <Stack rowGap={1}>
              {/* <Typography variant="body2" textAlign={"right"} color={"secondary.main"}>-{Format.formatMoney(gameResult?.amount ?? 0)}</Typography>
            <Typography variant="body2" textAlign={"right"} color={"secondary.main"}>-{Format.formatMoney((gameResult?.serviceFeePercent ?? 0) * (gameResult?.amount ?? 0))}</Typography> */}
            </Stack>
          </>
          <>
            <Typography variant="body2">2</Typography>
            <Typography variant="body2" color={"secondary.100"} lineHeight={'20px'}>
              The request sent to VRF generates
              &nbsp;
              <Typography
                fontSize={'inherit'}
                component={'a'}
                sx={{ textDecoration: 'underline', textDecorationColor: 'secondary.main', textUnderlineOffset: 2 }}
                href={`${UrlBlockExplorer}/tx/${gameResult?.fulfilled_txn?.replace("\\", '0')}`}
                target="_blank"
                color="secondary.main">
                {Convert.convertWalletAddress(gameResult?.vrfRn ?? '0', 4, 5)}
              </Typography>
              , Which is equivalent to
              &nbsp;
              <Typography component={'span'} fontSize={'inherit'} color="secondary.main">{Convert.convertWalletAddress(gameResult?.vrfRn ?? '0', 4, 5)}</Typography>
              &nbsp;
              in the decimal system.
            </Typography>
            <Typography variant="body2" textAlign={"right"} color={"secondary.main"}>-{Format.formatMoney(gameResult?.vrfRbFeeBNB ?? 0)}</Typography>
          </>
          <>
            <Typography variant="body2">3</Typography>
            <Typography variant="body2" color={"secondary.100"} lineHeight={'20px'}>
              Your choice was
              &nbsp;
              <Typography component={'span'} fontSize={'inherit'} color="secondary.main">
                {gameResult?.coinSide === 0 ? 'Head' : 'Tail'}
              </Typography>,
              &nbsp;
              which
              &nbsp;
              <Typography component={'span'} fontSize={'inherit'} color="secondary.main">
                {gameResult?.isWinner ? "matched" : "did not match"}
              </Typography>,
              &nbsp;
              the random number assignment -
              &nbsp;
              <Typography component={'span'} fontSize={'inherit'} color="secondary.main">
                {isEven ? 'Even-Head' : 'Odd-Tail'}
              </Typography>
            </Typography>
            <Box>
            </Box>
          </>
          {
            gameResult?.isWinner ?
              <>
                <Typography variant="body2">4</Typography>
                <Typography variant="body2" color={"secondary.100"} lineHeight={'20px'}>
                  Congratulations!!! You double and the DeODD Management System will send the rewards directly to your wallet!
                </Typography>
                <Typography variant="body2" textAlign={"right"} color={"secondary.main"}>+{Format.formatMoney(gameResult.amount * 2)}</Typography>
              </>
              :
              <>
                <Typography variant="body2">4</Typography>
                <Typography variant="body2" color={"secondary.100"} lineHeight={'20px'}>
                  Aww too bad! You slipped, wish you luck next time!
                </Typography>
                <Box></Box>
              </>
          }
        </Box>
        <Typography mt={-2} variant="body2" lineHeight={"1.25rem"} textAlign={'center'} color={"secondary.100"}>-End-</Typography>
      </Stack>
      <Box ml={2}>
        <Typography variant="body2" color={"secondary.100"} lineHeight={'20px'} ml={-2}>Overall rule</Typography>
        <Stack component={'ul'} sx={{ listStyle: 'auto' }}>
          <Typography variant="body2" color={"secondary.100"} lineHeight={'20px'} component={'li'}>
            After a user finishes choosing Head or Tail, a request will be sent to Binance Oracle Verifiable Random Function (VRF).
          </Typography>
          <Typography variant="body2" color={"secondary.100"} lineHeight={'20px'} component={'li'}>
            The VRF will then generate a random number in hexadecimal format, which will then be converted to decimal for determining the Head/Tail outcome.
          </Typography>
          <Box ml={-2} mb={3}>
            <Typography variant="body2" color={"secondary.100"} lineHeight={'20px'} >
              Note:
            </Typography>
            <Typography variant="body2" color={"secondary.100"} lineHeight={'20px'} >
              __To check your hexadecimal number, visit the transaction link in BSC. From the first log, take a look at the second line in the Data section.
            </Typography>
            <Typography variant="body2" color={"secondary.100"} lineHeight={'20px'} >
              __You can use any online converter to convert a hexadecimal number to a decimal number.
            </Typography>
          </Box>
          <Typography variant="body2" color={"secondary.100"} lineHeight={'20px'} component={'li'}>
            The DeODD Management System receives the result from VRF and determines whether the result and the user&apos;s choice is matched or not.
          </Typography>
          <Box ml={-2} mb={3}>
            <Typography variant="body2" color={"secondary.100"} lineHeight={'20px'} >
              Note:
            </Typography>
            <Typography variant="body2" color={"secondary.100"} lineHeight={'20px'} >
              __Head is assigned for Even numbers.
            </Typography>
            <Typography variant="body2" color={"secondary.100"} lineHeight={'20px'} >
              __Tail is assigned for Odd numbers.
            </Typography>
          </Box>
          <Typography variant="body2" color={"secondary.100"} lineHeight={'20px'} component={'li'}>
            The DeODD management system will send rewards to the user based on their flip result.
          </Typography>
        </Stack>

      </Box>
    </Stack>

  );
}