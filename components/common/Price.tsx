import { Stack, Typography, TypographyProps } from '@mui/material'
import MyImage from 'components/ui/image'
import React from 'react'
import { BnbImage } from 'utils/Images'
import { Format } from 'utils/format'

type Props = {
    typographyProps: TypographyProps,
    typographySaleProps?: TypographyProps,
    value: string | number,
    valueSale?: string | number,
    tokenSize?: number | string,
    token?: React.ReactNode,
    tokenSale?: React.ReactNode,
    isShowOnlyPriceSales?: boolean
}

function Price({ value, valueSale, token, isShowOnlyPriceSales, tokenSale, typographyProps, typographySaleProps, tokenSize }: Props) {
    if (valueSale && valueSale !== value) {
        return <Stack direction={'row'} alignItems={'flex-start'} gap={1}>
            <Stack direction="row" alignItems={'center'} gap={.5}>
                <Typography variant="body1" fontWeight={600}{...typographyProps} >{Format.formatMoney(valueSale, 2)} </Typography>
                {token ||
                    <MyImage src={BnbImage} alt="" width={tokenSize ?? 24} height={tokenSize ?? 24} />
                }
            </Stack >
            {
                !isShowOnlyPriceSales &&

                <Stack direction="row" alignItems={'center'} gap={.5}>
                    <Typography variant="body1" fontWeight={600} {...typographySaleProps} sx={{ textDecoration: 'line-through' }} >{Format.formatMoney(value, 2)} </Typography>
                    {tokenSale ||
                        <MyImage src={BnbImage} alt="" width={tokenSize ?? 24} height={tokenSize ?? 24} />
                    }
                </Stack>
            }


        </Stack>
    }
    return (
        <Stack direction={'row'} alignItems={'flex-start'}>
            <Stack direction="row" alignItems={'center'} gap={.5}>
                <Typography variant="body1" fontWeight={600}{...typographyProps} >{Format.formatMoney(value, 2)} </Typography>
                {token ||
                    <MyImage src={BnbImage} alt="" width={tokenSize ?? 24} height={tokenSize ?? 24} />
                }
            </Stack >
        </Stack>
    )
}

export default Price