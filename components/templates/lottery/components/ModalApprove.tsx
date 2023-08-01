import { Box, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import FormatNumber from 'components/common/FormatNumber'
import MyModal from 'components/common/Modal'
import Price from 'components/common/Price'
import { ButtonLoading } from 'components/ui/button'
import { Colors, DefaultPriceTicket } from 'constants/index'
import { useLotteryContext } from 'contexts/LotteryContext'
import { useSiteContext } from 'contexts/SiteContext'
import { useWalletContext } from 'contexts/WalletContext'
import { BigNumber, ethers } from 'ethers'
import { dusdContract, lotteryContract } from 'libs/contract'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { USDTIcon } from 'utils/Icons'
import { Format } from 'utils/format'
import { useContractRead, useContractWrite } from 'wagmi'

type Props = {
    totalAmountTicket: number,
    refresh: VoidFunction,
    listTicket: { ticket: (number | null)[], amount: number }[]
}

const ModalApprove = ({ totalAmountTicket, listTicket, refresh }: Props) => {
    const { openModalApprove, setOpenModalApprove, setOpenModalBuyTicket, setOpenModalBuySuccess } = useLotteryContext();
    const { walletAddress } = useWalletContext();
    const { setIsError, setTitleError } = useSiteContext();
    const [allowance, setAllowance] = useState<number | string>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const price = totalAmountTicket * DefaultPriceTicket;
    const [balanceUSDT, setBalanceUSDT] = useState<string | number>(0);

    const argsPassBuyTicket = [
        listTicket.reduce((resultTicket, currentticket) => [...resultTicket, ...currentticket.ticket], [] as (number | null)[]).filter(number => number !== null).map(number => {
            return BigNumber.from(number)
        }),

        listTicket.map((ticket) => BigNumber.from(ticket.amount.toString())).filter(amount => !amount.eq(BigNumber.from(0))),
    ]

    const { register, watch, handleSubmit, reset, formState: { isDirty, errors } } = useForm<{ increaseAmount: string }>({
        defaultValues: {
            increaseAmount: '0',
        }
    });


    const { writeAsync: buyTicket, isSuccess: isSuccessBuy, isLoading: isLoadingBuy } = useContractWrite({
        address: lotteryContract.address,
        mode: 'recklesslyUnprepared',
        abi: lotteryContract.abi,
        functionName: 'buyTickets',
        args: argsPassBuyTicket,
        onMutate: () => {
        },
    })

    const { writeAsync: approve } = useContractWrite({
        address: dusdContract.address,
        mode: 'recklesslyUnprepared',
        abi: dusdContract.abi,
        functionName: 'approve',
        args: [lotteryContract.address, ethers.utils.parseUnits(price.toString() ?? '0')]
    })
    const { writeAsync: inCreaseAllowance } = useContractWrite({
        address: dusdContract.address,
        mode: 'recklesslyUnprepared',
        abi: dusdContract.abi,
        functionName: 'increaseAllowance',

        args: [lotteryContract.address, watch('increaseAmount') ? ethers.utils.parseUnits(watch('increaseAmount') ?? '0') : BigNumber.from(0)]
    })
    const { refetch: getAllowance } = useContractRead({
        address: dusdContract.address,
        abi: dusdContract.abi,
        functionName: 'allowance',
        args: [walletAddress, lotteryContract.address],
        // enabled: false,
        onSuccess(data: BigNumber) {
            setAllowance(ethers.utils.formatEther(data));
        },
    })
    const { refetch: getBalanceUSDT } = useContractRead({
        address: dusdContract.address,
        abi: dusdContract.abi,
        functionName: 'balanceOf',
        args: [walletAddress],
        watch: true,
        // enabled: false,
        onSuccess(data: BigNumber) {
            setBalanceUSDT(ethers.utils.formatEther(data))
        },
    })
    console.log(allowance);
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
    const handleBuy = () => {
        if (parseFloat(balanceUSDT.toString()) < price) {
            setIsError(true);
            setTitleError('Error. Insufficient balance in the wallet');
        } else {
            setIsLoading(true);
            buyTicket?.()
                .then(resWrite => {
                    return resWrite.wait();
                })
                .then((res) => {
                    setIsLoading(false);
                    setOpenModalBuySuccess(true);
                    setOpenModalApprove(false);
                    setOpenModalBuyTicket(false);
                    getAllowance();
                    refresh();
                })
                .catch((error) => {
                    setIsLoading(false);
                    setIsError(true);
                    setTitleError(error.reason || 'Checkout Failed. Please try again');
                })

        }
    }
    const submitForm = (data: any) => {
        if (price && parseFloat(allowance.toString()) < price) {
            handleApprove();
        } else {
            handleBuy();
        }

    }
    return (
        <MyModal open={openModalApprove} sx={{
            maxWidth: 496,
            width: 1,
            boxShadow: "0px 2px 16px 0px rgba(254, 241, 86, 0.50)"
        }} haveIconClosed iconProps={{ width: 24, color: Colors.secondary }} setOpen={isLoading || isLoadingBuy ? () => { } : setOpenModalApprove}>
            <Typography textAlign={'center'} mb={3} variant='h5' fontWeight={700}>Approve token</Typography>

            <Box component={'form'} onSubmit={handleSubmit(submitForm)}>
                <Stack>
                    <Typography fontSize={16} fontWeight={600}>x{totalAmountTicket} Lottery {totalAmountTicket > 1 ? 'Tickets' : 'Ticket'}</Typography>
                    <Typography variant='caption' fontWeight={400} color="secondary.main">Lottery #20231212</Typography>
                </Stack>
                <Stack mt={3} direction={'row'} justifyContent={"space-between"}>
                    <Typography variant='body2'>Price</Typography>

                    <Price
                        token={<USDTIcon width={24} height={24} fill="#50ae94" />}
                        value={price ?? 0}
                        isShowOnlyPriceSales={true}
                        typographyProps={{ variant: 'body1', fontSize: 16, fontWeight: 600 }}
                    />

                </Stack>

                {
                    parseFloat(allowance.toString()) > 0 &&
                    <>
                        <Stack mt={1.3} mb={3} direction={'row'} justifyContent={"space-between"}>
                            <Typography variant='body2'>Current Allowance</Typography>
                            <Stack direction={'row'} gap={.5} alignItems={'center'}>
                                <Price
                                    token={<USDTIcon width={24} height={24} fill="#50ae94" />}
                                    value={allowance ?? 0}
                                    isShowOnlyPriceSales={true}
                                    typographyProps={{ variant: 'body1', fontSize: 16, fontWeight: 600 }}
                                />

                            </Stack>

                        </Stack>

                    </>
                }


                {
                    allowance && parseFloat(allowance.toString()) > 0 && price && parseFloat(allowance.toString()) < price
                    && <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Stack height={1} justifyContent={'center'}>
                            <Typography variant='body2' fontWeight={400}>Increase</Typography>
                        </Stack>
                        <TextField
                            {...register("increaseAmount", { required: "Required to fill" })}
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




                    </Stack>
                }
                {

                    errors?.increaseAmount?.message &&

                    <Typography mt={1} textAlign={'right'} color="error.300" variant="body2" fontWeight={500}>
                        {
                            errors?.increaseAmount?.message
                        }
                    </Typography>
                }
                {


                    price && parseFloat(allowance.toString()) < price ?
                        <ButtonLoading type='submit' loading={isLoading} sx={{ mt: 3 }}>
                            {
                                parseFloat(allowance.toString()) <= 0 ?
                                    'Approve' : 'Increase'
                            }

                        </ButtonLoading>
                        :

                        <ButtonLoading type='submit' loading={isLoading}>
                            Buy now
                        </ButtonLoading>

                }
                <ButtonLoading onClick={isLoading || isLoadingBuy ? () => { } : () => setOpenModalApprove(false)} sx={{ py: 2, mt: 2, textTransform: 'none', border: 1, borderColor: 'white', color: 'white', '&:hover': { bgcolor: 'white', border: 1, borderColor: 'white' } }}>
                    Cancel
                </ButtonLoading>

            </Box>

        </MyModal>




    )
}

export default ModalApprove