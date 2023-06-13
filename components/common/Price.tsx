import { Stack, Typography, TypographyProps } from '@mui/material'
import MyImage from 'components/ui/image'
import React from 'react'
import { BnbImage } from 'utils/Images'
import { Format } from 'utils/format'

type Props = {
    typographyProps: TypographyProps,
    value: string | number,
    tokenSize?: number | string,
    token?: React.ReactNode
}

function Price({ value, token, typographyProps, tokenSize }: Props) {
    return (
        <Stack direction="row" alignItems={'center'} gap={.5}>
            <Typography variant="body1" fontWeight={600}{...typographyProps} >{Format.formatMoney(value)} </Typography>
            {token ||

                <MyImage src={BnbImage} alt="" width={tokenSize ?? 24} height={tokenSize ?? 24} />
            }
        </Stack >
    )
}

export default Price