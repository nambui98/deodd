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
  const { openModalProvablyFair, setOpenModalProvablyFair } = useLotteryContext();
  const list = openModalProvablyFair.resultLottery?.random_values;
  const dataResultLotteryByDrawId = openModalProvablyFair.resultLottery;

  let randomValues: { key: string, value: number, valueIsExits: boolean }[] = []
  if (list) {
    list.forEach((randomValue: string, index: number) => {
      let countNotExits = randomValues.filter(obj => obj.valueIsExits === false).length
      if (countNotExits < 5) {
        let converterValue: number = parseFloat(randomValue.slice(-2)) % 25 + 1
        let checkValueExits = randomValues.some((obj) => obj.value === converterValue);
        randomValues.push({ key: randomValue, valueIsExits: checkValueExits, value: converterValue });
      }
      if (countNotExits === 5) {
        randomValues.push({ key: list[index], valueIsExits: false, value: parseFloat(list[index].slice(-2)) % 10 + 1 });
        return;
      }
    });
  }
  const styleTicket: Record<string, any> = {}
  if (openModalProvablyFair.ticketSelected) {
    openModalProvablyFair.ticketSelected.slice(0, 5).forEach((number, index) => {
      if (dataResultLotteryByDrawId?.res.slice(0, 5).every((e: number) => e !== number)) {
        styleTicket[`:nth-child(${index + 1})`] = {
          opacity: .3,
        }
      }
    })
    if (openModalProvablyFair.ticketSelected[5] !== dataResultLotteryByDrawId?.res[5]) {
      styleTicket[':last-child'] = {
        marginLeft: 'auto',
        opacity: 0.3,
        '> div': {
          ':nth-child(1)': {
            backgroundColor: 'secondary.main'
          },
          ':nth-child(2)': {
            backgroundColor: '#FFFCDD'
          },
          ':nth-child(3)': {
            backgroundColor: '#FFFCDD',
            opacity: .8

          },
        }
      }

    }
  }
  console.log("🚀 ~ file: ModalProvablyFair.tsx:32 ~ ModalProvablyFair ~ randomValues:", randomValues)

  // console.log("🚀 ~ file: ModalProvablyFair.tsx:32 ~ ModalProvablyFair ~ arr:", arr)
  // console.log("🚀 ~ file: ModalProvablyFair.tsx:18 ~ ModalProvablyFair ~ randomValues:", randomValues)
  return (
    <MyModal open={openModalProvablyFair.open} sx={{
      maxWidth: 736,
      width: 1,
      overflow: 'auto',
      maxHeight: { xs: "calc(100vh - 100px)", md: "100vh" },
      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.15)"
    }} haveIconClosed iconProps={{ width: 24, color: Colors.secondary }} setOpen={() => setOpenModalProvablyFair({ open: false, resultLottery: null, ticketSelected: [null, null, null, null, null, null] })}>
      <Typography textAlign={'center'} mb={3} variant='h5' fontWeight={700}>Provably Fair Ticket Detail</Typography>

      <Typography fontSize={16} fontWeight={600} color="white">Step 1: The request sent to VRF generates
        <Typography
          fontSize={'inherit'}
          component={'a'}
          sx={{ textDecoration: 'underline', textDecorationColor: 'secondary.main', textUnderlineOffset: 2 }}
          // href={`https://oracle.binance.com/docs/category/vrf/`}
          href={`${UrlBlockExplorer}/tx/${dataResultLotteryByDrawId?.txn?.replace("\\", '0')}`}
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
          randomValues?.map(({ key, value, valueIsExits }, index) => <Fragment key={key}>
            <Grid item xs={8} md={6}>
              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>

                <Typography variant='body2' fontWeight={500}>{Convert.convertWalletAddress(key.toString(), 4, 4)}</Typography>
                {
                  index !== randomValues.length - 1 ?

                    <Stack position={'relative'}>

                      <Typography variant='caption' color="secondary.100" fontWeight={400} position={'absolute'} top={-16} left={'50%'} sx={{ transform: 'translateX(-50%)' }}>
                        mode 25 + 1
                      </Typography>
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="6" viewBox="0 0 147 6" fill="none">
                        <path d="M1 2.5C0.723858 2.5 0.5 2.72386 0.5 3C0.5 3.27614 0.723858 3.5 1 3.5V2.5ZM147 3L142 0.113249V5.88675L147 3ZM1 3.5H5.05556V2.5H1V3.5ZM13.1667 3.5H21.2778V2.5H13.1667V3.5ZM29.3889 3.5H37.5V2.5H29.3889V3.5ZM45.6111 3.5H53.7222V2.5H45.6111V3.5ZM61.8333 3.5H69.9444V2.5H61.8333V3.5ZM78.0556 3.5H86.1667V2.5H78.0556V3.5ZM94.2778 3.5H102.389V2.5H94.2778V3.5ZM110.5 3.5H118.611V2.5H110.5V3.5ZM126.722 3.5H134.833V2.5H126.722V3.5Z" fill="#96A5C0" />
                      </svg>
                    </Stack>
                    :
                    <Stack position={'relative'}>

                      <Typography variant='caption' color="secondary.main" fontWeight={400} position={'absolute'} top={-16} left={'50%'} sx={{ transform: 'translateX(-50%)' }}>
                        mode 10 + 1
                      </Typography>
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="6" viewBox="0 0 147 6" fill="none">
                        <path d="M1 2.5C0.723858 2.5 0.5 2.72386 0.5 3C0.5 3.27614 0.723858 3.5 1 3.5V2.5ZM147 3L142 0.113249V5.88675L147 3ZM1 3.5H5.05556V2.5H1V3.5ZM13.1667 3.5H21.2778V2.5H13.1667V3.5ZM29.3889 3.5H37.5V2.5H29.3889V3.5ZM45.6111 3.5H53.7222V2.5H45.6111V3.5ZM61.8333 3.5H69.9444V2.5H61.8333V3.5ZM78.0556 3.5H86.1667V2.5H78.0556V3.5ZM94.2778 3.5H102.389V2.5H94.2778V3.5ZM110.5 3.5H118.611V2.5H110.5V3.5ZM126.722 3.5H134.833V2.5H126.722V3.5Z" fill={Colors.secondaryDark} />
                      </svg>
                    </Stack>
                }
              </Stack>
            </Grid>
            <Grid item xs={4} md={6}>
              {
                valueIsExits ?
                  <Stack direction={'row'} alignItems={'center'} gap={1}>
                    <Typography variant='body2' color={'secondary.100'} fontWeight={500}>{value}  </Typography>
                    <Typography variant='caption' color="secondary.500">already matched, not picked duplicate</Typography>
                  </Stack>
                  :
                  <Typography variant='body2' color={index !== randomValues.length - 1 ? 'white' : 'secondary.main'} fontWeight={500}>{value}</Typography>
              }
            </Grid>

          </Fragment>)
        }
      </Grid>
      <Box maxWidth={376}>

        <Typography variant='body2' fontWeight={500} mt={5} mb={2}>Result</Typography>
        <Ticket numbers={dataResultLotteryByDrawId?.res} />
        <Typography variant='body2' fontWeight={500} mt={3} mb={2}>Compare to your ticket</Typography>
        <Ticket numbers={openModalProvablyFair.ticketSelected} sx={{
          '> div': styleTicket
        }} />

      </Box>

    </MyModal>


  )
}

export default ModalProvablyFair