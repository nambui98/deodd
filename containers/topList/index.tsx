import { useState, useEffect } from "react"
import { TEXT_STYLE } from "../../styles/common"
import { Box, BoxProps, ButtonProps, Stack, styled, Typography } from "@mui/material";
import { getRecentFlipping, getTopStreak } from "../../libs/apis/flipCoin";
import { convertTimeStamp, convertWalletAddress } from "../../libs/utils/utils";
import { useWalletContext } from "../../contexts/WalletContext";
import { ethers } from "ethers";
import { propsTheme } from "../../pages/homepage";

export const TopList = () => {
  const { walletAccount, userInfo, ethersSigner, refresh, theme } = useWalletContext()
  const [currentTab, setCurrentTab] = useState<'recent' | 'top'>('recent')
  const [recentData, setRecentData] = useState<any[]>([])
  const [topData, setTopData] = useState<any[]>([])

  const getDataList = async (type: 'recent' | 'top') => {
    const res = type === 'recent' ? await getRecentFlipping(0) : await getTopStreak(0)
    if (res.status === 200 && res.data.data.length) {
      type === 'recent' ? setRecentData(res.data.data) : setTopData(res.data.data)
    }
  }

  const renderSubtitleData = (item: any) => {
    if (currentTab === 'recent') {
      return item.flipResult ? (`flipped ${ethers.utils.formatUnits(item.amount.toString())} and `) : `${ethers.utils.formatUnits(item.amount.toString())} was flipped and slipped`
    }
    if (currentTab === 'top') {
      return `flipped ${ethers.utils.formatUnits(item.streakAmount.toString())} and got a double ${item.maxStreakLength} times in a row`
    }
  }

  const checkAvatar = (avatar: string) => {
    switch (avatar) {
      case '0': return 'avatar-yellow'
      case '1': return 'avatar-orange'
      case '2': return 'avatar-pink'
      case '3': return 'avatar-violet'
      case '4': return 'avatar-green'
    }
  }

  useEffect(() => {
    getDataList(currentTab)
  }, [currentTab, ethersSigner, refresh])

  useEffect(() => {
    getDataList('top')
  }, [])

  const MyhighestStreak = () => {
    const data = topData.length ? topData.filter((item: any) => item.walletAddress === walletAccount) : []
    return data.length ? data[0].maxStreakLength : 0
  }

  return <Wrap>
    <TabTitle themeLight={theme === 'light'}>
      <TabTitleItem themeLight={theme === 'light'} active={currentTab === 'recent'} onClick={() => setCurrentTab('recent')} style={{ marginRight: '8px' }}><img src="assets/icons/clock.svg" /> Recent</TabTitleItem>
      <TabTitleItem themeLight={theme === 'light'} active={currentTab === 'top'} onClick={() => setCurrentTab('top')}><img src={`assets/icons/cup${theme === 'light' ? '-light' : ''}.svg`} /> Top streak</TabTitleItem>
    </TabTitle>
    <TabBody themeLight={theme === 'light'}>
      {recentData.length || topData.length ? (currentTab === 'recent' ? recentData : topData).map((item: any, index) => (
        <TabItem themeLight={theme === 'light'} key={index}>
          <AvtItem>
            {currentTab === 'recent' ? <img src={`assets/images/${checkAvatar((walletAccount && item.player === walletAccount) ? userInfo.avatar : item.avatarId.toString())}.png`} /> :
              <img src={`assets/images/${checkAvatar((walletAccount && item.walletAddress === walletAccount) ? userInfo.avatar : item.avatarId.toString())}.png`} />}
          </AvtItem>
          <div>
            <TitleItem themeLight={theme === 'light'}>{item.playerName ? item.playerName : convertWalletAddress((currentTab === 'recent' ? item.player : item.walletAddress), 6, 3)}</TitleItem>
            <SubtitleItem themeLight={theme === 'light'}>{renderSubtitleData(item)} {item.flipResult && currentTab === 'recent' && <span>doubled</span>}</SubtitleItem>
          </div>
          <TimeItem>{item.blockTimestamp && convertTimeStamp(item.blockTimestamp)}</TimeItem>
        </TabItem>
      )) : <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
        <img src={`assets/images/coin-empty${theme === 'light' ? '-light' : ''}.png`} />
        <Typography sx={{ ...TEXT_STYLE(16, 500, '#7071B3'), marginTop: '40px' }}>It’s look quiet here...</Typography>
      </Box>}
      {(recentData.length || topData.length) && walletAccount && <YourHighest themeLight={theme === 'light'}>
        <img src={`/assets/images/${checkAvatar(userInfo.avatar)}.png`} />
        <Box>
          My highest streak
          <Box>
            {MyhighestStreak()} <img src="/assets/icons/cup-black.svg" />
          </Box>
        </Box>
      </YourHighest>}
    </TabBody>
  </Wrap>
}

