import { Avatar, Box, Button, Divider, Drawer as DrawerMobile, IconButton, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover, Stack, Typography } from '@mui/material'
import { ButtonLoading } from 'components/ui/button'
import { Drawer } from 'components/ui/drawer'
import { Input } from 'components/ui/input'
import { DRAWER_WIDTH } from 'constants/index'
import { useWalletContext } from 'contexts/WalletContext'
import { useSiteContext } from 'contexts/SiteContext'
import { useEffect, useRef, useState } from 'react'
import { ArrowDown2Icon, ArrowLeft2Icon, ChatBoxIcon, CloseSquareIcon, MoreSquareIcon, SendIcon, UndoIcon, WarningIcon } from 'utils/Icons'
import { Avatar2Image } from 'utils/Images'

type Props = {
    open: boolean;
    mobileOpen: boolean;
    handleDrawerToggle: VoidFunction;
    window?: () => Window;
}
function RightSidebar({ open, mobileOpen, handleDrawerToggle, window }: Props) {
    const container = window !== undefined ? () => window().document.body : undefined;
    const { isGoldenHour } = useSiteContext();

    return (
        <Box
            component="nav"
            sx={{
                width: {
                    md: DRAWER_WIDTH,


                },
                flexShrink: { sm: 0 }
            }}
            aria-label="mailbox folders"
        >
            <DrawerMobile
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                anchor='right'
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        marginBottom: 8.125,
                        boxShadow: '4px 0px 24px rgba(0, 0, 0, 0.25)',
                        boxSizing: 'border-box', width: DRAWER_WIDTH, bgcolor: 'primary.200', backgroundImage: 'none'
                    },
                }}
            >
                <DrawerContent open={open} />
            </DrawerMobile>

            <Drawer
                sx={{
                    bgcolor: 'primary.200',
                    display: { xs: 'none', md: 'block' },
                    '&:before': {
                        content: '""',
                        position: 'fixed',
                        right: open ? DRAWER_WIDTH : 0,
                        background: isGoldenHour ? 'radial-gradient(50% 50% at 50% 50%, #FEF156 0%, rgba(254, 241, 86, 0) 100%)' : '',
                        filter: 'blur(20px)',
                        width: 30,
                        height: '100vh',
                        pointerEvents: 'none',
                        zIndex: (theme) => theme.zIndex?.appBar + 1,
                        transition: (theme) => theme.transitions.create('right', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    },
                }}
                variant="permanent"
                anchor="right"
                open={open}
                isWidthNone={true}
            >
                <DrawerContent open={open} />
            </Drawer>
        </Box>

    )

}
const DrawerContent = ({ open }: { open: boolean }) => {
    const { walletIsConnected, handleConnectWallet } = useWalletContext();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const id = Boolean(anchorEl) ? 'simple-popover' : undefined;
    const refContainerChat = useRef<HTMLElement>(null);
    const handleScrollToBottom = () => {

        refContainerChat.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    };
    useEffect(() => {
        if (refContainerChat.current && open) {
            setTimeout(() => {
                // refContainerChat.current?.scrollTo({ left: 0, top: 999999, behavior: "smooth" });
                handleScrollToBottom();
            }, 1000);
        }
    }, [refContainerChat, open])


    return (
        <Box position={'relative'} ref={refContainerChat}>

            <Box bgcolor={'primary.200'} zIndex={1} position={'sticky'} top={0} right={0} left={0}>
                <Stack height={72} justifyContent={'center'} direction={'row'} alignItems={'center'} columnGap={2}>
                    <ChatBoxIcon />
                    <Typography variant='h3' fontWeight={600}>Chat Box</Typography>
                </Stack>
            </Box>
            <Divider />
            {
                process.env.NEXT_PUBLIC_RELEASE_EARLY && JSON.parse(process.env.NEXT_PUBLIC_RELEASE_EARLY) ?
                    <Stack
                        height={{ xs: 'calc(100vh - 208px)', md: 'calc(100vh - 143px)' }}
                        justifyContent={'center'} alignItems={'center'}
                        overflow={'hidden'}
                    >
                        <Typography variant='h3' fontWeight={600}>
                            Welcome to DeODD!
                        </Typography>
                        <Typography mt={'10px'} variant='body2' fontWeight={400} color="dark.60">
                            Coming soon
                        </Typography>
                    </Stack> :
                    <Box p={2} overflow={'hidden'} sx={{ transition: open ? '3s all' : "", opacity: open ? 1 : 0 }} >
                        {
                            Array.from(Array(50).keys()).map((item, key) =>
                                <ChatItem handleClick={handleClick} id={id} isReport={key === 48} isMy={key === 49} key={key} />
                            )
                        }
                    </Box>
            }

            <Box bgcolor={'primary.200'} zIndex={1} position={'sticky'} bottom={0} right={0} left={0}>
                <Stack direction={'row'} p={2} height={70} alignItems={'center'} width={1} columnGap={2}>
                    {
                        walletIsConnected ?
                            <Input
                                sx={{ width: '100%' }}
                                multiline
                                maxRows={3}
                                endAdornment={
                                    <InputAdornment position="end" sx={{ pr: 2 }}>
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => { }}
                                            // onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            <SendIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            : <ButtonLoading
                                onClick={handleConnectWallet}
                                sx={{
                                    py: 1,
                                    borderRadius: 2,
                                    width: '100%'
                                }}
                                loading={false}>
                                <Typography variant='body2' fontWeight={600} textTransform={'uppercase'}>Connect wallet to chat</Typography>
                            </ButtonLoading>
                    }
                </Stack>
                <Button
                    variant="outlined"
                    onClick={() => {
                        handleScrollToBottom()
                    }}
                    sx={{
                        position: 'absolute',
                        bottom: 77,
                        right: 8,
                        borderRadius: "100%",
                        p: 1,
                        minWidth: 0,
                        border: "1px solid ",
                        borderColor: "secondary.main",
                        boxShadow: "0px 2px 16px rgba(254, 241, 86, 0.5)",
                        bgcolor: "primary.200",
                        '&:hover': {
                            bgcolor: 'transparent',
                            border: '1px solid',
                            borderColor: 'secondary.main',

                        }
                    }}
                >

                    <ArrowDown2Icon />
                </Button>

            </Box>
            <PopoverItem id={id} anchorEl={anchorEl} handleClose={handleClose} />
        </Box>
    )
};

