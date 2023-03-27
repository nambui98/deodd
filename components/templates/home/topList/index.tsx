import { useState, useEffect } from "react"
import { TEXT_STYLE } from "../../../../styles/common"
import { Box, BoxProps, ButtonProps, Stack, styled, Typography } from "@mui/material";
import Image from "next/image"
import { getRecentFlipping, getTopNetGains, getTopStreak } from "../../../../libs/apis/flipCoin";
// import { convertTimeStamp, convertWalletAddress } from "../../../../libs/utils/utils";
import { useWalletContext } from "../../../../contexts/WalletContext";
import { ethers } from "ethers";
import { propsTheme } from "../../../../pages/homepage";
import { useColorModeContext } from "../../../../contexts/ColorModeContext";
import { Convert } from "../../../../utils/convert";
import { RankingIcon } from "../../../common/icons";
type tabsType = tabsEnum;
enum tabsEnum {
  RECENT,
  TOPSTREAK,
  TOPNETGAINS
}
export const TopList = () => {
  const { walletAccount, userInfo, refresh } = useWalletContext()
  const { darkMode } = useColorModeContext();
  const [currentTab, setCurrentTab] = useState<tabsType>(tabsEnum.RECENT)
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      let res: any;
      if (currentTab === tabsEnum.RECENT) {
        res = await getRecentFlipping();
      } else if (currentTab === tabsEnum.TOPSTREAK) {
        res = await getTopStreak();
      } else {
        res = await getTopNetGains();
      }
      setIsLoading(false);
      if (res.status === 200) {
        setData(res.data.data);
      } else {
        setData([]);
      }
    }
    getData();
  }, [currentTab, refresh])


  const renderSubtitleData = (item: any) => {
    if (currentTab === tabsEnum.RECENT) {
      return item.flipResult ? (`flipped ${ethers.utils.formatUnits((item.amount ?? 0).toString())} and `) : `${ethers.utils.formatUnits((item.amount ?? 0).toString())} was flipped and slipped`
    }
    if (currentTab === tabsEnum.TOPSTREAK) {
      return `flipped ${ethers.utils.formatUnits((item.streakAmount ?? 0).toString())} and got a double ${item.maxStreakLength} times in a row`
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

  const MyhighestStreak = () => {
    const myData = data.length && !isLoading ? data.find((item: any) => item.wallet === walletAccount) : null;
    return myData ? myData.maxStreakLength : 0
  }

  return <Wrap>
    <TabTitle themelight={!darkMode}>
      <TabTitleItem themelight={!darkMode} active={currentTab === tabsEnum.RECENT} onClick={() => setCurrentTab(tabsEnum.RECENT)} style={{ marginRight: '8px' }}> <img alt="" src="assets/icons/clock.svg" /> Recent</TabTitleItem>
      <TabTitleItem themelight={!darkMode} active={currentTab === tabsEnum.TOPSTREAK} onClick={() => setCurrentTab(tabsEnum.TOPSTREAK)} style={{ marginRight: '8px' }}><img alt="" src={`assets/icons/cup${!darkMode ? '-light' : ''}.svg`} />Top streak</TabTitleItem>
      <TabTitleItem themelight={!darkMode} active={currentTab === tabsEnum.TOPNETGAINS} onClick={() => setCurrentTab(tabsEnum.TOPNETGAINS)}><RankingIcon fill={"#7071B3"} />  Top net gains</TabTitleItem>
    </TabTitle>
    <TabBody position={"relative"} themelight={!darkMode}>
      {data.length && !isLoading ? data.map((item: any, index) => (
        <TabItem themelight={!darkMode} key={index}>
          <AvtItem>
            {currentTab === tabsEnum.RECENT ? <img alt="" src={`assets/images/${checkAvatar((walletAccount && item.wallet === walletAccount) ? userInfo.avatar : item.avatarId?.toString())}.png`} /> :
              <img alt="" src={`assets/images/${checkAvatar((walletAccount && item.wallet === walletAccount) ? userInfo.avatar : item.avatarId?.toString())}.png`} />}
          </AvtItem>
          <div>
            <TitleItem themelight={!darkMode}>{item.userName ? item.userName : Convert.convertWalletAddress((item.wallet), 6, 3)}</TitleItem>
            <SubtitleItem themelight={!darkMode}>{renderSubtitleData(item)} {item.flipResult && currentTab === tabsEnum.RECENT && <span>doubled</span>}</SubtitleItem>
          </div>
          <TimeItem>{item.blockTimestamp && Convert.convertTimeStamp(item.blockTimestamp)}</TimeItem>
        </TabItem>
      )) : <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
        <img alt="" src={`assets/images/coin-empty${!darkMode ? '-light' : ''}.png`} />
        <Typography sx={{ ...TEXT_STYLE(16, 500, '#7071B3'), marginTop: '40px' }}>It’s look quiet here...</Typography>
      </Box>}
      {!isLoading && data.length && walletAccount && <YourHighest themelight={!darkMode}>
        <img alt="" src={`/assets/images/${checkAvatar(userInfo.avatar)}.png`} />
        <Box>
          My highest streak
          <Box>
            {MyhighestStreak()} <img alt="" src="/assets/icons/cup-black.svg" />
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
  backgroundColor: props.themelight ? '#F8F9FB' : '#181536',
  // maxWidth: 306,
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
  themelight: boolean,
}
const TabTitleItem = styled(Box)((props: tabTitleItemProp) => ({
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: props.themelight ? `${props.active ? '#25244B' : '#F8F9FB'}` : `${props.active ? '#25244B' : '#181536'}`,
  borderRadius: 8,
  ...TEXT_STYLE(14, 500, props.themelight ? props.active ? '#FFFFFF' : '#181536' : props.active ? '#FFFFFF' : '#7071B3'),
  width: 149,
  cursor: 'pointer',
  '& img': {
    marginRight: 8
  },
  '& svg': {
    fill: props.active ? "#fff" : "#7071B3",
    marginRight: 8
  }
}))
const TabBody = styled(Box)((props: propsTheme & BoxProps) => ({
  background: props.themelight ? '#FFFFFF' : '#181536',
  padding: 16,
  borderRadius: 12,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  border: props.themelight ? '2px solid #E9EAEF' : 0,
  maxHeight: "664px",
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '0.4em',
  },
  '&::-webkit-scrollbar-track': {
    // '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: props.themelight ? '#5A6178' : '#fff',

    // outline: '1px solid slategrey',
    borderRadius: '16px'
  },
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
  background: props.themelight ? '#F8F9FB' : '#25244B',
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
  ...TEXT_STYLE(16, 500, props.themelight ? '#181536' : '#FFFFFF'),
  marginBottom: 4
}))
const SubtitleItem = styled(Typography)((props: propsTheme) => ({
  ...TEXT_STYLE(14, 500, '#A7ACB8'),
  '& span': {
    color: props.themelight ? '#FC753F' : '#FEF156'
  }
}))
const TimeItem = styled(Typography)({
  ...TEXT_STYLE(12, 500, '#A7ACB8'),
  marginLeft: 'auto'
})
type yourHighest = {
  themelight: boolean
}
const YourHighest = styled(Box)((props: yourHighest) => ({
  width: '100%',
  padding: 4,
  borderRadius: 8,
  background: props.themelight ? '#FC753F' : '#FEF156',
  display: 'flex',
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
  '& > img': {
    marginRight: 8,
    maxWidth: 32,
  },
  '& > div': {
    textAlign: 'center',
    ...TEXT_STYLE(12, 500, props.themelight ? '#ffffff' : '#25244B'),
    '& div': {
      ...TEXT_STYLE(24, 500, props.themelight ? '#ffffff' : '#181536'),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& img': {
        marginLeft: 4,
        maxWidth: 20,
        filter: props.themelight ? 'invert(100%) sepia(0%) saturate(7446%) hue-rotate(1deg) brightness(116%) contrast(114%)' : 'none'
      }
    }
  }
}))