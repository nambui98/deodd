import { styled } from "@mui/material";
import { DRAWER_WIDTH } from "constants/index";
import { useMemo } from "react";

export const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    rightOpen?: boolean,
    leftOpen?: boolean,
    countOpen?: number,
    open?: boolean
}>(({ theme,
    rightOpen, leftOpen
    // , countOpen
}) => {
    let countOpen = useMemo(() => rightOpen && leftOpen ? 2 : (rightOpen || leftOpen) ? 1 : 0, [rightOpen, leftOpen])
    return ({
        flexGrow: 1,
        overflowX: "hidden",
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        // marginLeft: `calc(-${theme.spacing(8.5)})`,
        // marginRight: `calc(-${theme.spacing(8.5)})`,
        // marginLeft: `-${DRAWER_WIDTH}px`,
        // marginRight: `-${DRAWER_WIDTH}px`,

        // width: `calc(100% - ${(leftOpen ? theme.spacing(8.5) : '0px') + ' - ' + countOpen * DRAWER_WIDTH}px)`,
        // marginLeft: leftOpen ? `${DRAWER_WIDTH}px` : `calc(${theme.spacing(8.5)})`,
        // marginRight: rightOpen ? `${DRAWER_WIDTH}px` : 0,

        [theme.breakpoints.up('md')]: {
            marginRight: `calc(${theme.spacing(5)} - ${DRAWER_WIDTH}px)`,

            marginLeft: `calc(${theme.spacing(8.5)} - ${DRAWER_WIDTH}px)`,
            paddingBottom: theme.spacing(8),
            ...((leftOpen) && {
                transition: theme.transitions.create(["margin", "width"], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen
                }),
                marginLeft: 0,
            }),
            ...(rightOpen) && {
                transition: theme.transitions.create(["margin", "width"], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen
                }),
                marginRight: 0,
            },
            // marginLeft: `-${drawerWidth}px`,
            // marginLeft: leftOpen ? `${DRAWER_WIDTH}px` : `calc(${theme.spacing(7)})`,
            // marginRight: rightOpen ? `${DRAWER_WIDTH}px` : `calc(${theme.spacing(7)})`,
            // [theme.breakpoints.up('sm')]: {
            // width: `calc(100% - ${theme.spacing((2 - countOpen) * 8.5) + ' - ' + countOpen * DRAWER_WIDTH}px)`,
            // marginLeft: leftOpen ? 0 : `calc(-${theme.spacing(8.5)})`,

            // marginRight: rightOpen ? `${DRAWER_WIDTH}px` : `calc(${theme.spacing(8.5)})`,
            // }

        }
    })
});