const PopoverItem = ({ id, anchorEl, handleClose }: {
    id?: string,
    anchorEl: HTMLButtonElement | null,
    handleClose: VoidFunction
}) => {
    const [isShowReport, setIsShowReport] = useState<boolean>(false);
    const reportRef = useRef<HTMLDivElement>(null);
    const initRef = useRef<HTMLDivElement>(null);
    const nodeRef = isShowReport ? reportRef : initRef;
    const data = [
        {
            icon: <UndoIcon />,
            title: 'Reply',
            onClick: () => {

                // setActiveStep(1);
                setIsShowReport((prev) => !prev);
            }
        },
        {
            icon: <WarningIcon />,
            title: 'Report message',
            onClick: () => { }
        },
        {
            icon: <CloseSquareIcon />,
            title: 'Block user',

            onClick: () => { }
        },
    ]
    const dataReport = [
        {
            title: 'Spam',

            onClick: () => { }
        },
        {
            title: 'Violence',

            onClick: () => { }
        }, {
            title: 'Pornography',

            onClick: () => { }
        }, {
            title: 'Child abuse',

            onClick: () => { }
        }, {
            title: 'Political distortion',

            onClick: () => { }
        }, {
            title: 'Copyright',

            onClick: () => { }
        }, {
            title: 'Others',

            onClick: () => { }
        },
    ]
    return <Popover
        id={id}
        open={Boolean(anchorEl)}
        disableScrollLock
        anchorEl={anchorEl}
        onClose={handleClose}
        disableRestoreFocus
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        sx={{
            '.MuiPopover-paper': {
                backgroundImage: 'none',
                border: '1px solid #3F4251',
                borderRadius: 1.5,
            }
        }}
    >
        {/* <SwitchTransition mode={'out-in'}>
            <CSSTransition
                key={isShowReport + "container"}
                nodeRef={nodeRef}
                addEndListener={(done: any) => {
                    nodeRef?.current?.addEventListener("transitionend", done, false);
                }}
                classNames="fade"
            > */}
        <div ref={nodeRef} className="button-container">
            <Box className='container'>
                {
                    !isShowReport ?
                        <List sx={{
                            py: 1,
                            '.MuiListItemButton-root': {
                                py: 1,
                                px: 2,
                            },
                            '.MuiListItemText-root span': {
                                fontSize: 14,
                                fontWeight: 400
                            }
                        }}>
                            {
                                data.map((item, index) =>
                                    <ListItem key={index} disablePadding>
                                        <ListItemButton onClick={item.onClick}>
                                            <ListItemIcon sx={{ minWidth: "36px", }}>
                                                {
                                                    item.icon
                                                }
                                            </ListItemIcon>
                                            <ListItemText primary={item.title} />
                                        </ListItemButton>
                                    </ListItem>

                                )
                            }
                        </List> :



                        <List sx={{
                            py: 1,
                            '.MuiListItemButton-root': {
                                py: 1,
                                px: 2,
                            },
                            '.MuiListItemText-root span': {
                                fontSize: 14,
                                fontWeight: 400
                            }
                        }}>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => setIsShowReport(false)}>
                                    <ListItemIcon sx={{ minWidth: "36px", }}>
                                        <ArrowLeft2Icon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Back'} />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => setIsShowReport(false)}>
                                    <ListItemText primary={<Typography color='secondary.100' fontWeight={400} variant='body2'>Report as...</Typography>} />
                                </ListItemButton>
                            </ListItem>
                            {
                                dataReport.map((item, index) =>
                                    <ListItem key={index} disablePadding>
                                        <ListItemButton onClick={item.onClick}>
                                            <ListItemText primary={item.title} />
                                        </ListItemButton>
                                    </ListItem>

                                )
                            }

                        </List>
                }


            </Box>
        </div>
        {/* </CSSTransition>
        </SwitchTransition> */}

    </Popover >

}

