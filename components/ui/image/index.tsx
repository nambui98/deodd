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
            <Image alt={alt} fill src={src} sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw" style={{ objectFit: 'contain' }} />
        </Box>
    )
}

export default MyImage