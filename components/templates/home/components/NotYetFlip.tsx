import { Box, Button, Stack, Typography } from '@mui/material';
import CoinAnimation from 'components/common/CoinAnimation';
import { ButtonLoading, ButtonLoadingShadow } from 'components/ui/button';
import MyImage from 'components/ui/image';
import { VRF_FEE, AMOUNTS } from 'constants/index';
import { DataSelected, StatusGame, useContractContext } from 'contexts/ContractContext';
import { useSiteContext } from 'contexts/SiteContext';
import { useWalletContext } from 'contexts/WalletContext';
import { BigNumber, ethers } from 'ethers';
import { useDeoddContract } from 'hooks/useDeoddContract';
import { deoddContract } from 'libs/contract';
import { useContractRead } from 'wagmi'
import { AudioPlay } from 'libs/types';
import React, { useState } from 'react'
import { BnbIcon } from 'utils/Icons';
import { ButtonProps } from '@mui/base';

type Props = {
    isShowing: boolean
}

export default function NotYetFlip({ isShowing }: Props) {
    return <Box display={isShowing ? 'block' : 'none'}>
        <CoinAnimation width={{ md: 160, xs: 120 }} height={{ md: 160, xs: 120 }} mx={'auto'} textAlign={'center'} />
        <FormActions />
    </Box>
}


