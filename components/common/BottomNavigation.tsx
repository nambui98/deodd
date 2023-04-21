import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { ChatBoxIcon, Close2Icon, CloseIcon, DashboardIcon, Flip2Icon, FlipIcon, LotteryIcon, LoyaltyIcon, MenuIcon, MessageIcon, ShopIcon } from 'utils/Icons';
import { Avatar, Box, Typography } from '@mui/material';
import { Avatar2Image, AvatarImage } from 'utils/Images';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

type Props = {
    handleOpenRightSidebar: VoidFunction,
    handleOpenLeftSidebar: VoidFunction,
    openLeft: boolean,
    openRight: boolean
}
export default function MyBottomNavigation({ handleOpenLeftSidebar, handleOpenRightSidebar, openLeft, openRight }: Props) {
    const [value, setValue] = React.useState('');
    const route = useRouter();
    console.log(route);

    const MENU_MOBILE = [
        {
            label: '',
            value: 'menu',
            icon: <MenuIcon fill="#96A5C0" />,
            iconActive: <Close2Icon fill="#fff" />,
            href: '',
            onClick: () => {
                console.log("aaaaaaaaaaaaaa");
                handleOpenLeftSidebar();

            }
        },
        {
            label: '',
            value: 'flip',
            icon: <Flip2Icon fill="#96A5C0" />,
            iconActive: <Flip2Icon fill="#fff" />,
            href: '/',
            onClick: () => { console.log('aaaaa', 123) }
        }, {
            label: '',
            value: 'lottery',
            icon: <LotteryIcon fill="#96A5C0" />,
            iconActive: <LotteryIcon fill="#fff" />,
            href: '/lottery',
            onClick: () => { }
        }, {
            label: '',
            value: 'avatar',
            icon: <Avatar sx={{ width: 32, height: 32 }} alt="" src={Avatar2Image} />,
            iconActive: <Avatar sx={{ width: 32, height: 32 }} alt="" src={Avatar2Image} />,
            href: '',
            onClick: () => { }
        },
        {
            label: '',
            value: 'chat',
            icon: <MessageIcon fill="#96A5C0" />,
            iconActive: <MessageIcon fill="#fff" />,
            href: '',
            onClick: () => {
                handleOpenRightSidebar();
            }
        },
    ]

    const valueCurrentActive: string | undefined = useMemo(() => MENU_MOBILE.find(menu => menu.href === route.pathname)?.value, [route.isReady])
    console.log(valueCurrentActive);
    useEffect(() => {
        if (valueCurrentActive) {
            setValue(valueCurrentActive);
        }
    }, [valueCurrentActive])

    useEffect(() => {
        if (openLeft === false && value === "menu") {
            setValue('');
        } else if (openLeft === true && value !== "menu") {
            handleOpenLeftSidebar();
        }
    }, [openLeft, value])
    useEffect(() => {
        if (openRight === false && value === "chat") {
            setValue('');
        }
        else if (openRight === true && value !== "chat") {
            handleOpenRightSidebar();
        }
    }, [openRight, value])
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }
    return (
        <BottomNavigation
            sx={{
                '&.MuiBottomNavigation-root': {
                    height: 65
                },
                '.MuiBottomNavigationAction-label': {
                    // display: 'none'
                    // py: 2,
                    height: 15,
                    transition: 'all .3s',
                    display: 'flex',
                    alignItems: 'center'
                },
                '.icon': {

                    transition: 'all .2s',
                },
                '.Mui-selected': {
                    height: "100%",
                    '.icon': {
                        height: 0,
                        opacity: 0
                    }
                },
            }}

            value={value} onChange={handleChange}>
            {
                MENU_MOBILE.map((menu, index) =>
                    <BottomNavigationAction
                        key={index}

                        LinkComponent={Link}
                        href={menu.href}
                        onClick={menu.onClick}
                        label={menu.iconActive}
                        value={menu.value}

                        icon={<Box className="icon">
                            {menu.icon}
                        </Box>}
                    />)
            }
        </BottomNavigation>
    );
}