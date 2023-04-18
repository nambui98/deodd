import { styled } from "@mui/material";
import { DRAWER_WIDTH } from "constants/index";
// import { DRAWER_WIDTH } from "constants";

export const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    rightOpen?: boolean,
    leftOpen?: boolean,
    open?: boolean
}>(({ theme,
    open,
    rightOpen, leftOpen
}) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: leftOpen ? `-${DRAWER_WIDTH}px` : 0,
    marginRight: rightOpen ? `-${DRAWER_WIDTH}px` : 0,
    ...((rightOpen || leftOpen) && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: leftOpen ? 0 : `-${DRAWER_WIDTH}px`,
        marginRight: rightOpen ? 0 : `-${DRAWER_WIDTH}px`,
    })
}));