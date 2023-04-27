// import { Avatar, Drawer as DrawerMobile, Box, Divider, Stack, Typography, styled, InputBase, InputAdornment, IconButton, FormControl, FormHelperText, Popover, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
// import { ButtonLoading } from 'components/ui/button'
// import { Drawer } from 'components/ui/drawer'
// import { Input } from 'components/ui/input'
// import { DRAWER_WIDTH } from 'constants/index'
// import { useWalletContext } from 'contexts/WalletContext'
// // import { DRAWER_WIDTH } from 'constants'
// import { useEffect, useLayoutEffect, useRef, useState } from 'react'
// import { ArrowDown2Icon, ChatBoxIcon, CloseSquareIcon, MoreSquareIcon, SendIcon, UndoIcon, WarningIcon } from 'utils/Icons'
// import { Avatar2Image } from 'utils/Images'

// type Props = {
//     open: boolean;
//     mobileOpen: boolean;
//     handleDrawerToggle: VoidFunction;
//     window?: () => Window;
// }
// function RightSidebar({ open, mobileOpen, handleDrawerToggle, window }: Props) {
//     const refContainerChat = useRef<HTMLElement>(null);
//     const { walletIsConnected, handleConnectWallet } = useWalletContext();
//     const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

//     const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//         debugger
//         setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const id = Boolean(anchorEl) ? 'simple-popover' : undefined;
//     const handleScrollToBottom = () => {

//         refContainerChat.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
//     };
//     useEffect(() => {
//         if (refContainerChat.current) {
//             // debugger
//             setTimeout(() => {
//                 handleScrollToBottom();
//             }, 1000);
//         }
//     }, [refContainerChat])

//     const container = window !== undefined ? () => window().document.body : undefined;

//     const DrawerContent = () => (
//         <Box position={'relative'}>
//             <Box bgcolor={'primary.200'} zIndex={1} position={'sticky'} top={0} right={0} left={0}>
//                 <Stack height={72} justifyContent={'center'} direction={'row'} alignItems={'center'} columnGap={2}>
//                     <ChatBoxIcon />
//                     <Typography variant='h3' fontWeight={600}>Chat Box</Typography>
//                 </Stack>
//             </Box>
//             <Divider />
//             <Box p={2} pb={10.125} overflow={'auto'} sx={{ transition: '.3s all', opacity: open ? 1 : 0 }} ref={refContainerChat}>
//                 {
//                     Array.from(Array(50).keys()).map((item, key) =>
//                         <ChatItem handleClick={handleClick} id={id} isReport={key === 48} isMy={key === 49} key={key} />
//                     )
//                 }
//             </Box>
//             {/* <Box position="absolute" bottom={0} right={0} left={0}> */}
//             <Box bgcolor={'primary.200'} zIndex={1} position={'sticky'} bottom={{ md: 0, xs: 0 }} right={0} width={DRAWER_WIDTH}>
//                 <Stack direction={'row'} p={2} alignItems={'center'} width={1} columnGap={2}>
//                     {
//                         walletIsConnected ?
//                             <Input
//                                 sx={{ width: '100%' }}
//                                 multiline
//                                 maxRows={3}
//                                 endAdornment={
//                                     <InputAdornment position="end" sx={{ pr: 2 }}>
//                                         <IconButton
//                                             aria-label="toggle password visibility"
//                                             onClick={() => { }}
//                                             // onMouseDown={handleMouseDownPassword}
//                                             edge="end"
//                                         >
//                                             <SendIcon />
//                                         </IconButton>
//                                     </InputAdornment>
//                                 }
//                             />
//                             : <ButtonLoading
//                                 onClick={handleConnectWallet}
//                                 sx={{
//                                     py: 1,
//                                     borderRadius: 2,
//                                     width: '100%'
//                                 }}
//                                 loading={false}>
//                                 <Typography variant='body2' fontWeight={600} textTransform={'uppercase'}>Connect wallet to chat</Typography>
//                             </ButtonLoading>
//                     }
//                 </Stack>
//                 <Button
//                     // size="small"
//                     variant="outlined"
//                     onClick={() => {
//                         handleScrollToBottom()
//                     }}
//                     sx={{
//                         top: -40,
//                         right: 16,
//                         position: 'absolute',
//                         border: "1px solid ",
//                         borderColor: "secondary.main",
//                         boxShadow: "0px 2px 16px rgba(254, 241, 86, 0.5)",
//                         // position: 'sticky',

//                         // bottom: 77,
//                         // right: -108,
//                         // left: 0,

