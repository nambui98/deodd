import { Box, Paper } from "@mui/material";
import React, { useState } from "react";

import { useTheme } from "@mui/material/styles";
import { IProps } from "../../libs/interfaces";
import Footer from "./Footer";

import AppBar from "components/ui/appbar";
import { DrawerHeader } from "components/ui/drawer";
import { Main } from "components/ui/main";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import MyBottomNavigation from "./BottomNavigation";

const Layout = ({ children }: IProps) => {
    const [rightOpen, setRightOpen] = useState(true);
    const [leftOpen, setLeftOpen] = useState(true);

    const [mobileOpenLeft, setMobileOpenLeft] = useState(false);
    const [mobileOpenRight, setMobileOpenRight] = useState(false);

    const handleDrawerToggleLeft = () => {
        setMobileOpenLeft(!mobileOpenLeft);
        if (mobileOpenRight) {
            setMobileOpenRight(false);
        }
    };
    const handleDrawerToggleRight = () => {
        setMobileOpenRight(!mobileOpenRight);
        if (mobileOpenLeft) {
            setMobileOpenLeft(false);
        }
    };
    const handleDrawerRight = () => {
        setRightOpen((prev) => !prev);
    };
    const handleDrawerLeft = () => {
        setLeftOpen((prev) => !prev);
    };

    return (
        <Box sx={{ display: "flex", position: "relative" }}>
            <AppBar
                leftOpen={leftOpen}
                rightOpen={rightOpen}
                handleDrawerLeft={handleDrawerLeft}
                handleDrawerRight={handleDrawerRight}
            />
            <LeftSidebar mobileOpen={mobileOpenLeft} handleDrawerToggle={handleDrawerToggleLeft} open={leftOpen} />
            <Main rightOpen={rightOpen} leftOpen={leftOpen}>
                <DrawerHeader />
                <main> {children} </main>
                {/* <Footer /> */}
            </Main>
            <RightSidebar mobileOpen={mobileOpenRight} handleDrawerToggle={handleDrawerToggleRight} open={rightOpen} />
            <Paper sx={{ display: { md: 'none', xs: 'block', zIndex: 999999 }, position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <MyBottomNavigation
                    openLeft={mobileOpenLeft}
                    openRight={mobileOpenRight}
                    handleOpenLeftSidebar={handleDrawerToggleLeft}
                    handleOpenRightSidebar={handleDrawerToggleRight} />
            </Paper>
        </Box>
    );
};

export default Layout;
