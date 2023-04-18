import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, styled } from '@mui/material'
import React from 'react'
import { TwiterIcon } from './icons'
import { FacebookIcon } from 'utils/Icons'
import { Drawer } from 'components/ui/drawer'

type Props = {
    open: boolean;

}

function RightSidebar({ open }: Props) {
    return (
        <Drawer
            variant="permanent"
            anchor="right"
            open={open}
        >
            {/* <List>
                {SIDE_BAR_LEFT.map((item, index) => (
                    <ListItem key={item.path + index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={styleButton(item, open)}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 2 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            {
                                item.child && <Stack width={'100%'} display={open ? 'block' : 'none'}>
                                    {item.child}
                                </Stack>
                            }
                            {
                                item.title &&
                                <ListItemText primary={<Typography variant='body2' fontSize={item.hightLightText ? 16 : 14}  >{item.title}</Typography>} sx={{ opacity: open ? 1 : 0 }} />
                            }
                        </ListItemButton>
                    </ListItem>
                ))}

                <Divider sx={{ mx: 3, mt: 3 }} />
                {SIDE_BAR_LEFT_BOTTOM.map((item, index) => (
                    <ListItem key={item.path + index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{ ...styleButton(item, open), mt: index !== 0 ? 1 : 0, py: 3 }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 2 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            {
                                item.child && <Stack width={'100%'} display={open ? 'block' : 'none'}>
                                    {item.child}
                                </Stack>
                            }
                            {
                                item.title &&
                                <ListItemText primary={<Typography variant='body2' fontSize={item?.hightLightText ? 16 : 14}  >{item.title}</Typography>} sx={{ opacity: open ? 1 : 0 }} />
                            }
                        </ListItemButton>
                    </ListItem>
                ))}
                <Divider sx={{ mx: 3 }} />
            </List>
            <Box mt={'auto'} width="100%">
                <Contact />
            </Box> */}
        </Drawer>
    )
}

export default RightSidebar
