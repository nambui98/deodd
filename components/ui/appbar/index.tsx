import { Box, Button, IconButton, Toolbar } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import React, { useMemo } from 'react'

import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { DRAWER_WIDTH } from 'constants/index';

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}
const openedMixin = ({ theme, open, countOpen }: {
    theme: Theme,
    countOpen: number,
    open: {
        leftOpen: boolean,
        rightOpen: boolean
    }
}): CSSObject => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),

    width: `calc(100% - ${theme.spacing((2 - countOpen) * 7) + ' - ' + countOpen * DRAWER_WIDTH}px)`,
    marginLeft: open.leftOpen ? `${DRAWER_WIDTH}px` : `calc(${theme.spacing(7)})`,
    marginRight: open.rightOpen ? `${DRAWER_WIDTH}px` : `calc(${theme.spacing(7)})`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${theme.spacing((2 - countOpen) * 8.5) + ' - ' + countOpen * DRAWER_WIDTH}px)`,
        marginLeft: open.leftOpen ? `${DRAWER_WIDTH}px` : `calc(${theme.spacing(8.5)})`,
        marginRight: open.rightOpen ? `${DRAWER_WIDTH}px` : `calc(${theme.spacing(8.5)})`,

    },
});

export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open"
})<AppBarProps & {
    rightOpen?: boolean,
    leftOpen?: boolean
}>(({ theme, open, rightOpen, leftOpen }) => {
    let countOpen = useMemo(() => rightOpen && leftOpen ? 2 : (rightOpen || leftOpen) ? 1 : 0, [rightOpen, leftOpen])
    console.log(countOpen);
    console.log(

        `calc(100% - ${theme.spacing((2 - countOpen) * 8.5) + ' - ' + countOpen * DRAWER_WIDTH}px)`,
    );


    return (
        {
            height: 112,
            backgroundImage: 'none',
            boxShadow: 'none',
            backgroundColor: theme.palette.background.default,
            transition: theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            ...({
                ...openedMixin({
                    theme,
                    countOpen: countOpen,
                    open: {
                        leftOpen: leftOpen ?? false,
                        rightOpen: rightOpen ?? false
                    }
                })
            }),
        })
});