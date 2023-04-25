import Image from 'next/image'
import { Box, BoxProps } from '@mui/material'
import React from 'react'


type Props = BoxProps & {
    alt: string;
    src: string;
}


function MyImage({ src, alt, width, height, ...props }: Props) {
    return (
        <Box position={'relative'} width={width} height={height} {...props}>
            <Image alt={alt} fill src={src} style={{ objectFit: 'contain' }} />
        </Box>
    )
}

export default MyImage