import { Grid, Stack, Box, Typography } from '@mui/material'
import Price from 'components/common/Price'
import { ButtonSecondRemex } from 'components/ui/button'
import MyImage from 'components/ui/image'
import { Colors } from 'constants/index'
import { BigNumber } from 'ethers'
import Link from 'next/link'
import React from 'react'
import { BagTickIcon, USDTIcon } from 'utils/Icons'
import { BnbImage, Bronze2Image } from 'utils/Images'
import { Format } from 'utils/format'

type Props = {
    item: ListingItemType
}

function ListingItem({ item }: Props) {
    return (
        <>
            <Stack component={Link} prefetch href={"/shop-item-detail/" + item.token_id}>
                <img src={item.image_link} alt="" />
            </Stack>
            <Box mt={2}>
                <Typography component={Link} href={"/shop-item-detail/" + item.token_id} variant='body1' fontWeight={600}>Deodd #{item.token_id}</Typography>
            </Box>
            <Box mt={1}>
                <Price
                    value={Format.formatMoneyFromBigNumberEther(BigNumber.from(item.price.toString()))} typographyProps={{ variant: 'body1', fontWeight: 600 }}
                    tokenSize={24}
                    token={<USDTIcon fill="#50ae94" width={24} height={24} />}
                />

            </Box>
            <ButtonSecondRemex sx={{
                width: 1,
                mt: 2,
                textTransform: 'none',
                fontWeight: 400,
                svg: { transition: '.3s all', fill: '#96A5C0', stroke: 'none' }, color: 'dark.60', '&:hover': {
                    svg: { fill: Colors.bg80, stroke: 'none' }
                }
            }}>
                <Stack direction={'row'} alignItems={'center'} gap={1}>
                    <BagTickIcon />
                    Buy now
                </Stack>
            </ButtonSecondRemex>

        </>
    )
}

export default ListingItem
export type ListingItemType = {
    price: number,
    status: string,
    token_id: number,
    image_link: string,
    view_amount: number,
    created_at: string,
    type: string
}