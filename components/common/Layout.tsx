import { Box } from '@mui/material';
import React from 'react';

import { useTheme } from '@mui/material/styles';
import { IProps } from '../../libs/interfaces';
import Footer from './Footer';

import AppBar from 'components/ui/appbar';
import { DrawerHeader } from 'components/ui/drawer';
import { Main } from 'components/ui/main';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';


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
            <Main rightOpen={rightOpen} leftOpen={leftOpen} >
                <DrawerHeader />
                <main> {children} </main>
                <Footer />
            </Main>
            <RightSidebar open={rightOpen} />
        </Box>
    )
}

export default Layout


