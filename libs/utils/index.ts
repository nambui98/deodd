import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { DRAWER_WIDTH } from 'constants/index';
import { EnumNFT } from "libs/types";
import { MapIconNFT } from "utils/Images";

export const Utils = {
    getImageNFT: (type: EnumNFT) => {
        return MapIconNFT[type];
    },
    openedMixin: (theme: Theme): CSSObject => ({
        width: DRAWER_WIDTH,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    }),
    closedMixin: (theme: Theme): CSSObject => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8.5)})`,
        },
    }),
}