import { Color } from '@mui/material';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { DRAWER_WIDTH } from 'constants/index';
import { EnumNFT } from "libs/types";
import { MapIconNFT, MapIconNFTString } from "utils/Images";

export const Utils = {
    getImageNFT: (type: number | string) => {
        return MapIconNFT[type];
    },
    getImageNFTString: (type: EnumNFT) => {
        return MapIconNFTString[type];
    },
    openedMixin: (theme: Theme): CSSObject => ({
        width: DRAWER_WIDTH,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: (theme.palette.primary as any)[200],
        border: 'none',
        overflowX: 'hidden',
    }),
    closedMixin: (theme: Theme, isWidthNone: boolean = false): CSSObject => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        border: 'none',
        backgroundColor: (theme.palette.primary as any)[200],
        overflowX: 'hidden',
        width: isWidthNone ? 0 : `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: isWidthNone ? 0 : `calc(${theme.spacing(8.5)})`,
        },
    }),
}