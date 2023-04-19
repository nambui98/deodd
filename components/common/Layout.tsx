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
import { Main } from 'components/ui/main';
import { DrawerHeader } from 'components/ui/drawer';
import AppBar from 'components/ui/appbar';


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

    return (
        <Box sx={{ display: "flex", position: 'relative' }}>
            <AppBar leftOpen={leftOpen} rightOpen={rightOpen} handleDrawerLeft={handleDrawerLeft} handleDrawerRight={handleDrawerRight} />
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