//                         borderRadius: "100%",
//                         p: 1,
//                         minWidth: 0,

//                         // width: 32,

//                         // height: 32,
//                         bgcolor: "primary.200",
//                         '&:hover': {
//                             bgcolor: 'transparent',
//                             border: '1px solid',
//                             borderColor: 'secondary.main',

//                         }
//                     }}
//                 >
//                     <ArrowDown2Icon />
//                 </Button>
//             </Box>


//             {/* </Box> */}
//             {/* <Box zIndex={1} position={'sticky'} bottom={{ md: 77, xs: 142 }} right={8} left={0} textAlign={'right'}>
//                 <Button
//                     // size="small"
//                     variant="outlined"
//                     onClick={() => {
//                         handleScrollToBottom()
//                     }}
//                     sx={{
//                         border: "1px solid ",
//                         borderColor: "secondary.main",
//                         boxShadow: "0px 2px 16px rgba(254, 241, 86, 0.5)",
//                         // position: 'sticky',

//                         // bottom: 77,
//                         // right: -108,
//                         // left: 0,

//                         borderRadius: "100%",
//                         p: 1,
//                         minWidth: 0,

//                         // width: 32,

//                         // height: 32,
//                         bgColor: "primary.200",
//                         '&:hover': {
//                             bgcolor: 'transparent',
//                             border: '1px solid',
//                             borderColor: 'secondary.main',

//                         }
//                     }}
//                 >
//                     <ArrowDown2Icon />
//                 </Button>
//             </Box> */}
//             <Popover
//                 id={id}
//                 open={Boolean(anchorEl)}
//                 disableScrollLock
//                 anchorEl={anchorEl}
//                 onClose={handleClose}
//                 disableRestoreFocus
//                 anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'right',
//                 }}
//                 transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'right',
//                 }}
//                 sx={{
//                     '.MuiPopover-paper': {
//                         backgroundImage: 'none',
//                         border: '1px solid #3F4251',
//                         borderRadius: 1.5
//                     }
//                 }}
//             >
//                 <List sx={{
//                     py: 1,
//                     '.MuiListItemButton-root': {
//                         py: 1,
//                         px: 2,
//                     },
//                     '.MuiListItemText-root span': {
//                         fontSize: 14,
//                         fontWeight: 400
//                     }
//                 }}>
//                     <ListItem disablePadding>
//                         <ListItemButton>
//                             <ListItemIcon sx={{ minWidth: "36px", }}>
//                                 <UndoIcon />
//                             </ListItemIcon>
//                             <ListItemText primary="Reply" />
//                         </ListItemButton>
//                     </ListItem>
//                     <ListItem disablePadding>
//                         <ListItemButton>
//                             <ListItemIcon sx={{ minWidth: "36px" }}>
//                                 <WarningIcon />
//                             </ListItemIcon>
//                             <ListItemText primary="Report message" />
//                         </ListItemButton>
//                     </ListItem>
//                     <ListItem disablePadding>
//                         <ListItemButton>
//                             <ListItemIcon sx={{ minWidth: "36px" }}>
//                                 <CloseSquareIcon />
//                             </ListItemIcon>
//                             <ListItemText primary="Block user" />
//                         </ListItemButton>
//                     </ListItem>
//                 </List>
//             </Popover>

//         </Box>
//     );

//     return (
//         <Box
//             component="nav"
//             sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
//             aria-label="mailbox folders"
//         >
//             <DrawerMobile
//                 container={container}
//                 variant="temporary"
//                 open={mobileOpen}
//                 onClose={handleDrawerToggle}
//                 anchor='right'
//                 ModalProps={{
//                     keepMounted: true, // Better open performance on mobile.
//                 }}
//                 sx={{
//                     display: { xs: 'block', md: 'none' },
//                     '& .MuiDrawer-paper': {

//                         paddingBottom: '48px',
//                         // overflowY: 'hidden',
//                         boxShadow: '4px 0px 24px rgba(0, 0, 0, 0.25)',
//                         boxSizing: 'border-box', width: DRAWER_WIDTH, bgcolor: 'primary.200', backgroundImage: 'none'
//                     },
//                 }}
//             >
//                 <DrawerContent />
//             </DrawerMobile>

//             <Drawer
//                 sx={{
//                     bgcolor: 'primary.200',

//                     display: { xs: 'none', md: 'block' },
//                 }}
//                 variant="permanent"
//                 anchor="right"
//                 open={open}
//                 isWidthNone={true}
//             >

