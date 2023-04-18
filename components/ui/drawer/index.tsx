import { Utils } from '@/utils/index';
import MuiDrawer from '@mui/material/Drawer';

import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { DRAWER_WIDTH } from 'constants/index';
export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: DRAWER_WIDTH,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...Utils.openedMixin(theme),
            '& .MuiDrawer-paper': Utils.openedMixin(theme),
        }),
        ...(!open && {
            ...Utils.closedMixin(theme),
            '& .MuiDrawer-paper': Utils.closedMixin(theme),
        }),
    }),
);
export const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
}));