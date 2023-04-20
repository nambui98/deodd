import { styled } from "@mui/material";
import { DRAWER_WIDTH } from "constants/index";

export const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    rightOpen?: boolean,
    leftOpen?: boolean,
    open?: boolean
}>(({ theme,
    rightOpen, leftOpen
}) => ({
    flexGrow: 1,
    overflowX: "hidden",
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    // marginLeft: `calc(-${theme.spacing(8.5)})`,
    // marginRight: `calc(-${theme.spacing(8.5)})`,
    // marginLeft: `-${DRAWER_WIDTH}px`,
    // marginRight: `-${DRAWER_WIDTH}px`,
    // marginRight: `-${DRAWER_WIDTH}px`,
    //  marginLeft: open.leftOpen ? `${DRAWER_WIDTH}px` : `calc(${theme.spacing(7)})`,
    //     marginRight: open.rightOpen ? `${DRAWER_WIDTH}px` : `calc(${theme.spacing(7)})`,
    //     [theme.breakpoints.up('sm')]: {
    //         width: `calc(100% - ${theme.spacing((2 - countOpen) * 8.5) + ' - ' + countOpen * DRAWER_WIDTH}px)`,
    //         marginLeft: open.leftOpen ? `${DRAWER_WIDTH}px` : `calc(${theme.spacing(8.5)})`,
    //         marginRight: open.rightOpen ? `${DRAWER_WIDTH}px` : `calc(${theme.spacing(8.5)})`,
    ...((leftOpen) && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
    }),
    ...(rightOpen) && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginRight: 0,
    }
}));