import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';

import { Drawer } from 'components/ui/drawer';
import { Colors } from 'constants/index';
import { CampaignIcon, CoinFlipIcon, DashboardIcon, FlipIcon, HomeIcon, LoyaltyIcon, Ref2EarnIcon, ShopIcon } from 'utils/Icons';
import { LotteryImage, MoneyBagImage } from 'utils/Images';
import { Contact } from './Contact';

type Props = {
    open: boolean;
}
const SIDE_BAR_LEFT = [
    {
        icon: <HomeIcon />,
        title: 'Home',
        path: '/',
    },
    {
        icon: <CoinFlipIcon />,
        title: 'Coin Flip',
        path: '/',
        hightLightText: true
    },
    {
        icon: <img src={MoneyBagImage} alt="" />,
        title: '',
        path: '/',
        hightLight: true,
        child: <Stack width={'100%'}>
            <Typography variant='body2' color={'primary.200'}>Golden Hour start in</Typography>
            <Typography variant='h3' fontWeight={600} color={'primary.200'}>20:53:10</Typography>
        </Stack>
    }, {
        icon: <DashboardIcon />,
        title: 'Dashboard',
        path: '/',
    }, {
        icon: <FlipIcon />,
        title: 'Flip',
        path: '/',
    }, {
        icon: <CampaignIcon />,
        title: 'Campaign',
        path: '/',
    }, {
        icon: <Ref2EarnIcon />,
        title: 'Ref 2 Earn',
        path: '/',
    }, {
        icon: <LoyaltyIcon />,
        title: 'Loyalty',
        path: '/',
    },
    {
        icon: <ShopIcon />,
        title: 'Shop',
        path: '/',
    },
]

const SIDE_BAR_LEFT_BOTTOM = [
    {
        icon: <img src={LotteryImage} alt="" />,
        title: '',
        path: '/',
        // hightLight: true,
        hightLightText: false,
        child: <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
            <Typography variant='h3' fontWeight={600} color={'primary.main'}>Lottery</Typography>
            <Box px={.75} py={.5} bgcolor={'secondary.400'} borderRadius={'4px 0px 0px 4px'} mr={-3}>
                <Typography variant='h3' fontWeight={600} color={'primary.main'}>Coming soon</Typography>
            </Box>
        </Stack>
    },
]
const styleButton = (item: any, open: boolean) => {
    return {
        minHeight: 48,
        justifyContent: open ? 'initial' : 'center',
        px: item.hightLight ? 1.5 : 3,
        py: item.hightLight ? 1 : 2,
        bgcolor: item.hightLight && open ? 'secondary.main' : 'transparent',
        borderRadius: item.hightLight ? 2 : 0,
        boxShadow: item.hightLight ? '0px 2px 4px rgba(0, 0, 0, 0.15)' : '0px',
        mx: item.hightLight ? 2 : 0,
        mt: 1,
        color: item.hightLightText ? 'text.primary' : 'text.disabled',
        transition: '.3s all',
        svg: {
            fill: Colors.secondary
        },
        '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            width: 0,
            backgroundImage: 'linear-gradient(90deg, rgba(254, 241, 86, 0.3) 0%, rgba(254, 241, 86, 0) 100%);',
            transition: '.3s all',
        },
        '&:hover': {
            color: 'secondary.main',
            svg: {
                fill: Colors.secondaryDark
            },
            '&::before': {
                width: '100%',
            }
        }
    }
}
function LeftSidebar({ open }: Props) {
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            open={open}
        >
            <List>
                {SIDE_BAR_LEFT.map((item, index) => (
                    <ListItem key={item.path + index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={styleButton(item, open)}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 2 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            {
                                item.child && <Stack width={'100%'} display={open ? 'block' : 'none'}>
                                    {item.child}
                                </Stack>
                            }
                            {
                                item.title &&
                                <ListItemText primary={<Typography variant='body2' fontSize={item.hightLightText ? 16 : 14}  >{item.title}</Typography>} sx={{ opacity: open ? 1 : 0 }} />
                            }
                        </ListItemButton>
                    </ListItem>
                ))}

                <Divider sx={{ mx: 3, mt: 3 }} />
                {SIDE_BAR_LEFT_BOTTOM.map((item, index) => (
                    <ListItem key={item.path + index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{ ...styleButton(item, open), mt: index !== 0 ? 1 : 0, py: 3 }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 2 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            {
                                item.child && <Stack width={'100%'} display={open ? 'block' : 'none'}>
                                    {item.child}
                                </Stack>
                            }
                            {
                                item.title &&
                                <ListItemText primary={<Typography variant='body2' fontSize={item?.hightLightText ? 16 : 14}  >{item.title}</Typography>} sx={{ opacity: open ? 1 : 0 }} />
                            }
                        </ListItemButton>
                    </ListItem>
                ))}
                <Divider sx={{ mx: 3 }} />
            </List>
            <Box mt={'auto'} width="100%">
                <Contact />
            </Box>
        </Drawer>
    )
}

export default LeftSidebar


