import { Box, Drawer as DrawerMobile, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';

import { Drawer } from 'components/ui/drawer';
import { Colors, DRAWER_WIDTH } from 'constants/index';
import { CampaignIcon, CoinFlipIcon, DashboardIcon, FlipIcon, HomeIcon, LoyaltyIcon, Ref2EarnIcon, ShopIcon } from 'utils/Icons';
import { LotteryImage, MoneyBagImage } from 'utils/Images';
import { Contact } from './Contact';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import React from 'react';
import MyImage from "components/ui/image";
import { GoldenHour } from 'components/ui/goldenHour';
import { useSiteContext } from 'contexts/SiteContext';

type Props = {
    open: boolean;
    mobileOpen: boolean;
    handleDrawerToggle: VoidFunction;
    window?: () => Window;
}
type TypeSideBarItem = {
    id: number,
    icon?: JSX.Element,
    title?: string,
    path?: string,
    highLight?: boolean,
    highLightText?: boolean,
    disabledHover?: boolean,
    child?: JSX.Element,
    comming?: boolean,
    isOnlyComponent?: boolean,
    isActive?: boolean,
    isLink?: boolean
}
const SIDE_BAR_LEFT: TypeSideBarItem[] = [
    {
        id: 1,
        icon: <HomeIcon />,
        title: 'Home',
        path: '/',
        isLink: true,
    },
    {
        id: 2,
        icon: <CoinFlipIcon />,
        title: 'Coin Flip',
        path: '/',
        highLightText: true,
        isLink: true,
    },
    {
        id: 3,
        icon: <MyImage src={MoneyBagImage} width={40} height={40} alt="" />,
        title: '',
        path: '/',
        highLight: true,
        disabledHover: true,
        child: <GoldenHour />,
        isLink: true
    },
    {
        id: 4,
        icon: <DashboardIcon />,
        title: 'Dashboard',
        path: '/statistic',
        isLink: true,
    },
    {
        id: 5,
        icon: <FlipIcon />,
        title: 'Flip',
        path: '/',
        isLink: true
    },
    {
        id: 6,
        icon: <Ref2EarnIcon />,
        title: 'Ref 2 Earn',
        path: '/referral',
        isLink: true
    },
    {
        id: 7,
        icon: <CampaignIcon />,
        title: 'Campaign',
        path: '/campaign',
        isLink: true
    },
    {
        id: 8,
        icon: <LoyaltyIcon />,
        title: 'Loyalty',
        path: '/loyalty',
        isLink: true
    },
    {
        id: 9,
        icon: <ShopIcon />,
        title: 'Shop',
        path: '/shop',
        isLink: true
    },
    {
        id: 10,
        isOnlyComponent: true,
        child: <Divider sx={{ mx: 3, mt: 3 }} />
    },
    {
        id: 11,
        icon: <MyImage src={LotteryImage} width={32} height={32} alt="" />,
        title: '',
        path: '/',
        comming: true,
        highLightText: false,
        disabledHover: true,
        child: <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
            <Typography variant='h3' fontWeight={600} color={'primary.main'}>Lottery</Typography>

        </Stack>,
        isLink: true
    },
    {
        id: 12,
        isOnlyComponent: true,
        child: <Divider sx={{ mx: 3, mt: 1 }} />
    }
]


const styleButton = (item: TypeSideBarItem, open: boolean, isGoldenHour: boolean) => {
    return {
        minHeight: 48,
        justifyContent: open ? 'initial' : 'center',
        px: item.highLight ? 1.5 : 3,
        py: item.highLight ? 1 : 2,
        bgcolor: item.highLight && open ? isGoldenHour ? 'rgba(255, 252, 221, 1)' : 'secondary.main' : 'transparent',
        backgroundImage: item.highLight ? isGoldenHour ? `url(assets/images/golden-hour-bg.png)` : `url(assets/images/bg_button_sidebar.png)` : 'none',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        backgroundPosition: 'center',
        borderRadius: item.highLight ? 2 : 0,
        boxShadow: item.highLight ? isGoldenHour ? '0px 2px 24px 0px rgba(254, 241, 86, 0.8)' : '0px 2px 4px rgba(0, 0, 0, 0.15)' : '0px',
        mx: item.highLight ? 2 : 0,
        mt: 1,
        color: item.isActive ? 'secondary.main' : item.highLightText ? 'text.primary' : 'text.disabled',
        transition: '.3s all',
        svg: {
            fill: item.isActive ? Colors.secondaryDark : Colors.secondary
        },
        '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            width: item.isActive ? 1 : 0,
            backgroundImage: 'linear-gradient(90deg, rgba(254, 241, 86, 0.3) 0%, rgba(254, 241, 86, 0) 100%);',
            transition: '.3s all',
        },

        '&:hover': item.disabledHover || item.isActive ? {
            backgroundColor: item.highLight && open ? isGoldenHour ? 'rgba(255, 252, 221, 1)' : 'secondary.main' : 'transparent',
            backgroundSize: '110%',
        } : {
            color: 'primary.main',
            backgroundColor: 'transparent',
            svg: {
                fill: Colors.white
            },
            '&::before': {
                // width: '100%',
            }
        }
    }
}

