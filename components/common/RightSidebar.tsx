import { Box, Drawer as DrawerMobile, useMediaQuery, useTheme } from '@mui/material'
import { Drawer } from 'components/ui/drawer'
import { DRAWER_WIDTH } from 'constants/index'
import { useSiteContext } from 'contexts/SiteContext'
import Chat from './Chat'

type Props = {
    open: boolean;
    mobileOpen: boolean;
    handleDrawerToggle: VoidFunction;
    window?: () => Window;
}
function RightSidebar({ open, mobileOpen, handleDrawerToggle, window }: Props) {
    const container = window !== undefined ? () => window().document.body : undefined;
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
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
                {
                    isMediumScreen &&

                    <Chat open={open} />
                }
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
                <Chat open={open} />
            </Drawer>
        </Box>

    )

}
export default RightSidebar