import { Box, Button, IconButton, Toolbar } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import React from 'react'

import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { IProps } from '../../libs/interfaces'
import { Contact } from './Contact'
import Footer from './Footer'
import Header from './Header'

import { LeftIcon, RightIcon } from 'utils/Icons'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import { ButtonSecondRemex } from 'components/ui/button'
import { DRAWER_WIDTH } from 'constants/index'
import { AppBar } from 'components/ui/appbar';
import { Main } from 'components/ui/main';
import { DrawerHeader } from 'components/ui/drawer';


const Layout = ({ children }: IProps) => {
    const theme = useTheme();
    const [rightOpen, setRightOpen] = React.useState(true);
    const [leftOpen, setLeftOpen] = React.useState(true);

    const handleDrawerRight = () => {
        setRightOpen((prev) => !prev);
    };
    const handleDrawerLeft = () => {
        setLeftOpen((prev) => !prev);
    };

    const handleDrawerCloseRight = () => {
        setRightOpen(false);
    };
    const handleDrawerCloseLeft = () => {
        setLeftOpen(false);
    };
    return (
        <Box sx={{ display: "flex", position: 'relative' }}>
            <AppBar position="fixed" leftOpen={leftOpen} rightOpen={rightOpen}>
                <Toolbar sx={{ alignItems: 'flex-start', paddingLeft: { md: 0 }, paddingRight: { md: 0 } }}>
                    <ButtonSecondRemex
                        aria-label="open drawer"
                        onClick={handleDrawerLeft}
                        sx={{ padding: .5, minWidth: 0, mt: 2, borderRadius: '0px 4px 4px 0px' }}
                    >
                        {
                            leftOpen ? <LeftIcon /> : <RightIcon />
                        }
                    </ButtonSecondRemex>
                    <Header />
                    <ButtonSecondRemex
                        aria-label="open drawer"
                        onClick={handleDrawerRight}
                        sx={{ padding: .5, minWidth: 0, mt: 2, borderRadius: '4px 0px 0px 4px' }}
                    >
                        {
                            rightOpen ? <RightIcon /> : <LeftIcon />
                        }
                    </ButtonSecondRemex>
                </Toolbar>
            </AppBar>
            <LeftSidebar open={leftOpen} />
            <Main rightOpen={rightOpen} leftOpen={leftOpen}>
                <DrawerHeader />
                <main>{children}</main>
                <Footer />
            </Main>
            <RightSidebar open={rightOpen} />
        </Box>
    )
}

export default Layout


