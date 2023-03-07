import { Box, Button, CircularProgress, Typography, styled, useMediaQuery } from "@mui/material";
import { useEffect, useState } from 'react';
import { useWalletContext } from "../../contexts/WalletContext";
import { Container, TEXT_STYLE } from "../../styles/common";
import { Popup } from "./popup";
// import { Button } from "../ui/button";
import { ethers } from 'ethers';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { Colors } from '../../constants';
import { useColorModeContext } from '../../contexts/ColorModeContext';
import { getHistory } from '../../libs/apis/flipCoin';
import { getCalculateFee, handleClaimAll } from '../../libs/flipCoinContract';
import { propsTheme } from '../../pages/homepage';
import { Format } from '../../utils/format';
import { ButtonMain } from '../ui/button';
import { ArrowDownIcon, CampaignIcon, MedalStarIcon, PeopleIcon } from './icons';


export const Header: React.FC = () => {
  const { bnbAssets, refresh, setRefresh, walletAccount, ethersSigner } = useWalletContext()
  const { darkMode, setDarkMode } = useColorModeContext();
  TimeAgo.addLocale(en)
  const timeAgo = new TimeAgo('en-US')
  const width520 = useMediaQuery('(min-width: 520px)')
  const [statusSelect, setStatusSelect] = useState<any>(0)
  const [dataHistory, setDataHistory] = useState<any[]>([])
  const [popup, setPopup] = useState<{ status: boolean, body: any }>({
    status: false,
    body: <></>
  })
  const [statusLoading, setStatusLoading] = useState<boolean>(false)

  const fetchHistory = async () => {
    const res = await getHistory(walletAccount, 0)
    if (res.status === 200 && res.data.data.length) {
      setDataHistory(res.data.data)
    }
  }

  const handleClaim = async () => {
    if (!statusLoading && parseFloat(bnbAssets) > 0) {
      setStatusLoading(true)
      try {
        const res = await handleClaimAll(ethersSigner)
        if (res.status) {
          setStatusLoading(false)
          setPopup({ status: true, body: bodyPopupSuccess })
          setRefresh(!refresh)
        }
      } catch (error: any) {
        setStatusLoading(false)
        setPopup({ status: true, body: bodyPopupError(error.reason || 'Something went wrong. Please try again!') })
      }
    }
  }

  const bodyPopupError = (message: string) => {
    return (
      <Box sx={{ textAlign: 'center', maxWidth: '304px', margin: 'auto' }}>
        <Box><img src='assets/icons/close-circle.svg' /></Box>
        <Typography sx={{ ...TEXT_STYLE(14, 500, !darkMode ? '#181536' : '#ffffff'), margin: '24px 0' }}>{message}</Typography>
        <ButtonMain active={true} title={'Try again'} onClick={() => setPopup({ ...popup, status: false })} customStyle={{ width: '100%' }} />
      </Box>
    )
  }

  const bodyPopupSuccess = (
    <Box sx={{ textAlign: 'center', maxWidth: '304px', margin: 'auto' }}>
      <Typography sx={{ ...TEXT_STYLE(24, 500, !darkMode ? '#181536' : '#ffffff'), marginBottom: '24px' }}>Claim successful!</Typography>
      <ButtonMain active={true} title={'OKEY'} onClick={() => setPopup({ ...popup, status: false })} customStyle={{ width: '100%' }} />
    </Box>
  )

  const bodyBalance = async () => {
    return (<Box >
      <HeaderPopup>
        <Box sx={{ ...TEXT_STYLE(14, 500, !darkMode ? '#181536' : '#FFFFFF'), '& img': { marginRight: '8px' } }}>Your balance: {Format.formatMoney(bnbAssets)} <img src={`assets/icons/binance-coin${!darkMode ? '-light' : ''}.svg`} /></Box>
        <ButtonMain active={parseFloat(bnbAssets) ? true : false} disable={parseFloat(bnbAssets) ? false : true} title={statusLoading ? <CircularProgress sx={{ width: '25px !important', height: 'auto !important' }} color="inherit" /> : 'CLAIM ALL'} onClick={handleClaim} customStyle={{ width: 160 }} />
      </HeaderPopup>
      <HistoryPopup themeLight={!darkMode}>History</HistoryPopup>
      <BoxItemHistory themeLight={!darkMode}>
        {dataHistory.length && await Promise.all(dataHistory.map(async (item, index) => {
          const currentFee = await getCalculateFee(ethersSigner, ethers.utils.formatUnits(`${item.amount}`))
          return <ItemHistory key={index}>
            <Box>
              <TitleHistory themeLight={!darkMode}>{item.flipResult ? 'Win' : 'Lost'}</TitleHistory>
              <BnbHistory themeLight={!darkMode} active={item.flipResult}>
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
    walletAccount && ethersSigner && fetchHistory()
  }, [walletAccount, ethersSigner, refresh])

  useEffect(() => {
    const reRenderPopup = async () => {
      statusLoading && setPopup({ body: await bodyBalance(), status: true })
    }
    reRenderPopup()
  }, [statusLoading])

  return <Wrap>
    <Container>
      <Inner>
        <Logo><img src={`assets/logos/logo${!darkMode ? '-light' : ''}.svg`} /></Logo>
        <BoxRight>

          <ItemRight themeLight={!darkMode}><Typography fontStyle={"normal"} textTransform={"none"} color={"secondary"} marginRight={1}>Campain</Typography> <CampaignIcon fill={darkMode ? Colors.primaryDark : Colors.primary} /> </ItemRight>
          <ItemRight themeLight={!darkMode}><Typography fontStyle={"normal"} textTransform={"none"} color={"secondary"} marginRight={1}>Ref2Earn</Typography> <PeopleIcon fill={darkMode ? Colors.primaryDark : Colors.primary} /> </ItemRight>
          <ItemRight themeLight={!darkMode}><Typography fontStyle={"normal"} textTransform={"none"} color={"secondary"} marginRight={1}>Loyalty</Typography> <MedalStarIcon fill={darkMode ? Colors.primaryDark : Colors.primary} /> </ItemRight>
          {/* <ItemRight themeLight={!darkMode}><img src={`assets/icons/volume-high${darkMode ? "" : '-light'}.svg`} /></ItemRight>
          <ItemRight themeLight={!darkMode} onClick={() => { setDarkMode(!darkMode) }}><img src={`assets/icons/${darkMode ? 'moon' : 'sun'}.svg`} /></ItemRight> */}
          {/* <ItemRight themeLight={!darkMode} className='stats'><BoxStats>Stats</BoxStats></ItemRight> */}
          {walletAccount && (width520 ?
            <>
              <ItemRight themeLight={!darkMode} onClick={async () => setPopup({ body: await bodyBalance(), status: true })}> <span>Assets</span></ItemRight>
              <ItemRight themeLight={!darkMode} onClick={async () => setPopup({ body: await bodyBalance(), status: true })}>BALANCE <span>{Format.formatMoney(bnbAssets)}</span> <img src={`assets/icons/binance-coin${!darkMode ? '-light' : ''}.svg`} /></ItemRight>
            </>
            :
            <ItemRight themeLight={!darkMode} onClick={async () => setPopup({ body: await bodyBalance(), status: true })}><img src="assets/icons/wallet.svg" /></ItemRight>
          )}

          <ItemRight themeLight={!darkMode}><ArrowDownIcon fill={darkMode ? Colors.secondaryDark : Colors.secondary} /> </ItemRight>
        </BoxRight>
      </Inner>
    </Container>
    <Popup status={popup.status} handleClose={() => setPopup({ ...popup, status: false })} customWidth={{ width: '100%', maxWidth: '381px', padding: '16px' }} body={<Box>
      {popup.body}
    </Box>} />
  </Wrap>
}

const Wrap = styled(Box)({
})
const Inner = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '16px 0',
  '@media (min-width: 800px)': {
    padding: '22px 0',
  }
})
const Logo = styled(Box)({

})
const BoxRight = styled(Box)({
  display: 'flex',
  alignItems: 'center'
})
const HeaderItem = styled(Button)({
  ...TEXT_STYLE(12, 500),
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  background: 'text',
  border: '2px solid ',
  borderRadius: 8,
  marginLeft: 8,
  // '&.stats': {
  //   background: props.themeLight ? '#E9EAEF' : '#181536',
  //   '& > div': {
  //     color: props.themeLight ? '#181536 !important' : ''
  //   }
  // },
  // '&.leadeboard': {
  //   '& > div': {
  //     color: props.themeLight ? '#181536 !important' : ''
  //   }
  // },
  // '& .MuiInputBase-root': {
  //   ...TEXT_STYLE(14, 500, props.themeLight ? '#181536' : '#7071B3'),
  //   outline: 0,
  //   border: 0,
  //   '& svg': {
  //     color: props.themeLight ? 'transparent' : '#7071B3'
  //   },
  //   '& fieldset': {
  //     display: 'none'
  //   },
  //   '& .MuiSelect-select': {
  //     padding: '8px',
  //   }
  // },
  // '& span': {
  //   ...TEXT_STYLE(14, 500, props.themeLight ? '#181536' : '#7071B3'),
  //   margin: '0 8px'
  // }
})
const ItemRight = styled(Box)((props: propsTheme) => ({
  ...TEXT_STYLE(12, 500, props.themeLight ? '#181536' : '#FFFFFF'),
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  background: props.themeLight ? '#FFFFFF' : '#181536',
  border: '2px solid ',
  borderColor: props.themeLight ? '#E9EAEF' : '#181536',
  borderRadius: 8,
  marginLeft: 8,
  '&.stats': {
    background: props.themeLight ? '#E9EAEF' : '#181536',
    '& > div': {
      color: props.themeLight ? '#181536 !important' : ''
    }
  },
  '&.leadeboard': {
    '& > div': {
      color: props.themeLight ? '#181536 !important' : ''
    }
  },
  '& .MuiInputBase-root': {
    ...TEXT_STYLE(14, 500, props.themeLight ? '#181536' : '#7071B3'),
    outline: 0,
    border: 0,
    '& svg': {
      color: props.themeLight ? 'transparent' : '#7071B3'
    },
    '& fieldset': {
      display: 'none'
    },
    '& .MuiSelect-select': {
      padding: '8px',
    }
  },
  '& span': {
    ...TEXT_STYLE(14, 500, props.themeLight ? '#181536' : '#7071B3'),
    margin: '0 8px'
  }
}))
const HeaderPopup = styled(Box)({
  marginBottom: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
})
const HistoryPopup = styled(Typography)((props: propsTheme) => ({
  ...TEXT_STYLE(14, 500, props.themeLight ? '#181536' : '#7071B3'),
  margin: '8px 0'
}))
const BoxItemHistory = styled(Box)((props: propsTheme) => ({
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
    background: `linear-gradient(180deg, ${props.themeLight ? '#FC753F' : '#FEF156'} 2.08%, ${props.themeLight ? '#FC753F' : '#FEF156'} 66.9%)`,
    borderRadius: 10
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: `linear-gradient(180deg, ${props.themeLight ? '#FC753F' : '#FEF156'} 2.08%, ${props.themeLight ? '#FC753F' : '#FEF156'} 66.9%)`
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
  themeLight: boolean
}
const BnbHistory = styled(Typography)((props: propsBnbHistory) => ({
  display: 'flex',
  alignItems: 'flex-end',
  ...TEXT_STYLE(14, 500, props.themeLight ? props.active ? '#FC753F' : '#A7ACB8' : props.active ? '#FEF156' : '#A7ACB8'),
  '& > div': {
    ...TEXT_STYLE(10, 500, '#5A6178'),
    marginLeft: 4
  }
}))
const TitleHistory = styled(Typography)((props: propsTheme) => ({
  ...TEXT_STYLE(14, 400, props.themeLight ? '#181536' : '#FFFFFF'),
  marginBottom: 6
}))
const BoxStats = styled(Box)({
  ...TEXT_STYLE(14, 500, '#7071B3')
})
const Leadeboard = styled(Box)({
  ...TEXT_STYLE(14, 500, '#FEF156'),
  display: 'flex',
  alignItems: 'center',
  '& img': {
    marginLeft: 8,
    maxWidth: 20
  }
})