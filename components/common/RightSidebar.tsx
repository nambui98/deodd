import { Avatar, Drawer as DrawerMobile, Box, Divider, Stack, Typography, styled, InputBase, InputAdornment, IconButton, FormControl, FormHelperText } from '@mui/material'
import { ButtonLoading } from 'components/ui/button'
import { Drawer } from 'components/ui/drawer'
import { Input } from 'components/ui/input'
import { DRAWER_WIDTH } from 'constants/index'
import { useWalletContext } from 'contexts/WalletContext'
// import { DRAWER_WIDTH } from 'constants'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { ChatBoxIcon, SendIcon } from 'utils/Icons'
import { Avatar2Image } from 'utils/Images'

type Props = {
    open: boolean;
    mobileOpen: boolean;
    handleDrawerToggle: VoidFunction;
    window?: () => Window;
}
function RightSidebar({ open, mobileOpen, handleDrawerToggle, window }: Props) {
    const refContainerChat = useRef<HTMLElement>(null);
    const { walletIsConnected, handleConnectWallet } = useWalletContext();
    useEffect(() => {
        if (refContainerChat.current) {
            setTimeout(() => {
                refContainerChat.current?.scrollTo({ left: 0, top: 999999, behavior: "smooth" });
            }, 100);
        }
    }, [refContainerChat])

    const container = window !== undefined ? () => window().document.body : undefined;
    const drawer = (
        <>
            <Box bgcolor={'primary.200'} zIndex={1} position={'sticky'} top={0} right={0} left={0}>
                <Stack height={72} justifyContent={'center'} direction={'row'} alignItems={'center'} columnGap={2}>
                    <ChatBoxIcon />
                    <Typography variant='h3' fontWeight={600}>Chat Box</Typography>
                </Stack>
            </Box>
            <Divider />
            <Box p={2} overflow={'auto'} sx={{ transition: '.3s all', opacity: open ? 1 : 0 }} ref={refContainerChat}>
                {
                    Array.from(Array(100).keys()).map((item, key) =>
                        <ChatItem key={key} />
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
                anchor='right'
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {

                        paddingBottom: 8.125,
                        overflowY: 'hidden',
                        boxShadow: '4px 0px 24px rgba(0, 0, 0, 0.25)',
                        boxSizing: 'border-box', width: DRAWER_WIDTH, bgcolor: 'primary.200', backgroundImage: 'none'
                    },
                }}
            >
                {drawer}
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
                {drawer}
            </Drawer>
        </Box>

    )

}
function ChatItem() {
    return <Box bgcolor={'primary.300'} border={'1px solid'} borderColor={'secondary.300'} borderRadius={2} px={2} py={1} mb={1}>

        <Stack direction={'row'} alignItems={'center'} gap={1}>
            <Avatar sx={{ width: 24, height: 24 }} alt="Remy Sharp" src={Avatar2Image} />
            <Typography variant='body2' fontWeight={500} >Nam</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'baseLine'} gap={1} mt={.5}>
            <Typography variant='body2' fontWeight={400} color={'secondary.700'} fontSize={10}>12:12</Typography>
            <Typography whiteSpace={'normal'} flexGrow={1} variant='body2' fontWeight={500} color="secondary.100">also would please quit giving free lives for every rewrads you have?</Typography>
        </Stack>
    </Box>
}

export default RightSidebar