const ChatItem = ({ isMy, isReport, id, handleClick }: { isReport?: boolean, isMy?: boolean, id: string | undefined, handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void }) => {
    if (isReport) {
        return <Box bgcolor={'background.paper'} position={'relative'} boxShadow={"0px 2px 4px rgba(0, 0, 0, 0.15)"} border={'1px solid'} borderColor={'secondary.300'} textAlign={'center'} borderRadius={2} px={2} pt={2} pb={1} mb={1}>
            <Typography variant='body2' color="secondary.100" fontWeight={400}>Message reported and hidden</Typography>
            <Button variant="text" sx={{ border: 'none', '&:hover': { border: 'none', backgroundColor: 'secondary.300' } }} color={'secondary'}>Undo</Button>
        </Box>
    }
    return <Box bgcolor={'primary.300'} position={'relative'} border={'1px solid'} borderColor={'secondary.300'} borderRadius={2} px={2} py={1} mb={1} sx={{
        cursor: 'pointer',

        transition: '.3s all',
        '.more': {
            opacity: 0,
            transition: '.3s all'
        },
        '&:hover': {
            bgcolor: 'background.paper',
            '.more': {
                opacity: 1
            }
        }
    }}>

        <Stack direction={'row'} alignItems={'center'} gap={1}>
            <Avatar sx={{ width: 24, height: 24 }} alt="Remy Sharp" src={Avatar2Image} />
            <Typography variant='body2' fontWeight={500} >Nam</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'baseLine'} gap={1} mt={.5}>
            <Typography variant='body2' fontWeight={400} color={'secondary.700'} fontSize={10}>12:12</Typography>
            <Typography whiteSpace={'normal'} flexGrow={1} variant='body2' fontWeight={500} color="secondary.100">also would please quit giving free lives for every rewrads you have?</Typography>
        </Stack>
        <Box position="absolute" className="more" sx={{ top: 0, right: 0 }}>
            <IconButton aria-describedby={id} onClick={handleClick} aria-label="delete">
                <MoreSquareIcon />
            </IconButton>
        </Box>
    </Box>
}

export default RightSidebar