//                 <DrawerContent />
//             </Drawer>
//         </Box>

//     )

// }
// const ChatItem = ({ isMy, isReport, id, handleClick }: { isReport?: boolean, isMy?: boolean, id: string | undefined, handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void }) => {
//     if (isReport) {
//         return <Box bgcolor={'background.paper'} position={'relative'} boxShadow={"0px 2px 4px rgba(0, 0, 0, 0.15)"} border={'1px solid'} borderColor={'secondary.300'} textAlign={'center'} borderRadius={2} px={2} pt={2} pb={1} mb={1}>
//             <Typography variant='body2' color="secondary.100" fontWeight={400}>Message reported and hidden</Typography>
//             <Button variant="text" sx={{ border: 'none', '&:hover': { border: 'none', backgroundColor: 'secondary.300' } }} color={'secondary'}>Undo</Button>
//         </Box>
//     }
//     return <Box bgcolor={'primary.300'} position={'relative'} border={'1px solid'} borderColor={'secondary.300'} borderRadius={2} px={2} py={1} mb={1} sx={{
//         cursor: 'pointer',
//         '.more': {
//             opacity: 0,
//             transition: '.3s all'
//         },
//         '&:hover': {
//             '.more': {
//                 opacity: 1
//             }
//         }
//     }}>

//         <Stack direction={'row'} alignItems={'center'} gap={1}>
//             <Avatar sx={{ width: 24, height: 24 }} alt="Remy Sharp" src={Avatar2Image} />
//             <Typography variant='body2' fontWeight={500} >Nam</Typography>
//         </Stack>
//         <Stack direction={'row'} alignItems={'baseLine'} gap={1} mt={.5}>
//             <Typography variant='body2' fontWeight={400} color={'secondary.700'} fontSize={10}>12:12</Typography>
//             <Typography whiteSpace={'normal'} flexGrow={1} variant='body2' fontWeight={500} color="secondary.100">also would please quit giving free lives for every rewrads you have?</Typography>
//         </Stack>
//         <Box position="absolute" className="more" sx={{ top: 0, right: 0 }}>
//             <IconButton aria-describedby={id} onClick={handleClick} aria-label="delete">
//                 <MoreSquareIcon />
//             </IconButton>
//         </Box>
//     </Box>
// }

// export default RightSidebar
import { Avatar, Drawer as DrawerMobile, Box, Divider, Stack, Typography, styled, InputBase, InputAdornment, IconButton, FormControl, FormHelperText, Popover, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { ButtonLoading } from 'components/ui/button'
import { Drawer } from 'components/ui/drawer'
import { Input } from 'components/ui/input'
import { DRAWER_WIDTH } from 'constants/index'
import { useWalletContext } from 'contexts/WalletContext'
// import { DRAWER_WIDTH } from 'constants'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowDown2Icon, ChatBoxIcon, CloseSquareIcon, MoreSquareIcon, SendIcon, UndoIcon, WarningIcon } from 'utils/Icons'
import { Avatar2Image } from 'utils/Images'

type Props = {
    open: boolean;
    mobileOpen: boolean;
    handleDrawerToggle: VoidFunction;
    window?: () => Window;
}
function RightSidebar({ open, mobileOpen, handleDrawerToggle, window }: Props) {
    const container = window !== undefined ? () => window().document.body : undefined;

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
            <Box p={2} overflow={'hidden'} sx={{ transition: open ? '3s all' : "", opacity: open ? 1 : 0 }} >
                {
                    Array.from(Array(50).keys()).map((item, key) =>
                        <ChatItem handleClick={handleClick} id={id} isReport={key === 48} isMy={key === 49} key={key} />
                    )
                }
            </Box>
            <Box bgcolor={'primary.200'} zIndex={1} position={'sticky'} bottom={0} right={0} left={0}>
                <Stack direction={'row'} p={2} alignItems={'center'} width={1} columnGap={2}>
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
            <Popover
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
                        borderRadius: 1.5
                    }
                }}
            >
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
                        <ListItemButton>
                            <ListItemIcon sx={{ minWidth: "36px", }}>
                                <UndoIcon />
                            </ListItemIcon>
                            <ListItemText primary="Reply" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon sx={{ minWidth: "36px" }}>
                                <WarningIcon />
                            </ListItemIcon>
                            <ListItemText primary="Report message" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon sx={{ minWidth: "36px" }}>
                                <CloseSquareIcon />
                            </ListItemIcon>
                            <ListItemText primary="Block user" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Popover>

        </Box>
    )
};


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
