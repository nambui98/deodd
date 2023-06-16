import { Input } from '@mui/base'
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import CoinAnimation from 'components/common/CoinAnimation'
import { ButtonLoading } from 'components/ui/button'
import MyImage from 'components/ui/image'
import { Colors } from 'constants/index'
import { DeoddService } from 'libs/apis'
import { useEffect, useState, useTransition } from 'react'
import { useInView } from 'react-intersection-observer'
import { ArrowDownIcon, FilterIcon, TickCircleIcon, TickCircleOutlineIcon } from 'utils/Icons'
import { BnbImage } from 'utils/Images'
import ListingItem, { ListingItemType } from './components/ListingItem'
type Props = {
    setAmount: (value: number) => void
}
enum TypeFilterSort {
    TIME_ASC,
    VIEW_DESC,
    PRICE_ASC,
    PRICE_DESC,
    TIME_DESC
}
type FilterType = {
    limit: number,
    offset: number,
    sortType: string,
    sortOrder: string,
    minPrice: number | null,
    maxPrice: number | null,
    itemType: object

}
function ShopCollection({ setAmount }: Props) {
    const [items, setItems] = useState<ListingItemType[]>([])
    const [total, setTotal] = useState<number>(0)
    const [sortValue, setSortValue] = useState<TypeFilterSort | string>('')
    const [filter, setFilter] = useState<FilterType>({
        limit: 9,
        offset: 0,
        sortType: "TIME",
        sortOrder: "DESC",
        minPrice: null,
        maxPrice: null,
        itemType: { ALL: true }
    })
    const { refetch: getShopList, isLoading, isFetched, isFetching } = useQuery({
        queryKey: ["getShopList"],
        enabled: true,
        refetchOnWindowFocus: false,
        queryFn: () => DeoddService.getShopList(filter),
        onSuccess(data) {
            if (data && data.data) {
                setItems((prev) => [...prev, ...data.data.items]);
                setTotal(data.data.total);
                setAmount(data.data.total)
            }
        },
        select: (data: any) => {
            if (data.status === 200) {
                return data.data;
            } else {
                return undefined
            }
        },
    });
    const [bottomRef, inView] = useInView();
    useEffect(() => {
        if (inView) {
            if (items.length > 0) {
                setFilter((prev) => ({ ...prev, offset: items.length }))
                setTimeout(() => {
                    getShopList();
                }, 10);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, getShopList])
    const onFilter = () => {
        setItems([])
        setTimeout(() => {
            getShopList();
        }, 100);
    }
    return (
        <Grid pt={{ xs: 2, md: 0 }} container spacing={{ xs: 3, md: 4 }}>
            <Grid item xs={12} md={3} >
                <Filter onFilter={onFilter} filter={filter} setFilter={setFilter} />
            </Grid>

            <Grid item xs={12} md={9} >

                <Box position={'sticky'} bgcolor={'background.default'} zIndex={1} top={112}>
                    <Grid container pb={{ xs: 3, md: 4 }}>
                        <Grid item xs={12} md={6} display={'flex'} >
                            <Typography variant='h5' fontWeight={{ xs: 600, md: 700 }} fontSize={{ xs: 16, md: 24 }} >{total} items</Typography>
                        </Grid>
                        <Grid item xs={12} md={6} display={'flex'} justifyContent={'flex-end'} >

                            <Box position={'sticky'} top={212}>

                                <FormControl sx={{
                                    width: { xs: 1, md: 260 },
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
                                        value={sortValue as any}
                                        // renderValue={(selected: number | string | undefined) => {
                                        //     if (!selected || selected === '') {
                                        //         return <span>Sort by</span>;
                                        //     }
                                        //     return selected;
                                        // }}
                                        IconComponent={(props) => <ArrowDownIcon width={20} height={20} fill={Colors.secondaryDark} {...props} />}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        onChange={(e: SelectChangeEvent<TypeFilterSort | ''>) => {
                                            let sortType: string = '';
                                            let sortOrder: string = '';
                                            if (e.target.value === TypeFilterSort.TIME_ASC) {
                                                sortType = 'TIME';
                                                sortOrder = 'ASC';
                                            } else if (e.target.value === TypeFilterSort.VIEW_DESC) {
                                                sortType = 'VIEW';
                                                sortOrder = 'DESC';
                                            } else if (e.target.value === TypeFilterSort.PRICE_ASC) {
                                                sortType = 'PRICE';
                                                sortOrder = 'ASC';
                                            } else if (e.target.value === TypeFilterSort.PRICE_DESC) {
                                                sortType = 'VIEW';
                                                sortOrder = 'DESC';
                                            } else if (e.target.value === TypeFilterSort.TIME_DESC) {
                                                sortType = 'TIME';
                                                sortOrder = 'DESC';
                                            };
                                            setFilter((prev) => ({ ...prev, sortType, sortOrder, offset: 0 }))
                                            setSortValue(e.target.value)


                                            onFilter();
                                        }}
                                    >

                                        <MenuItem sx={{ fontSize: 14 }} disabled value={''}>Sort by</MenuItem>
                                        <MenuItem sx={{ fontSize: 14 }} value={TypeFilterSort.TIME_ASC}>Recently listed</MenuItem>
                                        <MenuItem sx={{ fontSize: 14 }} value={TypeFilterSort.VIEW_DESC}>Most viewed</MenuItem>
                                        <MenuItem sx={{ fontSize: 14 }} value={TypeFilterSort.PRICE_ASC}>Price low to high</MenuItem>
                                        <MenuItem sx={{ fontSize: 14 }} value={TypeFilterSort.PRICE_DESC}>Price high to low</MenuItem>
                                        <MenuItem sx={{ fontSize: 14 }} value={TypeFilterSort.TIME_DESC}>Oldest</MenuItem>
                                    </Select>
                                </FormControl>

                            </Box>
                        </Grid>

                    </Grid>

                </Box>
                <Grid container spacing={{ xs: 3, md: 4 }}>
                    {
                        isFetched && (
                            total > 0 ?
                                items.map((item, index) =>
                                    <Grid item key={item.token_id} xs={6} sm={4}>
                                        <ListingItem item={item} />
                                    </Grid>
                                ) : !isFetching ? <Grid item xs={12} textAlign={'center'}>
                                    <Typography pt={10} variant="body1" fontWeight={600}>No items found for this search</Typography>
                                    <Typography variant="body1" mt={3} color="secondary.main" fontWeight={500} sx={{ cursor: 'pointer' }} onClick={() => {
                                        setFilter({
                                            limit: 9,
                                            offset: 0,
                                            sortType: "TIME",
                                            sortOrder: "DESC",
                                            minPrice: null,
                                            maxPrice: null,
                                            itemType: { ALL: true }
                                        })
                                        setItems([])
                                        onFilter()
                                    }}>Back to all item</Typography>
                                </Grid> : null
                        )
                    }
                    <Grid item xs={12} display={isFetching ? 'flex' : 'none'} textAlign={'center'} justifyContent={'center'} alignItems={'center'}><CoinAnimation width={100} height={100} /></Grid>
                    <Box ref={bottomRef} />

                </Grid>


            </Grid>
        </Grid >
    )
}

export default ShopCollection
type FormFilter = {
    ALL: boolean,
    DIAMOND: boolean,
    GOLD: boolean,
    BRONZE: boolean,

}
const Filter = ({ setFilter, filter, onFilter }: { onFilter: Function, filter: FilterType, setFilter: Function }) => {
    const [minPrice, setMinPrice] = useState<number | null>(filter.minPrice)
    const [maxPrice, setMaxPrice] = useState<number | null>(filter.maxPrice)
    const [itemType, setItemType] = useState<any>(filter.itemType)
    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        setMinPrice(filter.minPrice)
        setMaxPrice(filter.maxPrice)
        setItemType(filter.itemType)
    }, [filter])

    return <Box position={'sticky'} top={{ md: 112, sm: 72 }}>
        <Stack direction={'row'} alignItems={'center'} gap={{ xs: 1, md: 2 }}>
            <Box width={{ xs: 20, md: 24 }} height={{ xs: 20, md: 24 }}>
                <FilterIcon width={'100%'} height={'100%'} />
            </Box>
            <Typography fontSize={{ xs: 16, md: 24 }} fontWeight={{ xs: 600, md: 700 }} >Filter</Typography>
        </Stack>
        <Typography mt={{ xs: 2, md: 5 }} variant='body1' fontSize={{ xs: 14, md: 16 }} fontWeight={{ xs: 500, md: 600 }} >NFT Type</Typography>
        <FormGroup
            onChange={(e: any) => {
                if (e.target?.name === "ALL" && e.target?.checked) {
                    setItemType({ ALL: true })
                } else {
                    setItemType((prev: any) => {
                        prev.ALL = false;
                        prev[e.target.name] = e.target.checked;
                        return { ...prev };
                    })
                }
            }}
            sx={{
                '.MuiFormControlLabel-label': { fontSize: { xs: 14, md: 16 }, fontWeight: { xs: 400, md: 600 }, color: 'dark.60' },
                '.Mui-checked': {
                    '~ .MuiFormControlLabel-label': {
                        color: 'white'
                    }
                }
            }}>
            <Stack direction={{ xs: 'row', md: 'column' }} mt={{ xs: 1.6, md: 2 }}>
                <FormControlLabel
                    name='ALL'
                    control={<Checkbox checked={itemType.ALL} icon={<TickCircleOutlineIcon />} checkedIcon={<TickCircleIcon />} />} label="All" />
                <FormControlLabel name="DIAMOND" control={<Checkbox checked={itemType.DIAMOND ?? false} icon={<TickCircleOutlineIcon />} checkedIcon={<TickCircleIcon />} />} label="Diamond" />
                <FormControlLabel name="GOLD" control={<Checkbox checked={itemType.GOLD ?? false} icon={<TickCircleOutlineIcon />} checkedIcon={<TickCircleIcon />} />} label="Gold" />
                <FormControlLabel name="BRONZE" control={<Checkbox checked={itemType.BRONZE ?? false} icon={<TickCircleOutlineIcon />} checkedIcon={<TickCircleIcon />} />} label="Bronze" />
            </Stack>
        </FormGroup>

        <Typography mt={3} variant='body1' fontSize={{ xs: 14, md: 16 }} fontWeight={{ xs: 500, md: 600 }} >Price Range</Typography>
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
            <Input type='number' value={minPrice ?? ''} placeholder='Min' onChange={(e) => setMinPrice(parseFloat(e.target.value))} />
            <Typography>
                -
            </Typography>
            <Input type='number' value={maxPrice ?? ''} placeholder='Max' onChange={(e) => setMaxPrice(parseFloat(e.target.value))} />
            <MyImage src={BnbImage} minWidth={20} width={20} height={20} alt="" />
        </Stack>

        <ButtonLoading sx={{ py: 1, mt: { xs: 2, md: 3 }, fontSize: 12, fontWeight: 400, textTransform: 'none' }}
            onClick={() => {
                startTransition(() => {
                    if (minPrice && maxPrice && minPrice > maxPrice) {
                        setErrorMessage('Minimum must be less than maximum')
                    } else {
                        setErrorMessage(undefined);
                        setFilter((prev: FilterType) => {
                            return { ...prev, minPrice: !Number.isNaN(minPrice) ? minPrice : null, maxPrice: !Number.isNaN(maxPrice) ? maxPrice : null, itemType: Object.fromEntries(Object.entries(itemType).filter(([key, value]) => value === true)) } as FilterType
                        })
                        onFilter();

                    }
                })
            }}
        >Apply filter</ButtonLoading >
        {
            errorMessage &&
            <Box mt={2}>
                <Typography color="error.300" variant='caption' >{errorMessage}</Typography>
            </Box>
        }

    </Box>

}