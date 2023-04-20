import { Box, Drawer as DrawerMobile, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';

import { Drawer } from 'components/ui/drawer';
import { Colors, DRAWER_WIDTH } from 'constants/index';
import { CampaignIcon, CoinFlipIcon, DashboardIcon, FlipIcon, HomeIcon, LoyaltyIcon, Ref2EarnIcon, ShopIcon } from 'utils/Icons';
import { LotteryImage, MoneyBagImage } from 'utils/Images';
import { Contact } from './Contact';
import Link from 'next/link';

type Props = {
    open: boolean;
    mobileOpen: boolean;
    handleDrawerToggle: VoidFunction;
    window?: () => Window;
}
type TypeSideBarItem = {
    icon?: JSX.Element,
    title?: string,
    path?: string,
    highLight?: boolean,
    highLightText?: boolean,
    disabledHover?: boolean,
    child?: JSX.Element,
    comming?: boolean,
    isOnlyComponent?: boolean
}
const SIDE_BAR_LEFT: TypeSideBarItem[] = [
    {
        icon: <HomeIcon />,
        title: 'Home',
        path: '/',
    },
    {
        icon: <CoinFlipIcon />,
        title: 'Coin Flip',
        path: '/',
        highLightText: true
    },
    {
        icon: <img src={MoneyBagImage} alt="" />,
        title: '',
        path: '/',
        highLight: true,
        disabledHover: true,
        child: <Stack width={'100%'} >
            <Typography variant='body2' color={'primary.200'}>Golden Hour start in</Typography>
            <Typography variant='h3' fontWeight={600} color={'primary.200'}>20:53:10</Typography>
        </Stack>
    },
    {
        icon: <DashboardIcon />,
        title: 'Dashboard',
        path: '/statistic',
    },
    {
        icon: <FlipIcon />,
        title: 'Flip',
        path: '/',
    },
    {
        icon: <CampaignIcon />,
        title: 'Campaign',
        path: '/campaign',
    },
    {
        icon: <Ref2EarnIcon />,
        title: 'Ref 2 Earn',
        path: '/referral',
    },
    {
        icon: <LoyaltyIcon />,
        title: 'Loyalty',
        path: '/loyalty',
    },
    {
        icon: <ShopIcon />,
        title: 'Shop',
        path: '/',
    },
    {
        isOnlyComponent: true,
        child: <Divider sx={{ mx: 3, mt: 3 }} />
    },
    {
        icon: <img src={LotteryImage} alt="" />,
        title: '',
        path: '/',
        comming: true,
        highLightText: false,
        disabledHover: true,
        child: <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
            <Typography variant='h3' fontWeight={600} color={'primary.main'}>Lottery</Typography>

        </Stack>
    },
    {
        isOnlyComponent: true,
        child: <Divider sx={{ mx: 3, mt: 1 }} />
    }
]


const styleButton = (item: TypeSideBarItem, open: boolean) => {
    return {
        minHeight: 48,
        justifyContent: open ? 'initial' : 'center',
        px: item.highLight ? 1.5 : 3,
        py: item.highLight ? 1 : 2,
        bgcolor: item.highLight && open ? 'secondary.main' : 'transparent',
        backgroundImage: item.highLight ? `url(assets/images/bg_button_sidebar.png)` : 'none',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        backgroundPosition: 'center',
        borderRadius: item.highLight ? 2 : 0,
        boxShadow: item.highLight ? '0px 2px 4px rgba(0, 0, 0, 0.15)' : '0px',
        mx: item.highLight ? 2 : 0,
        mt: 1,
        color: item.highLightText ? 'text.primary' : 'text.disabled',
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

        '&:hover': item.disabledHover ? {
            backgroundColor: item.highLight && open ? 'secondary.main' : 'transparent',
            backgroundSize: '110%',
        } : {
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

function LeftSidebar({ open, mobileOpen, handleDrawerToggle, window }: Props) {

    const container = window !== undefined ? () => window().document.body : undefined;
    const drawer = (
        <>
            <List>
                {SIDE_BAR_LEFT.map((item, index) => (
                    item.isOnlyComponent ? item.child :
                        <ListItem
                            key={item.path ?? '' + index}
                            disablePadding
                            sx={{ display: "block" }}
                        >
                            <Link href={item?.path ?? '/'}>
                                <ListItemButton sx={styleButton(item, open)}>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 2 : "auto",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    {item.child && (
                                        <Stack width={"100%"} display={open ? "block" : "none"}>
                                            {item.child}
                                        </Stack>
                                    )}
                                    {item.title && (
                                        <ListItemText
                                            primary={
                                                <Typography
                                                    variant="body2"
                                                    fontSize={item.highLightText ? 16 : 14}
                                                >
                                                    {item.title}
                                                </Typography>
                                            }
                                            sx={{ opacity: open ? 1 : 0 }}
                                        />
                                    )}
                                </ListItemButton>
                                {
                                    item?.comming &&
                                    <Box px={.75} py={.5} bgcolor={'secondary.400'} borderRadius={'4px 0px 0px 4px'} position={'absolute'} right={0} top={'50%'} sx={{
                                        transform: 'translateY(-50%)'
                                    }}>
                                        <Typography variant='h3' fontWeight={600} color={'primary.main'}>Coming soon</Typography>
                                    </Box>
                                }

                            </Link>
                        </ListItem>
                ))}

            </List>
            <Box mt={"auto"} width="100%">
                <Contact />
            </Box>

        </>
    );
    return (
        <Box
            component="nav"
            sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <DrawerMobile
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxShadow: '4px 0px 24px rgba(0, 0, 0, 0.25)',
                        boxSizing: 'border-box', width: DRAWER_WIDTH, bgcolor: 'primary.200', backgroundImage: 'none'
                    },
                }}
            >
                {drawer}
            </DrawerMobile>
            <Drawer
                variant="permanent"
                anchor="left"
                open={open}
                sx={{
                    display: { xs: 'none', md: 'block' },
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    );

}

export default LeftSidebar


