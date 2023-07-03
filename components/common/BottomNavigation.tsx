import { Avatar, Box } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useWalletContext } from 'contexts/WalletContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Archive2Icon, ArchiveIcon, Close2Icon, Flip2Icon, LotteryIcon, MenuIcon, MessageIcon } from 'utils/Icons';
import { Avatar2Image } from 'utils/Images';
import { checkAvatar } from 'utils/checkAvatar';

type Props = {
    handleOpenRightSidebar: VoidFunction,
    handleOpenLeftSidebar: VoidFunction,
    openLeft: boolean,
    openRight: boolean
}
export default function MyBottomNavigation({ handleOpenLeftSidebar, handleOpenRightSidebar, openLeft, openRight }: Props) {
    const { userInfo } = useWalletContext();
    const [value, setValue] = useState('');
    const route = useRouter();

    const MENU_MOBILE = [
        {
            label: '',
            value: 'menu',
            icon: <MenuIcon fill="#96A5C0" />,
            iconActive: <Close2Icon fill="#fff" />,
            href: '',
            onClick: () => {
                handleOpenLeftSidebar();
            }
        },
        {
            label: '',
            value: 'flip',
            icon: <Flip2Icon fill="#96A5C0" />,
            iconActive: <Flip2Icon fill="#fff" />,
            href: '/',
            onClick: () => { }
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
            icon: <Archive2Icon width={'32px'} height={'32px'} fill="#96A5C0" />,
            iconActive: <Archive2Icon width={'32px'} height={'32px'} fill="#fff" />,
            href: '/assets',
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