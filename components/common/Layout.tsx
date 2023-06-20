import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { IProps } from "../../libs/interfaces";

import { AppConfig } from "@/utils/AppConfig";
import { useQuery } from "@tanstack/react-query";
import AppBar from "components/ui/appbar";
import { DrawerHeader } from "components/ui/drawer";
import { Main } from "components/ui/main";
import { IPS_NOT_SUPORT } from "constants/index";
import { DeoddService } from "libs/apis";
import MyBottomNavigation from "./BottomNavigation";
import FaqHowtoplay from "./FaqHowtoplay";
import Forbidden from "./Forbidden";
import LeftSidebar from "./LeftSidebar";
import Loading from "./Loading";
import { Meta } from "./Meta";
import RightSidebar from "./RightSidebar";
import JackpotPopup from "@/templates/loyalty/components/JackpotPopup";

const Layout = ({ children }: IProps) => {
    const [rightOpen, setRightOpen] = useState(true);
    const [leftOpen, setLeftOpen] = useState(true);

    const [mobileOpenLeft, setMobileOpenLeft] = useState(false);
    const [mobileOpenRight, setMobileOpenRight] = useState(false);

    // const [isLoading, setIsLoading] = useState(true);


    const { isFetching, status, isInitialLoading, refetch: getCurrentIp, data: currentInfoIp } = useQuery({
        queryKey: ["getCurrentIp"],
        enabled: process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION",
        refetchOnWindowFocus: false,
        queryFn: DeoddService.getCurrentIp,
        select: (data: any) => {
            if (data.status === 200) {
                return data.data;
            } else {
                return undefined
            }
        },

    });
    // useEffect(() => {
    //     if (!isFetching) {
    //         const timer = setTimeout(() => {
    //             setIsLoading(false);
    //         }, 1000);
    //         return () => clearTimeout(timer);
    //     }
    // }, [isFetching])

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
    const ComingSoon = () => (
        <Typography variant='h2' mx="auto" mt={4} textAlign={'center'}>
            Coming soon
        </Typography>
    )
    if (isFetching) {
        return <Box>
            <Meta title={'Loading page'} description={AppConfig.description} />
            <Loading />
        </Box>
    }
    if (currentInfoIp && IPS_NOT_SUPORT[currentInfoIp.country] !== undefined) {
        return <Forbidden ip={currentInfoIp.ip} country={currentInfoIp.country} />
    }


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
                <DrawerHeader id="main-top" />
                <main >
                    {children}
                </main>
                <FaqHowtoplay />
            </Main>
            <JackpotPopup />
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
