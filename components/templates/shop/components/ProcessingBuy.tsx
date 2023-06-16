import { Stack, TextField, Typography, Grid, Box, InputAdornment } from '@mui/material'
import MyModal from 'components/common/Modal'
import Price from 'components/common/Price'
import { BigNumber, ethers } from 'ethers'
import React, { useState } from 'react'
import { BagTickIcon, USDTIcon } from 'utils/Icons'
import { Format } from 'utils/format'
import { ListingItemType } from './ListingItem'
import { ButtonLoading } from 'components/ui/button'
import { useContractRead, useContractWrite } from 'wagmi'
import { deoddShopContract, dusdContract } from 'libs/contract'
import { useSiteContext } from 'contexts/SiteContext'
import { Colors } from 'constants/index'
import Link from 'next/link'
import { useWalletContext } from 'contexts/WalletContext'
import FormatNumber from 'components/common/FormatNumber'

type Props = {
    item?: ListingItemType;
    isShowBuy: boolean;
    setIsShowBuy: (value: boolean) => void;
    refresh: Function
}

function ProcessingBuy({ item, refresh, isShowBuy, setIsShowBuy }: Props) {
    const { setIsError, setTitleError } = useSiteContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const { walletAddress, bnbBalance } = useWalletContext()
    const [allowance, setAllowance] = useState<number | string>(0);
    const [allowanceValue, setAllowanceValue] = useState<number | string>(0);
    const [balanceUSDT, setBalanceUSDT] = useState<string | number>(0);
    const { writeAsync: buyNFT } = useContractWrite({
        address: deoddShopContract.address,
        mode: 'recklesslyUnprepared',
        abi: deoddShopContract.abi,
        functionName: 'purchaseItemByToken',
        args: [BigNumber.from(item?.token_id ?? 0)]
    })

    const { writeAsync: approve } = useContractWrite({
        address: dusdContract.address,
        mode: 'recklesslyUnprepared',
        abi: dusdContract.abi,
        functionName: 'approve',
        args: [deoddShopContract.address, ethers.utils.parseUnits(item?.price.toString() ?? '0')]
    })
    const { writeAsync: inCreaseAllowance } = useContractWrite({
        address: dusdContract.address,
        mode: 'recklesslyUnprepared',
        abi: dusdContract.abi,
        functionName: 'increaseAllowance',
        args: [deoddShopContract.address, ethers.utils.parseUnits(allowanceValue.toString() ?? '0')]
    })
    const { refetch: getAllowance } = useContractRead({
        address: dusdContract.address,
        abi: dusdContract.abi,
        functionName: 'allowance',
        args: [walletAddress, deoddShopContract.address],
        // enabled: false,
        onSuccess(data: BigNumber) {
            setAllowance(ethers.utils.formatEther(data));
        },
    })
    useContractRead({
        address: dusdContract.address,
        abi: dusdContract.abi,
        functionName: 'balanceOf',
        args: [walletAddress],
        // enabled: false,
        onSuccess(data: BigNumber) {
            setBalanceUSDT(ethers.utils.formatEther(data))
        },
    })
    console.log(allowanceValue);

    const handleBuyNFT = () => {
        if (parseFloat(balanceUSDT.toString()) < (item?.sale_price ?? 0)) {
            setIsError(true);
            setTitleError('Error. Insufficient balance in the wallet');
        } else {
            setIsLoading(true);
            buyNFT?.()
                .then(resWrite => {
                    return resWrite.wait();
                })
                .then((res) => {
                    setIsLoading(false);
                    setIsShowBuy(false);
                    setIsSuccess(true);
                    refresh();
                })
                .catch(error => {
                    setIsLoading(false);
                    setIsError(true);
                    setTitleError(error.reason || 'Checkout Failed. Please try again');
                })

        }
    }
    const handleApprove = () => {
        setIsLoading(true);
        (parseFloat(allowance.toString()) <= 0 ? approve : inCreaseAllowance)?.()
            .then(resWrite => {
                return resWrite.wait();
            })
            .then((res) => {
                setIsLoading(false);
                getAllowance();
            })
            .catch(error => {
                setIsLoading(false);
                setIsError(true);
                setTitleError(error.reason || (parseFloat(allowance.toString()) <= 0 ? 'Approve' : 'Increase') + ' Failed. Please try again');
            })
    }

    return (<>
        <MyModal open={isShowBuy} sx={{ width: "min(100vw - 16px, 544px)", boxShadow: '0px 2px 16px rgba(254, 241, 86, 0.5)' }} haveIconClosed iconProps={{ width: 24, color: Colors.secondary }} setOpen={() => { setIsShowBuy(false) }}>
            <Typography textAlign={'center'} variant='h5' fontWeight={700}>Checkout</Typography>
            <Grid container spacing={2} pt={3}>
                <Grid item xs={3} >
                    <Box p={1}>
                        <img src={item?.image_link} alt="" width="100%" />
                    </Box>
                </Grid>
                <Grid item xs={9}>

                    <Typography variant='body1' fontWeight={600}>DeODD #{item?.token_id}</Typography>

                    <Typography variant="caption" mt={.5} color="secondary.main" fontWeight={400}>DeODD NFT 1ST Collection</Typography>
                    <Grid container pt={3} rowSpacing={1}>
                        <Grid item xs={6}>
                            <Typography variant='body2' fontWeight={400}>Price</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack gap={1} alignItems={'flex-end'}>
                                <Price
                                    token={<USDTIcon width={24} height={24} fill="#50ae94" />}
                                    value={item?.price ?? 0}
                                    isShowOnlyPriceSales={true}
                                    valueSale={item?.sale_price ?? 0}
                                    typographyProps={{ variant: 'body1', fontSize: 16, fontWeight: 600 }}
                                />
                            </Stack>
                        </Grid>
                        {
                            parseFloat(allowance.toString()) > 0 &&
                            <>

                                <Grid item xs={6}>
                                    <Typography variant='body2' fontWeight={400}>Current Allowances</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Stack gap={1} alignItems={'flex-end'}>
                                        <Price
                                            token={<USDTIcon width={24} height={24} fill="#50ae94" />}
                                            value={allowance ?? 0}
                                            isShowOnlyPriceSales={true}
                                            typographyProps={{ variant: 'body1', fontSize: 16, fontWeight: 600 }}
                                        />
                                    </Stack>
                                </Grid>
                            </>
                        }

                        {
                            allowance && parseFloat(allowance.toString()) > 0 && item?.sale_price && parseFloat(allowance.toString()) < item?.sale_price && <>
                                <Grid item xs={6}  >
                                    <Stack height={1} justifyContent={'center'}>
                                        <Typography variant='body2' fontWeight={400}>Increase</Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={6} >
                                    <TextField
                                        onChange={(e) => setAllowanceValue(e.target.value)}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><USDTIcon width={24} height={24} fill="#50ae94" /></InputAdornment>,
                                            inputComponent: FormatNumber as any,
                                        }}
                                        sx={{
                                            bgcolor: 'background.paper',
                                            border: 'none',
                                            py: 0,
                                            borderRadius: 2,

                                            fontFamily: 'inherit',
                                            fontSize: 16,
                                            '.MuiOutlinedInput-notchedOutline ': {
                                                border: 'none',
                                            },
                                            '.MuiInputBase-input': {
                                                py: 1.5,
                                                textAlign: 'right',
                                                fontFamily: 'inherit',

                                                fontSize: 16,
                                            }
                                        }} />
                                </Grid>


                            </>
                        }
                    </Grid>
                </Grid>
                {

                    allowance && parseFloat(allowance.toString()) > 0 && item?.sale_price && parseFloat(allowance.toString()) < item?.sale_price && <Grid item xs={12}  >
                        <Typography variant='body2' fontWeight={500} color="dark.60">You need to approve more token to complete this transaction</Typography>
                    </Grid>
                }

                <Grid item xs={12} >
                    {


                        item?.sale_price && parseFloat(allowance.toString()) < item?.sale_price ?
                            <ButtonLoading onClick={handleApprove} loading={isLoading} sx={{ mt: 2, py: 2, textTransform: 'none' }}>
                                {
                                    parseFloat(allowance.toString()) <= 0 ?
                                        'Approve' : 'Increase'
                                }

                            </ButtonLoading>
                            :

                            <ButtonLoading onClick={handleBuyNFT} loading={isLoading} sx={{
                                mt: 2, py: 2, textTransform: 'none',
                                borderColor: 'secondary.main',
                                color: 'secondary.main',
                                svg: { transition: '.3s all', fill: Colors.secondaryDark, stroke: 'none' },
                                '&:hover': {
                                    bgcolor: 'secondary.main',
                                    borderWidth: 1,
                                    borderColor: "secondary.main",
                                    svg: { fill: Colors.bg80, stroke: 'none' }
                                }
                            }}>
                                <Stack direction={'row'} alignItems={'center'} gap={1}>
                                    {
                                        !isLoading &&
                                        <BagTickIcon />
                                    }
                                    Buy now
                                </Stack>

                            </ButtonLoading>

                    }
                    <ButtonLoading onClick={() => setIsShowBuy(false)} sx={{ py: 2, mt: 2, textTransform: 'none', border: 1, borderColor: 'white', color: 'white', '&:hover': { bgcolor: 'white', border: 1, borderColor: 'white' } }}>
                        Cancel
                    </ButtonLoading>

                </Grid>
            </Grid>

        </MyModal>
        <MyModal open={isSuccess} sx={{ width: "min(100vw - 16px, 352px)", boxShadow: '0px 2px 16px rgba(254, 241, 86, 0.5)' }} haveIconClosed iconProps={{ width: 24, color: Colors.secondary }} setOpen={() => { setIsSuccess(false) }}>
            <Typography textAlign={'center'} variant='h5' fontWeight={700}>Payment success</Typography>
            <Stack mt={3} alignItems={'center'}>
                <Box width={96}>
                    <img src={item?.image_link} alt="" width="100%" />
                </Box>
                <Typography variant='body1' fontWeight={600} mt={3}>DeODD #{item?.token_id}</Typography>
                <Typography mt={1} variant="caption" color="secondary.main" fontWeight={400}>DeODD NFT 1ST Collection</Typography>
            </Stack>
            <ButtonLoading LinkComponent={Link} href={'/assets'} sx={{
                mt: 2, py: 2, textTransform: 'none',
            }}>
                View in Assets
            </ButtonLoading>
            <ButtonLoading onClick={() => setIsSuccess(false)} sx={{ py: 2, mt: 2, textTransform: 'none', border: 1, borderColor: 'white', color: 'white', '&:hover': { bgcolor: 'white', border: 1, borderColor: 'white' } }}>
                Close
            </ButtonLoading>
        </MyModal>
    </>)
}

export default ProcessingBuy

