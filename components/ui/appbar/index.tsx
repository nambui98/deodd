import { Stack, Toolbar, Typography } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { useMemo } from 'react';

import { CSSObject, Theme, styled } from '@mui/material/styles';
import { DRAWER_WIDTH } from 'constants/index';

import Header from 'components/common/Header';
import { LeftIcon, RightIcon } from 'utils/Icons';
import { ButtonSecondRemex } from '../button';

type Props = {
    leftOpen: boolean;
    rightOpen: boolean;
    handleDrawerLeft: () => void;
    handleDrawerRight: () => void;

}

function AppBar({ leftOpen, rightOpen, handleDrawerLeft, handleDrawerRight }: Props) {
    return (
        <AppBarCus position="fixed" leftOpen={leftOpen} rightOpen={rightOpen}>
            <Toolbar sx={{ alignItems: 'flex-start', paddingLeft: { md: 0, xs: 0 }, paddingRight: { md: 0, xs: 0 } }}>

                <ButtonSecondRemex
                    aria-label="open drawer"
                    onClick={handleDrawerLeft}
                    sx={{
                        display: { md: 'flex', xs: 'none' },
                        padding: .5, minWidth: 0, mt: 2, borderRadius: '0px 4px 4px 0px'
                    }}
                >
                    {
                        leftOpen ? <LeftIcon /> : <RightIcon />
                    }
                </ButtonSecondRemex>
                <Header />
                <ButtonSecondRemex
                    aria-label="open drawer"
                    onClick={handleDrawerRight}
                    sx={{

                        display: { md: 'flex', xs: 'none' },
                        padding: .5, minWidth: 0, mt: 2, borderRadius: '4px 0px 0px 4px', color: 'secondary.600', '&:hover': { color: '#000' }
                    }}
                >
                    {
                        rightOpen ? <RightIcon /> : <Stack direction={'row'} columnGap={1} alignItems={'center'}> <LeftIcon /><Typography variant='caption' component={'span'} textTransform={'capitalize'} >Chat</Typography></Stack>
                    }
                </ButtonSecondRemex>
            </Toolbar>
        </AppBarCus>

    )
}

export default AppBar;
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
    [theme.breakpoints.up('md')]: {
        height: 112,
        width: `calc(100% - ${(!open.leftOpen ? theme.spacing(8.5) : '0px') + ' - ' + countOpen * DRAWER_WIDTH}px)`,
        marginLeft: open.leftOpen ? `${DRAWER_WIDTH}px` : `calc(${theme.spacing(8.5)})`,
        marginRight: open.rightOpen ? `${DRAWER_WIDTH}px` : 0,
    },
});

const AppBarCus = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open"
})<AppBarProps & {
    rightOpen?: boolean,
    leftOpen?: boolean
}>(({ theme, open, rightOpen, leftOpen }) => {
    let countOpen = useMemo(() => rightOpen && leftOpen ? 2 : (rightOpen || leftOpen) ? 1 : 0, [rightOpen, leftOpen])

    return (
        {
            height: 72,
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