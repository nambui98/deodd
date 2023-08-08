import { Box, Grid, Stack, Typography } from '@mui/material'
import MyModal from 'components/common/Modal'
import { ButtonFourth, ButtonLoading, ButtonSecondRemex } from 'components/ui/button'
import { Colors, UrlBlockExplorer } from 'constants/index'
import { useLotteryContext } from 'contexts/LotteryContext'
import React, { Fragment } from 'react'
import Ticket from './Ticket'
import { Utils } from '@/utils/index'
import { Format } from 'utils/format'
import { Convert } from 'utils/convert'

type Props = {}

const ModalProvablyFair = (props: Props) => {
  const { openModalProvablyFair, setOpenModalProvablyFair, dataLotteryBuyDrawId } = useLotteryContext();
  return (
    <MyModal open={openModalProvablyFair.open} sx={{
      maxWidth: 736,
      width: 1,
      overflow: 'auto',
      maxHeight: "100vh",
      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.15)"
    }} haveIconClosed iconProps={{ width: 24, color: Colors.secondary }} setOpen={() => setOpenModalProvablyFair({ open: false, ticketSelected: [null, null, null, null, null, null] })}>
      <Typography textAlign={'center'} mb={3} variant='h5' fontWeight={700}>Provably Fair Ticket Detail</Typography>

      <Typography fontSize={16} fontWeight={600} color="white">Step 1: The request sent to VRF generates
        <Typography
          fontSize={'inherit'}
          component={'a'}
          sx={{ textDecoration: 'underline', textDecorationColor: 'secondary.main', textUnderlineOffset: 2 }}
          // href={`https://oracle.binance.com/docs/category/vrf/`}
          href={`${UrlBlockExplorer}/tx/${dataLotteryBuyDrawId?.txn?.replace("\\", '0')}`}
          target="_blank"
          color="inherit">
          {" "} Binance Oracle VRF </Typography>
      </Typography>
      <Typography my={2} fontSize={16} fontWeight={600} color={"white"}>Step 2: DeODD system uses a module operator to pick the lucky number outcomes.</Typography>
      <Grid container columnSpacing={3.6} rowSpacing={2}>
        <Grid item xs={8} md={6}>
          <Typography fontSize={16} fontWeight={600}>20 numbers of VRF</Typography>
        </Grid>
        <Grid item xs={4} md={6}>
          <Typography fontSize={16} fontWeight={600}>Converter</Typography>
        </Grid>
        {
          dataLotteryBuyDrawId?.random_values?.map((randomValue) => <Fragment key={randomValue}>
            <Grid item xs={8} md={6}>
              <Stack direction={'row'} gap={{ xs: 4, md: 13.5 }} alignItems={'center'}>
                <Typography variant='body2' width={"50%"} fontWeight={500}>{Convert.convertWalletAddress(randomValue, 4, 4)}</Typography>
                <Stack position={'relative'}>
                  <Typography variant='caption' color="secondary.100" fontWeight={400} position={'absolute'} top={-16} left={'50%'} sx={{ transform: 'translateX(-50%)' }}>
                    %25
                  </Typography>
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="6" viewBox="0 0 147 6" fill="none">
                    <path d="M1 2.5C0.723858 2.5 0.5 2.72386 0.5 3C0.5 3.27614 0.723858 3.5 1 3.5V2.5ZM147 3L142 0.113249V5.88675L147 3ZM1 3.5H5.05556V2.5H1V3.5ZM13.1667 3.5H21.2778V2.5H13.1667V3.5ZM29.3889 3.5H37.5V2.5H29.3889V3.5ZM45.6111 3.5H53.7222V2.5H45.6111V3.5ZM61.8333 3.5H69.9444V2.5H61.8333V3.5ZM78.0556 3.5H86.1667V2.5H78.0556V3.5ZM94.2778 3.5H102.389V2.5H94.2778V3.5ZM110.5 3.5H118.611V2.5H110.5V3.5ZM126.722 3.5H134.833V2.5H126.722V3.5Z" fill="#96A5C0" />
                  </svg>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={4} md={6}>
              <Typography variant='body2' fontWeight={500}>{parseFloat(randomValue.slice(-2)) % 25 + 1}</Typography>
            </Grid>

          </Fragment>)
        }
      </Grid>
      <Box maxWidth={376}>

        <Typography variant='body2' fontWeight={500} mt={5} mb={2}>Result</Typography>
        <Ticket numbers={dataLotteryBuyDrawId?.res} />
        <Typography variant='body2' fontWeight={500} mt={3} mb={2}>Compare to your ticket</Typography>
        <Ticket numbers={openModalProvablyFair.ticketSelected} />

      </Box>

    </MyModal>


  )
}

export default ModalProvablyFair