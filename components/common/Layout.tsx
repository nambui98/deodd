import { Box, Paper } from "@mui/material";
import { useCallback, useState } from "react";

import { IProps } from "../../libs/interfaces";

import AppBar from "components/ui/appbar";
import { DrawerHeader } from "components/ui/drawer";
import { Main } from "components/ui/main";
import MyBottomNavigation from "./BottomNavigation";
import LeftSidebar from "./LeftSidebar";
import { Meta } from "./Meta";
import RightSidebar from "./RightSidebar";
import FaqHowtoplay from "./FaqHowtoplay";
import { AppConfig } from "@/utils/AppConfig";

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
            <Meta title={AppConfig.title} description={AppConfig.description} />
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
                <FaqHowtoplay />
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
