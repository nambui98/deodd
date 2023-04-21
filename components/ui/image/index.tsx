import Image from 'next/image'
import { Box, BoxProps } from '@mui/material'
import React from 'react'

type Props = BoxProps & {
    src: string,
    alt: string

}

function MyImage({ src, alt, ...props }: Props) {
    return (
        <Box position={'relative'} {...props}>
            <Image alt={alt} fill src={src} style={{ objectFit: 'contain' }} />
        </Box>
    )
}

export default MyImage