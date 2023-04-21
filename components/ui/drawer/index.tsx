import { Utils } from '@/utils/index';
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer';

import { styled } from '@mui/material/styles';
import { DRAWER_WIDTH } from 'constants/index';
export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open, isWidthNone }: DrawerProps & { theme?: any, isWidthNone?: boolean }) => ({
        width: DRAWER_WIDTH,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',


        backgroundColor: 'primary.200',
        border: 'none',

        ...(open && {

            ...Utils.openedMixin(theme),
            '& .MuiDrawer-paper': Utils.openedMixin(theme),
        }),
        ...(!open && {
            ...Utils.closedMixin(theme, isWidthNone),
            '& .MuiDrawer-paper': Utils.closedMixin(theme, isWidthNone),
        }),

    }),
);
export const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    height: 72,
    justifyContent: "flex-end",
    [theme.breakpoints.up('md')]: {
        height: 112
    }
}));