const Wrap = styled(Box)({

})
const TabTitle = styled(Box)((props: propsTheme) => ({
  display: 'flex',
  marginBottom: 8,
  backgroundColor: props.themeLight ? '#F8F9FB' : '#181536',
  maxWidth: 306,
  borderRadius: 8,
  marginRight: 'auto',
  marginLeft: 'auto',
  '@media (min-width: 800px)': {
    marginLeft: 'auto',
    marginRight: 0,
    marginBottom: 13,
  }
}))
type tabTitleItemProp = {
  active: boolean,
  themeLight: boolean,
}
const TabTitleItem = styled(Box)((props: tabTitleItemProp) => ({
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: props.themeLight ? `${props.active ? '#31373E' : '#F8F9FB'}` : `${props.active ? '#25244B' : '#181536'}`,
  borderRadius: 8,
  ...TEXT_STYLE(14, 500, props.themeLight ? props.active ? '#FFFFFF' : '#181536' : props.active ? '#FFFFFF' : '#7071B3'),
  width: 149,
  cursor: 'pointer',
  '& img': {
    marginRight: 8
  }
}))
const TabBody = styled(Box)((props: propsTheme) => ({
  background: props.themeLight ? '#FFFFFF' : '#181536',
  padding: 16,
  borderRadius: 12,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  border: props.themeLight ? '2px solid #E9EAEF' : 0,
  '@media (min-width: 800px)': {
    minHeight: 500,
  }
}))
const TabItem = styled(Box)((props: propsTheme) => ({
  padding: '4px 12px',
  borderRadius: 8,
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  background: props.themeLight ? '#F8F9FB' : '#25244B',
  marginBottom: 8,
  '&:last-of-type': {
    marginBottom: 0
  }
}))
const AvtItem = styled(Box)({
  marginRight: 8,
  '& img': {
    maxWidth: 32
  }
})
const TitleItem = styled(Typography)((props: propsTheme) => ({
  ...TEXT_STYLE(16, 500, props.themeLight ? '#181536' : '#FFFFFF'),
  marginBottom: 4
}))
const SubtitleItem = styled(Typography)((props: propsTheme) => ({
  ...TEXT_STYLE(14, 500, '#A7ACB8'),
  '& span': {
    color: props.themeLight ? '#FC753F' : '#FEF156'
  }
}))
const TimeItem = styled(Typography)({
  ...TEXT_STYLE(12, 500, '#A7ACB8'),
  marginLeft: 'auto'
})
type yourHighest = {
  themeLight: boolean
}
const YourHighest = styled(Box)((props: yourHighest) => ({
  width: '100%',
  padding: 4,
  borderRadius: 8,
  background: props.themeLight ? '#FC753F' : '#FEF156',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& > img': {
    marginRight: 8,
    maxWidth: 32,
  },
  '& > div': {
    textAlign: 'center',
    ...TEXT_STYLE(12, 500, props.themeLight ? '#ffffff' : '#25244B'),
    '& div': {
      ...TEXT_STYLE(24, 500, props.themeLight ? '#ffffff' : '#181536'),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& img': {
        marginLeft: 4,
        maxWidth: 20,
        filter: props.themeLight ? 'invert(100%) sepia(0%) saturate(7446%) hue-rotate(1deg) brightness(116%) contrast(114%)' : 'none'
      }
    }
  }
}))