function FormActions() {

    const { setIsFinish, setStatusGame, dataSelected, setOpenModalPendingTransaction, setDataSelected } = useContractContext();
    const { contractDeodd, bnbBalance, walletAddress } = useWalletContext()
    const [statusLoadingFlip, setStatusLoadingFlip] = useState<boolean>(false)

    const { handleFlipToken } = useDeoddContract();
    const { setIsError, setTitleError, audioPlayer } = useSiteContext();
    const { refetch } = useContractRead({
        address: deoddContract.address,
        abi: deoddContract.abi,
        functionName: 'pendingRequestExists',
        args: [walletAddress],
        enabled: false,
    })

    const handleFlip = async () => {

        setStatusLoadingFlip(true);
        const ck = await refetch();
        debugger
        if (ck.data === false) {
            const fee = await contractDeodd?.calcServiceFee(BigNumber.from(dataSelected?.index))
            let totalAmount: BigNumber = ethers.utils.parseUnits((dataSelected!.amount! + VRF_FEE).toString()).add(fee);
            if (totalAmount.gte(bnbBalance)) {
                setIsError(true);
                setTitleError("Balance is not enough!");
                setStatusLoadingFlip(false);
            }
            else {
                if (!statusLoadingFlip) {
                    setStatusLoadingFlip(true);
                    setIsFinish(false);
                    try {
                        if (fee) {
                            setIsFinish(true);
                            const res = await handleFlipToken(
                                dataSelected?.index || 0,
                                dataSelected?.coinSide || 0,
                                totalAmount
                            )
                            if (res.status) {
                                setStatusLoadingFlip(false)
                            }
                        }
                    } catch (error: any) {
                        console.log(error);

                        debugger
                        audioPlayer(AudioPlay.STOP);
                        setStatusLoadingFlip(false)
                        setStatusGame(StatusGame.FLIP)
                        setIsError(true);
                        setTitleError(error.reason || 'Something went wrong. Please try again!');

                    }
                }
            }

        } else {

            audioPlayer(AudioPlay.STOP);
            setStatusLoadingFlip(false)
            setOpenModalPendingTransaction(true);
        }
    }
    const handleClickSideCoin = (side: number) => {
        setDataSelected((prev: DataSelected) => ({ ...prev, coinSide: side }))
    }
    return (
        <Box maxWidth={544} mx="auto" textAlign={'left'}>

            <Typography variant="h3" fontWeight={600} mt={{ md: 2, xl: 5 }} mb={2}>Bet amount</Typography>
            <Stack direction={'row'} justifyContent={'space-between'} flexWrap={'wrap'} columnGap={1.5} rowGap={2}>
                {AMOUNTS.map((item, index) => (
                    <Box flexBasis={{ md: '23%', xs: "23%" }} flexGrow={1} flexShrink={0} key={index}>
                        <ButtonLoadingShadow active={index === dataSelected?.index} onClick={() => setDataSelected((prev: DataSelected) => ({ ...prev, amount: item, index }))}>
                            <Typography variant="h3" mr={.5} fontWeight={600}>{item}</Typography>
                            <Box width={20} height={20}>
                                <BnbIcon width={'100%'} height={'100%'} />
                            </Box>
                        </ButtonLoadingShadow>
                    </Box>
                ))}
            </Stack>
            <Stack direction={'row'} gap={4} mt={{ sm: 3.25, xs: 2 }} justifyContent={{ xs: 'space-evenly', md: 'space-between' }}>
                <SideCoin isHead isSelected={dataSelected?.coinSide === 0} onClick={() => handleClickSideCoin(0)} />
                <SideCoin isSelected={dataSelected?.coinSide === 1} onClick={() => handleClickSideCoin(1)} />
            </Stack >
            <Box mt={{ sm: 3, xs: 2 }}>
                <ButtonLoading
                    onClick={handleFlip}
                    disabled={dataSelected?.coinSide !== undefined && dataSelected?.coinSide >= 0 && dataSelected?.amount ? false : true}
                    loading={statusLoadingFlip}>
                    <Typography variant={"h3"} fontWeight={600}>double or nothing</Typography>
                </ButtonLoading>
            </Box>
        </Box >
    )
}
const SideCoin: React.FC<{ isHead?: boolean, isSelected: boolean } & ButtonProps> = ({ isHead, isSelected, ...props }) =>
(<ButtonLoadingShadow
    active={isSelected}
    onClick={props.onClick}
    sx={{
        py: { sm: 3, xs: 2 },
        borderRadius: 2,
        flex: '1 1 50%',
        width: '100%',
        // transition: ".3s all",
        backgroundColor: "primary.100",
        cursor: 'pointer',
        color: isSelected ? 'secondary.main' : 'secondary.700',
        '.disabled, .enabled': {
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            transition: "all .3s",
            opacity: 1
        },
        '.enabled': {
            zIndex: isSelected ? 1 : 0,
            opacity: isSelected ? 1 : 0,
        },
        '&:hover': {
            border: "1px solid #FEF156",
            color: 'secondary.main',
            backgroundColor: "primary.100",
            '.disabled': {
                zIndex: 0,
                opacity: 0,
            },
            '.enabled': {
                zIndex: 1,
                opacity: 1
            },
        },
    }}
>
    <Stack
        direction="row"
        gap={3}
        alignItems={'center'}
        justifyContent={"center"}
    >
        {
            isHead ?
                <>
                    <Box position={'relative'} height={{ sm: 64, xs: 48 }} width={{ sm: 64, xs: 48 }}>
                        <Box className="disabled" width={1} height={1}>
                            <MyImage alt="" width={1} height={1} src={`/assets/icons/head-disable.svg`} />
                        </Box>
                        <Box className="enabled" width={1} height={1}>
                            <MyImage alt="" width={1} height={1} src={`/assets/icons/head.svg`} />
                        </Box>
                    </Box>
                    <Typography variant="body2" fontSize={{ sm: 40, xs: 24 }} fontWeight={700} >
                        HEAD
                    </Typography>
                </>
                : <>
                    <Box position={'relative'} height={{ sm: 64, xs: 48 }} width={{ sm: 64, xs: 48 }}>
                        <Box className="disabled" width={1} height={1}>
                            <MyImage alt="" width={1} height={1} src={`/assets/icons/tail-disable.svg`} />
                        </Box>
                        <Box className="enabled" width={1} height={1}>
                            <MyImage alt="" width={1} height={1} src={`/assets/icons/tail.svg`} />
                        </Box>
                    </Box>
                    <Typography variant="body2" fontSize={{ sm: 40, xs: 24 }} fontWeight={700} >
                        TAIL
                    </Typography>
                </>
        }
    </Stack>

</ButtonLoadingShadow>
)