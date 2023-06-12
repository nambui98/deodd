import { Input } from '@mui/base'
import { Checkbox, FilledInput, FormControl, FormControlLabel, FormGroup, Grid, MenuItem, OutlinedInput, Select, Stack, Typography } from '@mui/material'
import { ButtonLoading, ButtonSecond, ButtonSecondRemex, ButtonSecondRemex2 } from 'components/ui/button'
import MyImage from 'components/ui/image'
import { Colors } from 'constants/index'
import React from 'react'
import { ArrowDown2Icon, ArrowDownIcon, BagTickIcon, Bnb2Icon, FilterIcon, TickCircleIcon, TickCircleOutlineIcon } from 'utils/Icons'
import { BnbImage, Bronze2Image } from 'utils/Images'

type Props = {}

function ShopCollection({ }: Props) {
    return (
        <Grid container spacing={4}>
            <Grid item xs={3} >
                <Filter />
            </Grid>
            <Grid item xs={9} container spacing={4}>
                <Grid item xs={12} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>

                    <Typography variant='h5' fontWeight={700} >888 items</Typography>
                    <FormControl sx={{
                        width: 260,
                        border: 'none',
                        '& .MuiOutlinedInput-root': {
                            // py: 1,

                            fontSize: 14,
                            bgcolor: 'secondary.800',
                            height: 36
                        },
                        '& .MuiOutlinedInput-notchedOutline ': {
                            border: 'none',
                        },
                        '& .MuiSelect-icon': {
                            top: 'auto'
                        }
                    }}>
                        <Select
                            displayEmpty
                            variant='outlined'
                            renderValue={(selected: number | string | undefined) => {
                                if (!selected || selected === '') {
                                    return <span>Sort by</span>;
                                }
                                return selected;
                            }}
                            IconComponent={(props) => <ArrowDownIcon width={20} height={20} fill={Colors.secondaryDark} {...props} />}
                            inputProps={{ 'aria-label': 'Without label' }}
                            sx={{
                            }}
                        >

                            <MenuItem sx={{ fontSize: 14 }} value={1}>Desc</MenuItem>
                            <MenuItem sx={{ fontSize: 14 }} value={1}>Asc</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {
                    [...(new Array(45))].map(i =>
                        <ListingItem key={i} />
                    )
                }

            </Grid>
        </Grid >
    )
}

export default ShopCollection

const ListingItem = () => {
    return (
        <Grid item xs={4}>
            <Stack>
                <img src={Bronze2Image} alt="" />
            </Stack>
            <Typography mt={2} variant='body1' fontWeight={600}>Deodd #155</Typography>
            <Typography mt={1} variant="body1" fontWeight={600} display={'flex'} gap={.5} alignItems={'center'}>0.632 <MyImage src={BnbImage} alt="" width={24} height={24} /></Typography>
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
        </Grid>
    )
}
const Filter = () => {
    return <>
        <Stack direction={'row'} alignItems={'center'} gap={2}>
            <FilterIcon />
            <Typography variant='h5' fontWeight={700} >Filter</Typography>

        </Stack>
        <Typography mt={5} variant='body1' fontWeight={600} >NFT Type</Typography>
        <FormGroup sx={{
            '.MuiFormControlLabel-label': { fontSize: 16, fontWeight: 600, color: 'dark.60' },
            '.Mui-checked': {
                '~ .MuiFormControlLabel-label': {
                    color: 'white'
                }
            }
        }}>
            <Stack mt={2}>
                <FormControlLabel defaultChecked={false} control={<Checkbox defaultChecked icon={<TickCircleOutlineIcon />} checkedIcon={<TickCircleIcon />} />} label="All" />
                <FormControlLabel defaultChecked={false} control={<Checkbox defaultChecked icon={<TickCircleOutlineIcon />} checkedIcon={<TickCircleIcon />} />} label="Diamond" />
                <FormControlLabel defaultChecked={false} control={<Checkbox defaultChecked icon={<TickCircleOutlineIcon />} checkedIcon={<TickCircleIcon />} />} label="Gold" />
                <FormControlLabel defaultChecked={false} control={<Checkbox defaultChecked icon={<TickCircleOutlineIcon />} checkedIcon={<TickCircleIcon />} />} label="Bronze" />
            </Stack>
        </FormGroup>

        <Typography mt={3} variant='body1' fontWeight={600} >Price Range</Typography>
        <Stack direction={'row'} gap={1} alignItems={'center'} mt={1} sx={{
            width: 1,
            '.MuiInput-root': {

                maxWidth: 88,
            },
            '.MuiInput-input': {
                width: 1,
                bgcolor: 'secondary.800',
                borderRadius: 2,
                border: 'none',
                outline: 'none',
                py: 1,
                color: 'white',
                fontSize: 14,
                textAlign: 'center',
                fontFamily: 'inherit',
                '&::placeholder': {
                    color: 'dark.60'
                }
            }
        }}>
            <Input type='number' placeholder='Min' />
            <Typography>
                -
            </Typography>
            <Input type='number' placeholder='Max' />
            <img src={BnbImage} width={20} height={20} alt="" />
        </Stack>

        <ButtonLoading sx={{ py: 1, mt: 3, fontSize: 12, fontWeight: 400, textTransform: 'none' }}>Apply filter</ButtonLoading>


    </>
}