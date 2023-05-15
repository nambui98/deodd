import { Box, Stack } from '@mui/material'
import React, { useState } from 'react'

type Props = {
    children: JSX.Element,
    ck: boolean,
    setCk: Function
}

function MenuMobile({ children, ck, setCk }: Props) {
    return (
        <Box>
            <Box px={2} py={1.5} position={'relative'} zIndex={100000001} display={'flex'} alignItems={'center'} bgcolor={"background.paper"} borderRadius={2}>
                <label className="burger" htmlFor="burger">
                    <input type="checkbox" id="burger" checked={ck} onChange={() => setCk(!ck)} />
                    <span />
                    <span />
                    <span />
                </label>
            </Box>
            <Stack position={'fixed'} bgcolor={'background.paper'} sx={{ inset: 0, zIndex: 10000000, transition: "all .3s ease-in-out", opacity: ck ? '1' : '0', transform: ck ? 'translateX(0)' : 'translateX(100%)' }}>
                {children}
            </Stack>
        </Box>

    )
}

export default MenuMobile