function LeftSidebar({ open, mobileOpen, handleDrawerToggle, window }: Props) {
    const [idActive, setIdActive] = useState<number | undefined>();
    const route = useRouter();
    const idCurrentActive: number | undefined = useMemo(() => SIDE_BAR_LEFT.find(menu => menu.path === route.pathname)?.id, [route.pathname])
    const container = window !== undefined ? () => window().document.body : undefined;
    const { isGoldenHour } = useSiteContext();
    useEffect(() => {
        if (idCurrentActive) {
            setIdActive(idCurrentActive);
        } else {
            setIdActive(undefined);
        }
    }, [idCurrentActive])

    const handleSetActive = (id: number | undefined) => {
        // debugger
        if (id !== idActive) {
            setIdActive(prev => prev !== id ? id : prev);
        }
        if (mobileOpen) {
            handleDrawerToggle();
        }
    }


    const drawer = (
        <>
            <List>
                {SIDE_BAR_LEFT.map((item, index) => {
                    item.isActive = idActive === item.id;
                    return (
                        item.isOnlyComponent ? item.child :
                            <ListItem
                                key={item.id ?? '' + index}
                                disablePadding
                                sx={{ display: "block" }}
                            >
                                <ListItemButton LinkComponent={item.isLink && route.asPath !== item.path ? Link : undefined} href={route.asPath !== item.path && item?.path ? item?.path : ''} onClick={() => handleSetActive(item.id)} className={item.id === idActive ? 'active' : ''} sx={styleButton(item, open, isGoldenHour)}>
                                    {/* If is currently golden hour then remove item of item 3 */}
                                    {isGoldenHour && item.id == 3
                                        ? ""
                                        : (<ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 2 : "auto",
                                                justifyContent: "center",
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>)}
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
                                    item?.comming && open &&
                                    <Box px={.75} py={.5} bgcolor={'secondary.400'} borderRadius={'4px 0px 0px 4px'} position={'absolute'} right={0} top={'50%'} sx={{
                                        transform: 'translateY(-50%)'
                                    }}>
                                        <Typography variant='h3' fontWeight={600} color={'primary.main'}>Coming soon</Typography>
                                    </Box>
                                }

                            </ListItem>
                    )
                })}

            </List>
            <Box display={open ? 'block' : 'none'} mt={"auto"} width="100%">
                <Contact />
            </Box>

        </>
    );
    return (
        <Box
            component="nav"
            sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { sm: 0 }, position: 'relative' }}
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
                    display: { xs: 'block', md: 'none', },
                    '& .MuiDrawer-paper': {
                        paddingBottom: 8,
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
                    '&:after': {
                        content: '""',
                        position: 'fixed',
                        left: open ? DRAWER_WIDTH : (theme) => theme.spacing(8.5),
                        background: isGoldenHour ? 'radial-gradient(50% 50% at 50% 50%, #FEF156 0%, rgba(254, 241, 86, 0) 100%)' : '',
                        filter: 'blur(20px)',
                        width: 30,
                        height: '100vh',
                        pointerEvents: 'none',
                        zIndex: (theme) => theme.zIndex?.appBar + 1,
                        transition: (theme) => theme.transitions.create('left', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    },
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    );

}

export default React.memo(LeftSidebar)


