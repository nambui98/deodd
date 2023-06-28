import { ButtonLoading } from 'components/ui/button';
import React, { useState } from 'react'
import ApproveModal from './ApproveModal';
import { useContractRead, useContractWrite } from 'wagmi';
import { dusdContract, deoddShopContract, deoddNFTContract, nftHolderContract } from 'libs/contract';
import { BigNumber, ethers } from 'ethers';
import { TypeNFT } from 'libs/types';
import { useSiteContext } from 'contexts/SiteContext';
import { useWalletContext } from 'contexts/WalletContext';
import { useMutation } from '@tanstack/react-query';
import { DeoddService } from 'libs/apis';

type Props = {
    nftSelected?: TypeNFT | null,
    handleSetNftSelected: Function,
    stakeOption: number
}

function FlowStake({ stakeOption, nftSelected, handleSetNftSelected }: Props) {
    const { setIsError, setTitleError } = useSiteContext();
    const { walletAddress } = useWalletContext();
    const [isApproveModalOpened, setIsApproveModalOpened] = useState(false);
    const [isApproved, setIsApproved] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { writeAsync: approve, isLoading: isLoadingApprove, isIdle } = useContractWrite({
        address: deoddNFTContract.address,
        mode: 'recklesslyUnprepared',
        abi: deoddNFTContract.abi,
        functionName: 'approve',
        args: [nftHolderContract.address, BigNumber.from(nftSelected?.id ?? 0)]
    })
    const { writeAsync: stake, isLoading: isLoadingStake, } = useContractWrite({
        address: nftHolderContract.address,
        mode: 'recklesslyUnprepared',
        abi: nftHolderContract.abi,
        functionName: 'stakeNFT',
        args: [BigNumber.from(nftSelected?.id ?? 0)]
    })
    const { refetch: getAllowance, isLoading: isLoadingGetAllowance, isFetching } = useContractRead({
        address: deoddNFTContract.address,
        abi: deoddNFTContract.abi,
        functionName: 'getApproved',
        args: [BigNumber.from(nftSelected?.id ?? 0)],
        enabled: !!nftSelected,
        onSuccess(data) {
            if (data === nftHolderContract.address) {
                setIsApproved(true);
            } else {
                setIsApproved(false);
            }
        },
    })
    // stake balance
    const { mutateAsync: stakeInBalance } = useMutation({

        mutationFn: () => {
            return DeoddService.stakeNft(nftSelected!.id!);
        },
        onError(error: any, variables, context) {
            setIsError(true)

            setIsLoading(false);
            debugger
            setTitleError(error?.response?.data.meta.error_message || error.message)
        },
        onSuccess(data, variables, context) {
            setIsApproveModalOpened(true);
            handleSetNftSelected(null)
            setIsApproved(false);
            setIsLoading(false);

        },
    });
    const handleApprove = () => {
        setIsLoading(true);
        approve?.()
            .then(resWrite => {
                return resWrite.wait();
            })
            .then((res) => {
                getAllowance();
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                setIsError(true);
                setTitleError(error.reason || 'Something went wrong');
            })


    }
    const handleStake = () => {
        setIsLoading(true)
        if (stakeOption === 1) {
            stakeInBalance();
        } else {

            stake?.()
                .then(resWrite => {
                    return resWrite.wait();
                })
                .then((res) => {
                    setIsApproveModalOpened(true);
                    handleSetNftSelected(null)
                    setIsApproved(false);
                    setIsLoading(false);
                })
                .catch(error => {
                    debugger
                    setIsLoading(false);
                    setIsError(true);
                    setTitleError(error.reason || 'Something went wrong');
                })
        }
    }
    return (
        <>
            {
                isApproved || stakeOption === 1 ?
                    <ButtonLoading
                        sx={{
                            py: 2,
                            px: 5,
                            width: 'auto',
                            textTransform: 'none',
                            fontSize: "1rem",
                            fontWeight: 600,
                            lineHeight: "1.375rem",
                            backgroundColor: "primary.300"
                        }}
                        disabled={!nftSelected}
                        loading={isLoadingStake || isLoading}
                        onClick={() => {
                            handleStake()
                        }}
                    >
                        Stake
                    </ButtonLoading>
                    :
                    <ButtonLoading
                        sx={{
                            py: 2,
                            px: 5,
                            textTransform: 'none',
                            width: 'auto',
                            fontSize: "1rem",
                            fontWeight: 600,
                            lineHeight: "1.375rem",
                            backgroundColor: "primary.300"
                        }}
                        disabled={!nftSelected}
                        loading={isLoading || isLoadingApprove || isLoadingGetAllowance || isFetching}
                        onClick={() => {
                            handleApprove();
                        }}
                    >
                        Approve
                    </ButtonLoading>
            }

            <ApproveModal open={isApproveModalOpened} setOpen={setIsApproveModalOpened} />

        </>

    )
}

export default FlowStake