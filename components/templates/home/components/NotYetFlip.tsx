import { Box, Stack, Typography } from '@mui/material';
import CoinAnimation from 'components/common/CoinAnimation';
import { ButtonLoading, ButtonLoadingShadow } from 'components/ui/button';
import MyImage from 'components/ui/image';
import { VRF_FEE, AMOUNTS } from 'constants/index';
import { StatusGame, useContractContext } from 'contexts/ContractContext';
import { useSiteContext } from 'contexts/SiteContext';
import { useWalletContext } from 'contexts/WalletContext';
import { BigNumber, ethers } from 'ethers';
import { useDeoddContract } from 'hooks/useDeoddContract';
import { AudioPlay } from 'libs/types';
import React, { useState } from 'react'
import { BnbIcon } from 'utils/Icons';

type Props = {}

function NotYetFlip({ }: Props) {
    return <Box>
        <CoinAnimation width={{ md: 160, xs: 120 }} height={{ md: 160, xs: 120 }} mx={'auto'} textAlign={'center'} />
        <FormActions />
    </Box>
}

export default NotYetFlip
type PropsActions = {}

function FormActions({ }: Props) {

    const { setIsFinish, setStatusGame, dataSelected, setDataSelected } = useContractContext();
    const { contractDeodd, bnbBalance } = useWalletContext()
    const [statusLoadingFlip, setStatusLoadingFlip] = useState<boolean>(false)

    const { handleFlipToken } = useDeoddContract();
    const { setIsError, setTitleError, audioPlayer } = useSiteContext();


    const handleFlip = async () => {
        const fee = await contractDeodd?.calcServiceFee(BigNumber.from(dataSelected?.index))
        let totalAmount: BigNumber = ethers.utils.parseUnits((dataSelected!.amount! + VRF_FEE).toString()).add(fee);
        if (totalAmount.gte(bnbBalance)) {
            setIsError(true);
            setTitleError("Balance is not enough!");
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
                    debugger
                    audioPlayer(AudioPlay.STOP);
                    setStatusLoadingFlip(false)
                    setStatusGame(StatusGame.FLIP)
                    setIsError(true);
                    setTitleError(error.reason || 'Something went wrong. Please try again!');

                }
            }
        }
    }
    return (
        <Box maxWidth={544} mx="auto" textAlign={'left'}>

            <Typography variant="h3" fontWeight={600} mt={{ md: 2, xl: 5 }} mb={2}>Bet amount</Typography>
            <Stack direction={'row'} justifyContent={'space-between'} flexWrap={'wrap'} columnGap={1.5} rowGap={2}>
                {AMOUNTS.map((item, index) => (
                    <Box flexBasis={{ md: '23%', xs: "23%" }} flexGrow={1} flexShrink={0} key={index}>
                        <ButtonLoadingShadow active={index === dataSelected?.index} onClick={() => setDataSelected({ ...dataSelected, amount: item, index })}>
                            <Typography variant="h3" mr={.5} fontWeight={600}>{item}</Typography>
                            <BnbIcon />
                        </ButtonLoadingShadow>
                    </Box>
                ))}
            </Stack>
            <Stack direction={'row'} gap={4} mt={{ sm: 3.25, xs: 2 }} justifyContent={{ xs: 'space-evenly', md: 'space-between' }}>
                <Box flex={'1 1 50%'} onClick={() => setDataSelected({ ...dataSelected, coinSide: 0 })}>
                    <SideCoin isHead isSelected={dataSelected?.coinSide === 0} />
                </Box>
                <Box flex={'1 1 50%'} onClick={() => setDataSelected({ ...dataSelected, coinSide: 1 })}>
                    <SideCoin isSelected={dataSelected?.coinSide === 1} />
                </Box>
            </Stack>
            <Box mt={{ sm: 3, xs: 2 }}>
                <ButtonLoading
                    onClick={handleFlip}
                    disabled={dataSelected?.coinSide !== undefined && dataSelected?.coinSide >= 0 && dataSelected?.amount ? false : true}
                    loading={statusLoadingFlip}>
                    <Typography variant={"h3"} fontWeight={600}>double or nothing</Typography>
                </ButtonLoading>
            </Box>
        </Box>
    )
}
const SideCoin: React.FC<{ isHead?: boolean, isSelected: boolean }> = ({ isHead, isSelected }) =>
(<Stack
    direction="row"
    gap={3}
    borderRadius={2}
    // maxWidth={256}
    width={1}
    py={{ sm: 3, xs: 2 }}
    justifyContent={"center"}
    border={isSelected ? " 1px solid #FEF156" : "1px solid transparent"}
    boxShadow={isSelected ? "0px 2px 16px rgba(254, 241, 86, 0.5)" : "0px 2px 4px rgba(0, 0, 0, 0.15)"}
    alignItems={'center'}
    sx={{
        transition: ".3s all",
        backgroundColor: "primary.100",
        cursor: 'pointer',
        color: isSelected ? 'secondary.main' : "secondary.700",
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
    {
        isHead ?
            <>
                <Box position={'relative'} height={{ sm: 64, xs: 48 }} width={{ sm: 64, xs: 48 }}>
                    <Box className="disabled" width={1}>
                        <MyImage alt="" width={1} height={1} src={`/assets/icons/head-disable.svg`} />
                    </Box>
                    <Box className="enabled" width={1} >
                        <MyImage alt="" width={1} height={1} src={`/assets/icons/head.svg`} />
                    </Box>
                </Box>
                <Typography variant="body2" fontSize={{ sm: 40, xs: 24 }} fontWeight={700} >
                    HEAD
                </Typography>
            </>
            : <>
                <Box position={'relative'} height={{ sm: 64, xs: 48 }} width={{ sm: 64, xs: 48 }}>
                    <Box className="disabled" width={1} >
                        <MyImage alt="" width={1} height={1} src={`/assets/icons/tail-disable.svg`} />
                    </Box>
                    <Box className="enabled" width={1}>
                        <MyImage alt="" width={1} height={1} src={`/assets/icons/tail.svg`} />
                    </Box>
                </Box>
                <Typography variant="body2" fontSize={{ sm: 40, xs: 24 }} fontWeight={700} >
                    TAIL
                </Typography>
            </>
    }
</Stack>
)