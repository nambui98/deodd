import { Color } from '@mui/material';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { DRAWER_WIDTH, DefaultRewardPool, DefaultSeason, DefaultStaked, SharePerNFT } from 'constants/index';
import { EnumNFT, TypeNFT } from "libs/types";
import { MapIconNFT, MapIconNFTString } from "utils/Images";
const getPathAvatar = (avatarId: number | undefined) => {
    const basePath = '/assets/images';
    switch (avatarId) {
        case 0: return basePath + '/avatar-yellow.png';
        case 1: return basePath + '/avatar-orange.png';
        case 2: return basePath + '/avatar-pink.png';
        case 3: return basePath + '/avatar-violet.png';
        case 4: return basePath + '/avatar-green.png';
        default: return basePath + '/avatar-yellow.png'
    }
}
const calculatorProfit = (nft: TypeNFT, amount?: number, dayStaked?: number) => {
    return (DefaultRewardPool * SharePerNFT[nft.type as EnumNFT] * (amount ?? 1) * (dayStaked ?? DefaultStaked) / DefaultSeason) / 100;
}
export const Utils = {
    getImageNFT: (type: number | string) => {
        return MapIconNFT[type];
    },
    getImageNFTString: (type: EnumNFT) => {
        return MapIconNFTString[type];
    },
    getTypeNFT: (type: number | string | undefined) => {
        const types: { [key: string]: string } = {
            'DIAMOND': 'Diamond',
            'GOLD': 'Gold',
            'BRONZE': 'Bronze'
        }
        return types[type ?? ''] ?? ''
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
    getPathAvatar,
    calculatorProfit
}
