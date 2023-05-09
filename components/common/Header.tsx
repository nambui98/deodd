import { Box, Container, Stack, Typography, styled, useMediaQuery } from "@mui/material";
import { useEffect, useState } from 'react';
import { useWalletContext } from "../../contexts/WalletContext";
import { TEXT_STYLE } from "../../styles/common";
import { Popup } from "./popup";
// import { Button } from "../ui/button";
import { ButtonSecondRemex } from "components/ui/button";
import { ethers } from 'ethers';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Link from "next/link";
import { LeftIcon } from "utils/Icons";
import { VolumeTurnOffImage, VolumnImage } from "utils/Images";
import { useColorModeContext } from '../../contexts/ColorModeContext';
import { UserInfo } from "components/ui/userInfo";
import Image from "next/image";
import { useSiteContext } from "contexts/SiteContext";
import { AudioPlay } from "libs/types";
import MyImage from "components/ui/image";

type Props = {}

function Header({ }: Props) {
  const { walletAddress, contractFeeManager } = useWalletContext()
  const { darkMode, setDarkMode } = useColorModeContext();
  const { audioPlayer, turnOffAudio, isTurnOffAudio } = useSiteContext();
  const md = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
  TimeAgo.addLocale(en)
  const timeAgo = new TimeAgo('en-US')
  const width520 = useMediaQuery('(min-width: 520px)')
  const [dataHistory, setDataHistory] = useState<any[]>([])
  const [popup, setPopup] = useState<{ status: boolean, body: any }>({
    status: false,
    body: <></>
  })
  const [statusLoading, setStatusLoading] = useState<boolean>(false)



  const bodyBalance = async () => {
    return (<Box >
      <BoxItemHistory >
        {dataHistory.length && await Promise.all(dataHistory.map(async (item, index) => {
          const currentFee = contractFeeManager?.calcTotalFee(ethers.utils.parseUnits(ethers.utils.formatUnits(`${item.amount}`)))
          return <ItemHistory key={index}>
            <Box>
              <TitleHistory >{item.flipResult ? 'Win' : 'Lost'}</TitleHistory>
              <BnbHistory active={item.flipResult}>
                {item.flipResult ? '+' : '-'}{ethers.utils.formatUnits(`${item.amount}`)} BNB
                <Box>Fee: {ethers.utils.formatUnits(currentFee)} BNB</Box>
              </BnbHistory>
            </Box>
            <TimeHistory>{item.blockTimestamp && timeAgo.format(item.blockTimestamp * 1000)}</TimeHistory>
          </ItemHistory>
        }))}
      </BoxItemHistory>
    </Box>)
  }

  useEffect(() => {
    const reRenderPopup = async () => {
      statusLoading && setPopup({ body: await bodyBalance(), status: true })
    }
    reRenderPopup()
  }, [statusLoading, bodyBalance])

  return <Container>
    <Stack height={{ md: 112, xs: 72 }} position={'relative'} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
      <ButtonSecondRemex
        aria-label="turn off, on audio"
        onClick={() => {
          turnOffAudio();
        }}
        sx={{
          padding: 1.5, minWidth: 0, borderRadius: 2,
          img: {
            transition: '.3s all'
          },
          svg: { stroke: 'none' }, '&:hover': {
            backgroundColor: 'neutral.A100',
            borderColor: 'transparent',
            '& img': {
              transform: 'scale(1.1)',
            }
          }
        }}
      >
        {
          isTurnOffAudio ? <MyImage src={VolumeTurnOffImage} alt="volume-off-icon" width={24} height={24} /> : <MyImage src={VolumnImage} alt="volume-on-icon" width={24} height={24} />
        }
      </ButtonSecondRemex>
      <Box position={'absolute'} left={'50%'} top={'50%'} sx={{ transform: 'translate(-50%, -50%)' }} >
        <Link href={"/"}>
          <Box position={'relative'} width={{ md: 105.19, xs: 65.5 }} height={{ md: 64, xs: 40 }} >

            <Image fill style={{ objectFit: "contain" }} alt="" src={`/assets/logos/logo${!darkMode ? '-light' : ''}.svg`} />
          </Box>
        </Link>
      </Box>
      <Box  >
        <UserInfo />
      </Box>
    </Stack>
    <Popup status={popup.status} handleClose={() => setPopup({ ...popup, status: false })} customWidth={{ width: '100%', maxWidth: '381px', padding: '16px' }} body={<Box>
      {popup.body}
    </Box>} />


  </Container>
}

export default Header


const BoxRight = styled(Box)({
  display: 'flex',
  alignItems: 'center'
})
const ItemRight = styled(Box)(() => ({
  ...TEXT_STYLE(12, 500, '#181536'),
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  background: '#181536',
  border: '2px solid ',
  borderColor: '#181536',
  borderRadius: 8,
  marginLeft: 8,
  '&.stats': {
    background: '#181536',
    '& > div': {
    }
  },
  '&.leadeboard': {
    '& > div': {
    }
  },
  '& .MuiInputBase-root': {
    ...TEXT_STYLE(14, 500),
    outline: 0,
    border: 0,
    '& svg': {
    },
    '& fieldset': {
      display: 'none'
    },
    '& .MuiSelect-select': {
      padding: '8px',
    }
  },
  '& span': {
    margin: '0 8px'
  }
}))
const HeaderPopup = styled(Box)({
  marginBottom: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
})
const HistoryPopup = styled(Typography)(() => ({
  ...TEXT_STYLE(14, 500),
  margin: '8px 0'
}))
const BoxItemHistory = styled(Box)(() => ({
  maxHeight: 400,
  overflow: 'auto',
  paddingRight: 10,
  '&::-webkit-scrollbar': {
    width: 4,
  },
  '&::-webkit-scrollbar-track': {
    background: '#E9EAEF',
    borderRadius: 10
  },
  '&::-webkit-scrollbar-thumb': {
    // background: `linear-gradient(180deg, ${props.themelight ? '#FC753F' : '#FEF156'} 2.08%, ${props.themelight ? '#FC753F' : '#FEF156'} 66.9%)`,
    borderRadius: 10
  },
  '&::-webkit-scrollbar-thumb:hover': {
    // background: `linear-gradient(180deg, ${props.themelight ? '#FC753F' : '#FEF156'} 2.08%, ${props.themelight ? '#FC753F' : '#FEF156'} 66.9%)`
  }
}))
const ItemHistory = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 0'
})
const TimeHistory = styled(Typography)({
  ...TEXT_STYLE(12, 500, '#A7ACB8')
})
type propsBnbHistory = {
  active: boolean,
}
const BnbHistory = styled(Typography)((props: propsBnbHistory) => ({
  display: 'flex',
  alignItems: 'flex-end',
  ...TEXT_STYLE(14, 500),
  '& > div': {
    ...TEXT_STYLE(10, 500, '#5A6178'),
    marginLeft: 4
  }
}))
const TitleHistory = styled(Typography)((props) => ({
  ...TEXT_STYLE(14, 400),
  marginBottom: 6
}))
